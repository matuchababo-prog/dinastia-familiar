import React, { useState, useRef } from 'react';
import type { Person } from '../types/family';
import { AudioPlayer } from './AudioPlayer';
import { 
  User, 
  CheckCircle2, 
  MessageSquare, 
  BookOpen, 
  Volume2, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  X, 
  Camera, 
  UploadCloud, 
  Loader2, 
  Target,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { uploadFileToCloud, savePersonToCloud } from '../services/familyService';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

interface ProfileSheetProps {
  person: Person | null;
  onClose: () => void;
  onFocusPerson?: (id: string) => void;
  isFocal?: boolean;
  onNavigateToFeed?: (initialPrompt?: string, personName?: string) => void;
}

export const ProfileSheet: React.FC<ProfileSheetProps> = ({ 
  person, 
  onClose, 
  onFocusPerson, 
  isFocal,
  onNavigateToFeed 
}) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'media' | 'counterpoints' | 'values'>('bio');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  
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
        title: file.name.replace(/\.[^/.]+$/, ''),
        duration: '0:30', 
        audioUrl: url,
        transcript: 'Transcripción generada para este audio de memoria.'
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

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(promptText);
    setTimeout(() => {
      setCopiedPrompt(null);
    }, 4000);
  };

  if (!person) return null;

  const branchTheme = person.branch ? (BRANCH_COLORS[person.branch] || DEFAULT_BRANCH_COLOR) : DEFAULT_BRANCH_COLOR;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
      />

      <div
        className="fixed inset-x-0 bottom-0 md:top-0 md:bottom-auto md:right-0 md:left-auto w-full md:w-[440px] max-h-[90vh] md:max-h-full md:h-full bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 rounded-t-3xl md:rounded-none shadow-2xl z-50 flex flex-col transition-all overflow-hidden"
        style={{
          animation: 'sheetOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <style>{`
          @keyframes sheetOpen {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          @media (min-width: 768px) {
            @keyframes sheetOpen {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          }
        `}</style>

        {/* Mobile Pull Bar */}
        <div className="md:hidden w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Header Panel */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-200 dark:border-slate-800 relative bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <button
            onClick={onClose}
            aria-label="Cerrar ficha"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          >
            <X size={16} />
          </button>

        <div className="flex gap-4 items-center">
          {/* Avatar with branch border and photo upload */}
          <div
            onClick={() => photoInputRef.current?.click()}
            title="Cambiar foto de perfil"
            className="w-18 h-18 rounded-full bg-slate-100 dark:bg-slate-800 border-3 border-orange-500 overflow-hidden shrink-0 flex items-center justify-center cursor-pointer relative group shadow-md"
            style={{ borderColor: branchTheme.stroke }}
          >
            {isUploadingPhoto ? (
              <Loader2 size={24} className="animate-spin text-orange-600" />
            ) : person.photoUrl ? (
              <>
                <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 w-full h-[35%] bg-black/60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                  <Camera size={13} className="text-white" />
                </div>
              </>
            ) : (
              <User size={36} style={{ color: branchTheme.stroke }} />
            )}
            <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-2xs"
                style={{ backgroundColor: branchTheme.stroke }}
              >
                Gen {person.generation} · {person.branch || 'Familia'}
              </span>
            </div>

            <h2 className="m-0 text-xl font-bold text-slate-900 dark:text-slate-50 truncate leading-tight">
              {person.name}
            </h2>

            <p className="m-0 text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {person.birthDate || person.birthYear || '?'} {person.deathDate ? `— ${person.deathDate}` : person.deathYear ? `— ${person.deathYear}` : '· Presente'} {person.birthPlace && `· ${person.birthPlace}`}
            </p>

            {onFocusPerson && !isFocal && (
              <button
                onClick={() => onFocusPerson(person.id)}
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Target size={12} />
                <span>Enfocar en el Árbol</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
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
              className={`flex-1 py-3 px-1 border-b-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isActive
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400 bg-white/50 dark:bg-slate-800/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Body Tab Content */}
      <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-5">
        {activeTab === 'bio' && (
          <>
            <div>
              <h4 className="m-0 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Resumen Biográfico</h4>
              <p className="m-0 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {person.bioSummary || 'No hay un resumen registrado todavía para esta persona.'}
              </p>
            </div>

            {person.facts && person.facts.length > 0 && (
              <div>
                <h4 className="m-0 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" /> Hechos & Veracidad Histórica
                </h4>
                <div className="flex flex-col gap-2.5">
                  {person.facts.map((fact) => (
                    <div
                      key={fact.id}
                      className={`p-3 rounded-xl border-l-3 text-xs leading-relaxed ${
                        fact.type === 'FACT'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-600 text-emerald-950 dark:text-emerald-200'
                          : fact.type === 'OPINION'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-600 text-blue-950 dark:text-blue-200'
                          : 'bg-amber-50 dark:bg-amber-950/30 border-amber-600 text-amber-950 dark:text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {fact.type === 'FACT' && (
                          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={12} /> Hecho Comprobable
                          </span>
                        )}
                        {fact.type === 'OPINION' && (
                          <span className="text-blue-700 dark:text-blue-400 flex items-center gap-1">
                            <MessageSquare size={12} /> Percepción Familiar
                          </span>
                        )}
                        {fact.type === 'CONTEXT' && (
                          <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            📜 Contexto Histórico
                          </span>
                        )}
                      </div>
                      <p className="m-0">{fact.content}</p>
                      {fact.source && (
                        <span className="text-[10px] opacity-75 italic block mt-1">
                          Fuente: {fact.source}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Story Prompts */}
            <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="m-0 mb-2.5 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                <Sparkles size={14} /> Inspiración para escribir sobre {person.name}
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  `¿A qué jugaba ${person.name} en su infancia?`,
                  `¿Cuál era la frase típica de ${person.name}?`,
                  `¿Cómo conoció ${person.name} a su pareja?`,
                  `¿Cuál fue el mayor desafío que enfrentó?`
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyPrompt(prompt)}
                    className="text-left p-2.5 rounded-xl bg-orange-50/70 dark:bg-orange-950/20 hover:bg-orange-100/80 dark:hover:bg-orange-900/30 border border-orange-200/60 dark:border-orange-800/40 text-xs font-medium text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="flex-1 pr-2 leading-snug">{prompt}</span>
                    <span className="shrink-0 text-orange-600 dark:text-orange-400 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Copy size={13} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'media' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500">Grabaciones de Voz</h4>
              <button
                onClick={() => audioInputRef.current?.click()}
                disabled={isUploadingAudio}
                className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
              >
                {isUploadingAudio ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
                <span>{isUploadingAudio ? 'Subiendo...' : 'Subir Audio'}</span>
              </button>
              <input type="file" ref={audioInputRef} onChange={handleAudioUpload} accept="audio/*" className="hidden" />
            </div>

            {person.audioRecordings && person.audioRecordings.length > 0 ? (
              person.audioRecordings.map((rec) => (
                <AudioPlayer key={rec.id} title={rec.title} duration={rec.duration} transcript={rec.transcript} audioUrl={rec.audioUrl} />
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Volume2 size={22} />
                </div>
                <h5 className="m-0 text-sm font-bold text-slate-700 dark:text-slate-200">Sin audios grabados</h5>
                <p className="m-0 text-xs text-slate-500 max-w-[240px]">
                  Preserva la voz de {person.name} subiendo un archivo de audio o nota de voz.
                </p>
                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="mt-2 text-xs font-bold text-orange-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <UploadCloud size={14} /> Subir primer audio
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'counterpoints' && (
          <div className="flex flex-col gap-4">
            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500">Testimonios Cruzados</h4>
            {person.counterpoints && person.counterpoints.length > 0 ? (
              person.counterpoints.map((cp) => (
                <div key={cp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col gap-3">
                  <h5 className="m-0 text-xs font-bold text-orange-600 dark:text-orange-400">{cp.topic}</h5>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">🗣️ {cp.versionA.author}:</span>
                      <span className="italic text-slate-600 dark:text-slate-300">"{cp.versionA.text}"</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">🗣️ {cp.versionB.author}:</span>
                      <span className="italic text-slate-600 dark:text-slate-300">"{cp.versionB.text}"</span>
                    </div>
                  </div>
                  {cp.notes && <p className="m-0 text-[11px] text-slate-500 italic">Nota: {cp.notes}</p>}
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <h5 className="m-0 text-sm font-bold text-slate-700 dark:text-slate-200">Sin contradicciones</h5>
                <p className="m-0 text-xs text-slate-500 max-w-[240px]">
                  Todos los testimonios sobre {person.name} concuerdan armoniosamente.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'values' && (
          <div className="flex flex-col gap-3">
            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500">Manifiesto & Valores de Vida</h4>
            {person.valuesAndTeachings && person.valuesAndTeachings.length > 0 ? (
              person.valuesAndTeachings.map((val, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-amber-500/10 border-l-3 border-amber-500 text-xs font-semibold text-amber-950 dark:text-amber-200 leading-relaxed shadow-2xs"
                >
                  "{val}"
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Heart size={22} />
                </div>
                <h5 className="m-0 text-sm font-bold text-slate-700 dark:text-slate-200">Sin enseñanzas registradas</h5>
                <p className="m-0 text-xs text-slate-500 max-w-[240px]">
                  Agrega las frases y valores característicos de {person.name} para las próximas generaciones.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating In-Drawer Toast for Copied Prompt */}
      {copiedPrompt && (
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs animate-fade-in border border-slate-700 z-50">
          <div className="flex items-center gap-2 truncate">
            <Check size={16} className="text-emerald-400 shrink-0" />
            <span className="truncate">Pregunta copiada al portapapeles</span>
          </div>
          {onNavigateToFeed && (
            <button
              onClick={() => {
                onNavigateToFeed(copiedPrompt, person.name);
                onClose();
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
            >
              <span>Ir al Feed</span>
              <ArrowRight size={12} />
            </button>
          )}
        </div>
      )}
    </div>
    </>
  );
};

