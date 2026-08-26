import React, { useState, useRef, useEffect } from 'react';
import type { Person, FactType, FamilyUnion } from '../types/family';
import type { VisitorRecord } from '../types/gamification';
import { AudioPlayer } from './AudioPlayer';
import { 
  User, 
  CheckCircle2, 
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
  Check, 
  Plus, 
  Edit3, 
  Save, 
  Trash2 
} from 'lucide-react';
import { uploadFileToCloud, savePersonToCloud, addFactToPerson, addValueToPerson, deleteFactFromPerson, deleteValueFromPerson } from '../services/familyService';
import { recordExploredPerson, awardXp } from '../services/gamificationService';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';
import { useFamilyUser } from '../context/FamilyUserContext';
import { calculateKinshipBetween, getPersonalizedQuestionsForUser } from '../utils/kinship';

interface ProfileSheetProps {
  person: Person | null;
  onClose: () => void;
  onFocusPerson?: (id: string) => void;
  isFocal?: boolean;
  persons?: Person[];
  unions?: FamilyUnion[];
  visitors?: VisitorRecord[];
}

export const ProfileSheet: React.FC<ProfileSheetProps> = ({ 
  person, 
  onClose, 
  onFocusPerson, 
  isFocal,
  persons = [],
  unions = [],
  visitors = []
}) => {
  const { authorName, isAdmin, ensureAuthorName, linkPersonToUser, linkedPersonId } = useFamilyUser();

  const [activeTab, setActiveTab] = useState<'bio' | 'media' | 'counterpoints' | 'values'>('bio');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  
  // Collaborative Editing & Contributions State
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioSummaryDraft, setBioSummaryDraft] = useState('');
  const [birthDateDraft, setBirthDateDraft] = useState('');
  const [deathDateDraft, setDeathDateDraft] = useState('');
  const [birthPlaceDraft, setBirthPlaceDraft] = useState('');
  const [isSavingBio, setIsSavingBio] = useState(false);

  // In-app Q&A state
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [isSavingAnswer, setIsSavingAnswer] = useState(false);
  const [showAnswerSuccess, setShowAnswerSuccess] = useState(false);

  const [isAddingFact, setIsAddingFact] = useState(false);
  const [newFactType, setNewFactType] = useState<FactType>('FACT');
  const [newFactContent, setNewFactContent] = useState('');
  const [newFactSource, setNewFactSource] = useState('');
  const [isSavingFact, setIsSavingFact] = useState(false);

  const [isAddingValue, setIsAddingValue] = useState(false);
  const [newValueDraft, setNewValueDraft] = useState('');
  const [isSavingValue, setIsSavingValue] = useState(false);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (person) {
      setBioSummaryDraft(person.bioSummary || '');
      setBirthDateDraft(person.birthDate || person.birthYear || '');
      setDeathDateDraft(person.deathDate || person.deathYear || '');
      setBirthPlaceDraft(person.birthPlace || '');
      setIsEditingBio(false);
      setIsAddingFact(false);
      setIsAddingValue(false);
      setAnsweringQuestion(null);
      setAnswerText('');

      // Award XP for exploring this family member
      recordExploredPerson(person);
    }
  }, [person]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !person) return;
    
    ensureAuthorName(async () => {
      try {
        setIsUploadingPhoto(true);
        const url = await uploadFileToCloud(file, `photos/${person.id}_${Date.now()}`);
        const updatedPerson = { 
          ...person, 
          photoUrl: url,
          lastEditedBy: authorName || 'Familiar',
          lastEditedAt: new Date().toLocaleDateString('es-AR')
        };
        await savePersonToCloud(updatedPerson);
        person.photoUrl = url;
        awardXp(40, 'photo_keeper');
      } catch (err) {
        console.error('Photo upload failed:', err);
      } finally {
        setIsUploadingPhoto(false);
      }
    });
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !person) return;

    ensureAuthorName(async () => {
      try {
        setIsUploadingAudio(true);
        const url = await uploadFileToCloud(file, `audios/${person.id}_${Date.now()}`);
        const newAudio = {
          id: `rec-${Date.now()}`,
          title: `Grabación subida por ${authorName || 'Familiar'}`,
          duration: 'Audio',
          transcript: 'Audio testimonial familiar guardado en la memoria de la dinastía.',
          audioUrl: url
        };
        const updatedPerson = {
          ...person,
          audioRecordings: [...(person.audioRecordings || []), newAudio],
          lastEditedBy: authorName || 'Familiar',
          lastEditedAt: new Date().toLocaleDateString('es-AR')
        };
        await savePersonToCloud(updatedPerson);
        person.audioRecordings = updatedPerson.audioRecordings;
        awardXp(45, 'audio_listener');
      } catch (err) {
        console.error('Audio upload failed:', err);
      } finally {
        setIsUploadingAudio(false);
      }
    });
  };

  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!person) return;
    
    ensureAuthorName(async () => {
      try {
        setIsSavingBio(true);
        const updatedPerson = {
          ...person,
          bioSummary: bioSummaryDraft,
          birthDate: birthDateDraft,
          deathDate: deathDateDraft,
          birthPlace: birthPlaceDraft,
          lastEditedBy: authorName || 'Familiar',
          lastEditedAt: new Date().toLocaleDateString('es-AR')
        };
        await savePersonToCloud(updatedPerson);
        Object.assign(person, updatedPerson);
        setIsEditingBio(false);
        awardXp(30, 'wisdom_sharer');
      } catch (err) {
        console.error('Save bio failed:', err);
      } finally {
        setIsSavingBio(false);
      }
    });
  };

  const handleSaveFact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!person || !newFactContent.trim()) return;

    ensureAuthorName(async () => {
      try {
        setIsSavingFact(true);
        const updated = await addFactToPerson(person, {
          type: newFactType,
          content: newFactContent.trim(),
          source: newFactSource.trim() || undefined,
          authorName: authorName || 'Familiar',
          createdAt: new Date().toLocaleDateString('es-AR')
        });
        Object.assign(person, updated);
        setNewFactContent('');
        setNewFactSource('');
        setIsAddingFact(false);
        awardXp(35, 'family_chronicler');
      } catch (err) {
        console.error('Add fact failed:', err);
      } finally {
        setIsSavingFact(false);
      }
    });
  };

  const handleSaveValue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!person || !newValueDraft.trim()) return;

    ensureAuthorName(async () => {
      try {
        setIsSavingValue(true);
        const updated = await addValueToPerson(person, newValueDraft.trim(), authorName || 'Familiar');
        Object.assign(person, updated);
        setNewValueDraft('');
        setIsAddingValue(false);
        awardXp(25, 'wisdom_sharer');
      } catch (err) {
        console.error('Add value failed:', err);
      } finally {
        setIsSavingValue(false);
      }
    });
  };

  const handleDeleteFact = async (factId: string) => {
    if (!person) return;
    if (window.confirm('¿Deseas eliminar este hecho/anécdota de la historia familiar?')) {
      const updated = await deleteFactFromPerson(person, factId);
      Object.assign(person, updated);
    }
  };

  const handleDeleteValue = async (valIdx: number) => {
    if (!person) return;
    if (window.confirm('¿Deseas eliminar esta enseñanza?')) {
      const updated = await deleteValueFromPerson(person, valIdx);
      Object.assign(person, updated);
    }
  };

  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('dinastia_current_user_id') : null;
  const kinship = person ? calculateKinshipBetween(currentUserId, person.id, persons, unions) : null;
  const personalizedQuestions = person ? getPersonalizedQuestionsForUser(currentUserId, person, persons, unions) : [];

  const handleSaveAnswer = async (questionText: string) => {
    if (!person || !answerText.trim()) return;

    ensureAuthorName(async () => {
      try {
        setIsSavingAnswer(true);
        const updated = await addFactToPerson(person, {
          content: `"${answerText.trim()}" (En respuesta a: ${questionText})`,
          authorName: authorName || 'Familiar',
          type: 'OPINION',
          source: `Recuerdo de ${authorName || 'familiar'}`
        });
        Object.assign(person, updated);
        setAnswerText('');
        setAnsweringQuestion(null);
        setShowAnswerSuccess(true);
        setTimeout(() => setShowAnswerSuccess(false), 4500);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSavingAnswer(false);
      }
    });
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
            {/* Avatar / Photo with Cloud Upload Option */}
            <div className="relative group shrink-0">
              <div 
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center overflow-hidden shadow-md transition-transform group-hover:scale-102"
                style={{
                  backgroundColor: branchTheme.bg,
                  borderColor: branchTheme.stroke,
                  boxShadow: `0 0 16px ${branchTheme.glow}`
                }}
              >
                {person.photoUrl ? (
                  <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={36} color={branchTheme.stroke} />
                )}
              </div>

              <button
                onClick={() => photoInputRef.current?.click()}
                disabled={isUploadingPhoto}
                aria-label="Cambiar o subir foto"
                className="absolute -bottom-1.5 -right-1.5 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md border-2 border-white dark:border-slate-900 transition-all cursor-pointer hover:scale-110 active:scale-95"
                title="Subir foto a la nube"
              >
                {isUploadingPhoto ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
              </button>
              <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white shadow-2xs"
                  style={{ backgroundColor: branchTheme.stroke }}
                >
                  {person.branch || 'Rama Principal'}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  Gen {person.generation}
                </span>
              </div>

              <h2 className="m-0 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 truncate">
                {person.name}
              </h2>

              <p className="m-0 text-xs font-semibold text-slate-500 mt-0.5">
                {person.birthDate || person.birthYear || '?'} {person.deathDate || person.deathYear ? `— ${person.deathDate || person.deathYear}` : '· Presente'}
              </p>
            </div>
          </div>

          {/* Action Header Pills */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {onFocusPerson && (
              <button
                onClick={() => onFocusPerson(person.id)}
                className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isFocal
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-500'
                }`}
              >
                <Target size={14} />
                <span>{isFocal ? 'Enfocado en Árbol' : 'Enfocar Rama'}</span>
              </button>
            )}

            <button
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 size={13} />
              <span>{isEditingBio ? 'Cancelar' : 'Editar Datos'}</span>
            </button>
          </div>

          {/* Visitor Presence Status Card */}
          {(() => {
            const visitorData = visitors.find(v => v.personId === person.id || v.name.toLowerCase() === person.name.toLowerCase());
            const hasVisited = !!visitorData || person.hasVisited;

            if (hasVisited) {
              return (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-bold flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>¡{person.name} ya exploró el árbol!</span>
                  </div>
                  <span className="text-[10px] bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-extrabold">
                    👁️ {visitorData?.lastSeen || 'Visto'}
                  </span>
                </div>
              );
            }

            if (!person.deathDate && !person.deathYear && linkedPersonId !== person.id && authorName.toLowerCase() !== person.name.toLowerCase()) {
              return (
                <div className="mt-3 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">¿Eres tú {person.name}?</span>
                  <button
                    onClick={() => linkPersonToUser(person.id, person.name, person.branch)}
                    className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Identificarme
                  </button>
                </div>
              );
            }

            return null;
          })()}
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
              {/* Interactive Contribution Action Box */}
              <div className="bg-orange-50/90 dark:bg-orange-950/40 border-2 border-orange-300 dark:border-orange-800/80 rounded-2xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-orange-950 dark:text-orange-200 flex items-center gap-1.5">
                    <Sparkles size={16} className="text-orange-600 animate-pulse shrink-0" />
                    {authorName ? `¿Qué recuerdas de ${person.name}, ${authorName}?` : `¿Qué recuerdas de ${person.name}?`}
                  </span>
                  <span className="text-[11px] text-orange-800 dark:text-orange-300 font-bold bg-orange-200/80 dark:bg-orange-900/60 px-2.5 py-0.5 rounded-full">
                    {kinship?.roleName || 'Familiar'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingFact(true)}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 border-2 border-orange-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="text-lg">✍️</span>
                    <span>Sumar anécdota</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 border-2 border-orange-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="text-lg">📸</span>
                    <span>Subir foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('media');
                      setTimeout(() => audioInputRef.current?.click(), 100);
                    }}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 border-2 border-orange-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="text-lg">🎙️</span>
                    <span>Subir audio/voz</span>
                  </button>
                </div>
              </div>

              {/* Edit Bio Form */}
              {isEditingBio ? (
                <form onSubmit={handleSaveBio} className="p-4 bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/50 rounded-2xl flex flex-col gap-3 animate-fade-in">
                  <h4 className="m-0 text-xs font-bold text-orange-950 dark:text-orange-200 uppercase tracking-wider">
                    Editar Datos Principales
                  </h4>
                  
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Resumen Biográfico:
                    </label>
                    <textarea
                      value={bioSummaryDraft}
                      onChange={(e) => setBioSummaryDraft(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500"
                      placeholder="Escribe la biografía principal..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Nacimiento:</label>
                      <input
                        type="text"
                        value={birthDateDraft}
                        onChange={(e) => setBirthDateDraft(e.target.value)}
                        placeholder="Ej: 14 de Mayo, 1928"
                        className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Fallecimiento:</label>
                      <input
                        type="text"
                        value={deathDateDraft}
                        onChange={(e) => setDeathDateDraft(e.target.value)}
                        placeholder="Ej: 2012 o 'Presente'"
                        className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Lugar de Origen:</label>
                    <input
                      type="text"
                      value={birthPlaceDraft}
                      onChange={(e) => setBirthPlaceDraft(e.target.value)}
                      placeholder="Ej: Moises Ville, Santa Fe"
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingBio(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingBio}
                      className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      {isSavingBio ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h4 className="m-0 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Biografía</h4>
                  <p className="m-0 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                    {person.bioSummary || 'Sin biografía cargada todavía. Puedes presionar "Editar Datos" para comenzar.'}
                  </p>
                  {person.birthPlace && (
                    <p className="m-0 text-xs text-slate-500 mt-2 font-sans">
                      📍 <strong>Lugar de origen:</strong> {person.birthPlace}
                    </p>
                  )}
                  {person.lastEditedBy && (
                    <p className="m-0 text-[10px] text-slate-400 mt-3 italic font-sans">
                      Última actualización por {person.lastEditedBy} {person.lastEditedAt ? `· ${person.lastEditedAt}` : ''}
                    </p>
                  )}
                </div>
              )}

              {/* Hechos y Anécdotas */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Hechos & Anécdotas ({person.facts?.length || 0})
                  </h4>
                  <button
                    onClick={() => setIsAddingFact(!isAddingFact)}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 flex items-center gap-1 cursor-pointer bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Plus size={13} />
                    <span>{isAddingFact ? 'Cancelar' : 'Sumar Anécdota'}</span>
                  </button>
                </div>

                {/* Add Fact Form */}
                {isAddingFact && (
                  <form onSubmit={handleSaveFact} className="p-3.5 rounded-2xl bg-orange-50/90 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 flex flex-col gap-2.5 animate-fade-in">
                    <div className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tipo:</span>
                      <select
                        value={newFactType}
                        onChange={(e) => setNewFactType(e.target.value as FactType)}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold outline-none"
                      >
                        <option value="FACT">Hecho Verificado</option>
                        <option value="ANECDOTA">Anécdota / Historia</option>
                        <option value="OPINION">Recuerdo Personal</option>
                        <option value="CONTEXT">Contexto de Época</option>
                      </select>
                    </div>

                    <textarea
                      value={newFactContent}
                      onChange={(e) => setNewFactContent(e.target.value)}
                      placeholder="Escribe aquí el recuerdo o la anécdota..."
                      rows={3}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500"
                      required
                    />

                    <input
                      type="text"
                      value={newFactSource}
                      onChange={(e) => setNewFactSource(e.target.value)}
                      placeholder="Fuente o quién te lo contó (opcional)"
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none focus:border-orange-500"
                    />

                    <button
                      type="submit"
                      disabled={isSavingFact || !newFactContent.trim()}
                      className="py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
                    >
                      {isSavingFact ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                      <span>Guardar en la historia familiar</span>
                    </button>
                  </form>
                )}

                {/* Facts List */}
                {person.facts && person.facts.length > 0 ? (
                  <div className="flex flex-col gap-2.5">
                    {person.facts.map((fact) => (
                      <div
                        key={fact.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex flex-col gap-1.5 shadow-2xs relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              fact.type === 'FACT'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : fact.type === 'ANECDOTA'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            }`}
                          >
                            {fact.type === 'FACT' ? 'Hecho' : fact.type === 'ANECDOTA' ? 'Anécdota' : 'Recuerdo'}
                          </span>
                          {fact.createdAt && (
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {fact.createdAt}
                            </span>
                          )}
                        </div>
                        <p className="m-0">{fact.content}</p>
                        <div className="flex items-center justify-between mt-1 text-[10px] opacity-80 pt-0.5">
                          {fact.source ? <span>Fuente: {fact.source}</span> : <span />}
                          <div className="flex items-center gap-2">
                            {fact.authorName && (
                              <span className="font-semibold">
                                ✍️ Aportado por {fact.authorName} {fact.createdAt ? `· ${fact.createdAt}` : ''}
                              </span>
                            )}
                            {(isAdmin || (authorName && fact.authorName && authorName.trim().toLowerCase() === fact.authorName.trim().toLowerCase())) && (
                              <button
                                type="button"
                                onClick={() => handleDeleteFact(fact.id)}
                                className="opacity-60 hover:opacity-100 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer"
                                title="Eliminar este hecho"
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="m-0 text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                    Sin hechos registrados aún. ¡Sé el primero en aportar una anécdota!
                  </p>
                )}
              </div>

              {/* Personalized In-App Questions for the Logged-in User */}
              <div className="mt-2 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="m-0 text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                    <Sparkles size={16} /> Preguntas para ti sobre {person.name}
                  </h4>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    {kinship?.roleName || 'Familiar'}
                  </span>
                </div>

                {showAnswerSuccess && (
                  <div className="p-3.5 mb-3 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-fade-in">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <span>¡Muchas gracias! Tu anécdota quedó guardada para toda la familia.</span>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {personalizedQuestions.map((q, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        answeringQuestion === q.question
                          ? 'bg-orange-50/90 dark:bg-orange-950/40 border-orange-400 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-lg shrink-0">💡</span>
                        <p className="m-0 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {answeringQuestion === q.question ? (
                        <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-orange-200 dark:border-orange-800 animate-fade-in">
                          <label className="text-xs font-bold text-orange-900 dark:text-orange-200">
                            Tu recuerdo o historia:
                          </label>
                          <textarea
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            rows={3}
                            placeholder="Escribí acá con tus palabras lo que te acuerdes..."
                            className="w-full p-3 rounded-xl border-2 border-orange-300 dark:border-orange-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAnsweringQuestion(null)}
                              className="py-2 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              disabled={!answerText.trim() || isSavingAnswer}
                              onClick={() => handleSaveAnswer(q.question)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                            >
                              {isSavingAnswer ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                              <span>Guardar este recuerdo</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setAnsweringQuestion(q.question);
                              setAnswerText('');
                            }}
                            className="py-2 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                          >
                            <Edit3 size={13} />
                            <span>Responder y guardar anécdota</span>
                          </button>
                        </div>
                      )}
                    </div>
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
              <div className="flex items-center justify-between">
                <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-500">Manifiesto & Valores de Vida</h4>
                <button
                  onClick={() => setIsAddingValue(!isAddingValue)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 flex items-center gap-1 cursor-pointer bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Plus size={13} />
                  <span>{isAddingValue ? 'Cancelar' : 'Aportar Enseñanza'}</span>
                </button>
              </div>

              {isAddingValue && (
                <form onSubmit={handleSaveValue} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col gap-2.5 animate-fade-in">
                  <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                    Frase típica, consejo o enseñanza de {person.name}:
                  </span>
                  <textarea
                    value={newValueDraft}
                    onChange={(e) => setNewValueDraft(e.target.value)}
                    placeholder="Ej: 'El trabajo honrado y la familia unida lo superan todo'..."
                    rows={2}
                    className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSavingValue || !newValueDraft.trim()}
                    className="py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
                  >
                    {isSavingValue ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                    <span>Guardar Enseñanza</span>
                  </button>
                </form>
              )}

              {person.valuesAndTeachings && person.valuesAndTeachings.length > 0 ? (
                person.valuesAndTeachings.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-amber-500/10 border-l-3 border-amber-500 text-xs font-semibold text-amber-950 dark:text-amber-200 leading-relaxed shadow-2xs flex items-center justify-between gap-2 group"
                  >
                    <span>"{val}"</span>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDeleteValue(idx)}
                        className="opacity-0 group-hover:opacity-100 hover:text-rose-600 text-slate-400 transition-opacity p-1 cursor-pointer shrink-0"
                        title="Eliminar enseñanza"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
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
                  <button
                    onClick={() => setIsAddingValue(true)}
                    className="mt-2 text-xs font-bold text-orange-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} /> Aportar primera enseñanza
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
