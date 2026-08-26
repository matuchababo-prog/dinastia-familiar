import React, { useState, useRef } from 'react';
import type { Person } from '../types/family';
import { AudioPlayer } from './AudioPlayer';
import { User, CheckCircle2, MessageSquare, BookOpen, Volume2, ShieldCheck, Heart, Sparkles, X, Camera, UploadCloud, Loader2, Target } from 'lucide-react';
import { uploadFileToCloud, savePersonToCloud } from '../services/familyService';

interface ProfileSheetProps {
  person: Person | null;
  onClose: () => void;
  onFocusPerson?: (id: string) => void;
  isFocal?: boolean;
}

export const ProfileSheet: React.FC<ProfileSheetProps> = ({ person, onClose, onFocusPerson, isFocal }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'media' | 'counterpoints' | 'values'>('bio');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !person) return;
    
    try {
      setIsUploadingPhoto(true);
      const url = await uploadFileToCloud(file, `photos/${person.id}_${Date.now()}`);
      const updatedPerson = { ...person, photoUrl: url };
      await savePersonToCloud(updatedPerson);
      person.photoUrl = url;
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !person) return;

    try {
      setIsUploadingAudio(true);
      const url = await uploadFileToCloud(file, `audios/${person.id}_${Date.now()}`);
      
      const newAudio = {
        id: Date.now().toString(),
        title: file.name,
        duration: '...', 
        audioUrl: url,
        transcript: 'Transcripción no disponible (archivo subido).'
      };
      
      const updatedPerson = {
        ...person,
        audioRecordings: [...(person.audioRecordings || []), newAudio]
      };
      
      await savePersonToCloud(updatedPerson);
      person.audioRecordings = updatedPerson.audioRecordings;
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingAudio(false);
    }
  };

  if (!person) return null;

  return (
    <div
      className="absolute top-0 right-0 w-[420px] max-w-[100vw] h-full bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col"
      style={{
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Header Panel */}
      <div className="p-6 pb-4 border-b border-slate-200 relative bg-slate-50">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            onClick={() => photoInputRef.current?.click()}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-muted)',
              border: '3px solid var(--color-primary)',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {isUploadingPhoto ? (
              <Loader2 size={24} className="animate-spin" color="var(--color-primary)" />
            ) : person.photoUrl ? (
              <>
                <img src={person.photoUrl} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '30%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Camera size={12} color="white" />
                </div>
              </>
            ) : (
              <User size={36} color="var(--color-primary)" />
            )}
            <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
              Generación {person.generation} · {person.branch}
            </span>
            <h2 style={{ margin: '4px 0 2px 0', fontSize: '22px', fontWeight: 800 }}>{person.name}</h2>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.75, fontWeight: 500 }}>
              {person.birthDate || person.birthYear || '?'} {person.deathDate ? `— ${person.deathDate}` : person.deathYear ? `— ${person.deathYear}` : '· Presente'} {person.birthPlace && `· ${person.birthPlace}`}
            </p>
            {onFocusPerson && !isFocal && (
              <button
                onClick={() => onFocusPerson(person.id)}
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                <Target size={12} />
                Enfocar Árbol
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
        {[
          { id: 'bio', label: 'Biografía', icon: BookOpen },
          { id: 'media', label: 'Audios', icon: Volume2 },
          { id: 'counterpoints', label: 'Perspectivas', icon: ShieldCheck },
          { id: 'values', label: 'Valores', icon: Heart }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '12px 4px',
                border: 'none',
                background: 'none',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-foreground)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Body Tab Content */}
      <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {activeTab === 'bio' && (
          <>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700 }}>Resumen Biográfico</h4>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, opacity: 0.9 }}>
                {person.bioSummary || 'No hay resumen registrado todavía.'}
              </p>
            </div>

            {person.facts && person.facts.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--color-accent)" /> Hechos & Veracidad
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {person.facts.map((fact) => (
                    <div
                      key={fact.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        backgroundColor:
                          fact.type === 'FACT' ? 'rgba(5, 150, 105, 0.1)' : fact.type === 'OPINION' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                        borderLeft: `3px solid ${
                          fact.type === 'FACT' ? '#059669' : fact.type === 'OPINION' ? '#2563eb' : '#d97706'
                        }`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                        {fact.type === 'FACT' && (
                          <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={13} /> ✔ HECHO COMPROBABLE
                          </span>
                        )}
                        {fact.type === 'OPINION' && (
                          <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MessageSquare size={13} /> 💬 OPINIÓN / PERCEPCIÓN
                          </span>
                        )}
                        {fact.type === 'CONTEXT' && (
                          <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            📜 CONTEXTO HISTÓRICO
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.5 }}>{fact.content}</p>
                      {fact.source && (
                        <span style={{ fontSize: '10px', opacity: 0.7, fontStyle: 'italic', display: 'block', marginTop: '4px' }}>
                          Fuente: {fact.source}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Story Prompts */}
            <div style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>
                Escribe sobre {person.name}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  `¿A qué jugaba ${person.name} en su infancia?`,
                  `¿Cuál era la frase típica de ${person.name}?`,
                  `¿Cómo conoció ${person.name} a su pareja?`,
                  `¿Cuál fue el mayor desafío que enfrentó?`
                ].map((prompt, i) => (
                  <button
                    key={i}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      backgroundColor: 'rgba(234, 88, 12, 0.05)',
                      border: '1px solid rgba(234, 88, 12, 0.2)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(234, 88, 12, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(234, 88, 12, 0.05)';
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(prompt);
                      alert(`Pregunta copiada: "${prompt}". \n\nCierra este panel y ve al 'Feed de Recuerdos' para crear un nuevo post respondiendo esta pregunta.`);
                    }}
                  >
                    <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', marginBottom: '2px' }} />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Grabaciones de Voz Registradas</h4>
              <button
                onClick={() => audioInputRef.current?.click()}
                disabled={isUploadingAudio}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: isUploadingAudio ? 'not-allowed' : 'pointer',
                  opacity: isUploadingAudio ? 0.7 : 1
                }}
              >
                {isUploadingAudio ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                {isUploadingAudio ? 'Subiendo...' : 'Subir Audio'}
              </button>
              <input type="file" ref={audioInputRef} onChange={handleAudioUpload} accept="audio/*" style={{ display: 'none' }} />
            </div>

            {person.audioRecordings && person.audioRecordings.length > 0 ? (
              person.audioRecordings.map((rec) => (
                <AudioPlayer key={rec.id} title={rec.title} duration={rec.duration} transcript={rec.transcript} audioUrl={rec.audioUrl} />
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', opacity: 0.6, fontSize: '13px' }}>
                No hay grabaciones de voz subidas aún.
              </div>
            )}
          </div>
        )}

        {activeTab === 'counterpoints' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Testimonios Cruzados (Contrapuntos)</h4>
            {person.counterpoints && person.counterpoints.length > 0 ? (
              person.counterpoints.map((cp) => (
                <div key={cp.id} className="glass-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h5 style={{ margin: 0, fontSize: '13px', color: 'var(--color-primary)', fontWeight: 700 }}>{cp.topic}</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', fontSize: '11px' }}>
                      <span style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>🗣️ {cp.versionA.author}:</span>
                      "{cp.versionA.text}"
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', fontSize: '11px' }}>
                      <span style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>🗣️ {cp.versionB.author}:</span>
                      "{cp.versionB.text}"
                    </div>
                  </div>
                  {cp.notes && <p style={{ margin: 0, fontSize: '11px', opacity: 0.7, fontStyle: 'italic' }}>Nota: {cp.notes}</p>}
                </div>
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', opacity: 0.6, fontSize: '13px' }}>
                No existen contrapuntos contradictorios registrados sobre esta persona.
              </div>
            )}
          </div>
        )}

        {activeTab === 'values' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Manifiesto & Valores de Vida</h4>
            {person.valuesAndTeachings && person.valuesAndTeachings.length > 0 ? (
              person.valuesAndTeachings.map((val, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(217, 119, 6, 0.1)',
                    borderLeft: '3px solid #d97706',
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: 1.5
                  }}
                >
                  "{val}"
                </div>
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', opacity: 0.6, fontSize: '13px' }}>
                No hay enseñanzas registradas aún.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
