import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Search, 
  Heart, 
  ChevronRight,
  Eye
} from 'lucide-react';
import type { Person, FamilyUnion } from '../types/family';
import { calculateKinshipWithMatias, getPersonalizedQuestionsForUser } from '../utils/kinship';
import type { KinshipInfo } from '../utils/kinship';
import { useFamilyUser } from '../context/FamilyUserContext';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';
import { matchesSearch } from '../utils/text';

interface MatiasInteractiveGuideProps {
  isOpen: boolean;
  onClose: () => void;
  persons: Person[];
  unions: FamilyUnion[];
  onFocusPerson: (personId: string) => void;
  onFocusBranch?: (branch: string) => void;
  onOpenWhyModal: () => void;
}

export const MatiasInteractiveGuide: React.FC<MatiasInteractiveGuideProps> = ({
  isOpen,
  onClose,
  persons,
  unions,
  onFocusPerson,
  onFocusBranch,
  onOpenWhyModal
}) => {
  const { setAuthorInfo } = useFamilyUser();
  const [step, setStep] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string>(() => {
    return localStorage.getItem('dinastia_current_user_id') || '';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestRole, setGuestRole] = useState('');

  const selectedPerson = persons.find(p => p.id === selectedPersonId);
  const kinship: KinshipInfo = selectedPerson 
    ? calculateKinshipWithMatias(selectedPerson.id, persons, unions)
    : {
        relationType: 'RELATIVE',
        roleName: 'Familiar',
        greetingName: 'Familiar',
        personalizedPitch: '¡Hola! Qué alegría enorme que estés acá. Toda historia y anécdota que sumes ayuda a que el legado familiar nunca se pierda.',
        isDirectFamily: false
      };

  useEffect(() => {
    if (isOpen && !selectedPersonId) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPerson = (person: Person) => {
    setSelectedPersonId(person.id);
    localStorage.setItem('dinastia_current_user_id', person.id);
    setAuthorInfo(person.name, person.branch ? `Rama ${person.branch}` : 'Familiar');
    if (person.branch && onFocusBranch) {
      onFocusBranch(person.branch);
    }
    setStep(2);
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setAuthorInfo(guestName.trim(), guestRole.trim() || 'Familiar / Invitado');
    setStep(2);
  };

  const handleFinish = () => {
    localStorage.setItem('dinastia_matias_tour_completed', 'true');
    onClose();
  };

  const filteredPersons = persons.filter(p => 
    matchesSearch(p.name, searchQuery) ||
    (p.branch && matchesSearch(p.branch, searchQuery)) ||
    (p.tags && p.tags.some(t => matchesSearch(t, searchQuery)))
  );

  // Example sample questions for relatives
  const sampleRelatives = selectedPerson 
    ? persons.filter(p => p.id !== selectedPerson.id && (p.branch === selectedPerson.branch || p.generation <= selectedPerson.generation)).slice(0, 2)
    : persons.slice(0, 2);

  // If minimized during the tour
  if (isMinimized && step > 1) {
    return (
      <div className="fixed bottom-4 left-4 lg:left-[280px] z-40 animate-fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-orange-400 dark:border-orange-600 shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:border-orange-500 transition-all cursor-pointer group hover:scale-105"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            MC
          </div>
          <div className="text-left">
            <span className="block text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">Guía Familiar</span>
            <span>Paso {step} de 5 · Continuar tutorial</span>
          </div>
          <span className="ml-2 bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-xs px-2.5 py-1 rounded-lg">
            Abrir
          </span>
        </button>
      </div>
    );
  }

  // STEP 1: Modal centered with soft transparent backdrop so the tree is visible behind
  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto lg:pl-64">
        {/* Soft semi-transparent backdrop so tree is seen */}
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in" 
        />

        {/* Step 1 Card */}
        <div className="relative z-10 w-full max-w-xl sm:max-w-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-md rounded-3xl border-2 sm:border-3 border-orange-400 dark:border-orange-500/40 shadow-2xl p-5 sm:p-7 flex flex-col gap-4 animate-fade-in my-auto max-h-[92vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar guía"
          >
            <X size={18} />
          </button>

          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent p-4 rounded-2xl border-2 border-orange-300 dark:border-orange-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-md ring-3 ring-orange-400/40">
                  MC
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={14} /> Matías Chababo
                  </span>
                  <span className="text-[11px] bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 font-bold px-2 py-0.5 rounded-full">
                    Guía Familiar
                  </span>
                </div>
                <h2 className="m-0 text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                  ¡Hola! ¿Quién sos en la familia?
                </h2>
              </div>
            </div>

            <span className="text-xs font-black text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-slate-800 px-3 py-1 rounded-xl shadow-2xs border border-orange-200 dark:border-slate-700 shrink-0">
              Paso 1 de 5
            </span>
          </div>

          <div className="p-4 bg-orange-50/90 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-800/60 rounded-2xl text-sm text-slate-800 dark:text-slate-100 leading-relaxed shadow-2xs">
            <p className="m-0 font-medium">
              ¡Hola! Creé esta app para que toda la familia pueda conocer sus raíces, escuchar las voces de nuestros ancestros y sumar recuerdos.
            </p>
            <p className="m-0 mt-1.5 font-bold text-orange-900 dark:text-orange-300">
              Para empezar, buscá y seleccioná tu nombre en la lista:
            </p>
          </div>

          {!isGuest ? (
            <div className="flex flex-col gap-3">
              {/* Search Box */}
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Escribí tu nombre o apellido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 outline-none transition-all shadow-xs"
                  autoFocus
                />
              </div>

              {/* Persons Scroll List */}
              <div className="max-h-56 overflow-y-auto flex flex-col gap-2 pr-1">
                {filteredPersons.length > 0 ? (
                  filteredPersons.slice(0, 20).map((p) => {
                    const theme = p.branch ? (BRANCH_COLORS[p.branch] || DEFAULT_BRANCH_COLOR) : DEFAULT_BRANCH_COLOR;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPerson(p)}
                        className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50/80 dark:hover:bg-slate-800 flex items-center justify-between transition-all cursor-pointer group text-left shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-white shrink-0 shadow-xs"
                            style={{ backgroundColor: theme.stroke }}
                          >
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 block">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-xs text-slate-500">
                                Generación {p.generation}
                              </span>
                              <span 
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white"
                                style={{ backgroundColor: theme.stroke }}
                              >
                                {p.branch || 'Familia'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
                          <span className="hidden sm:inline">Elegir</span>
                          <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex flex-col items-center gap-1">
                    <span>No encontramos a nadie con "{searchQuery}".</span>
                    <span className="text-orange-600 font-bold">Podés tocar abajo para ingresar tu nombre.</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <button
                  onClick={() => setIsGuest(true)}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 underline font-bold cursor-pointer"
                >
                  ¿No estás en la lista o sos pariente político / amigo? Tocá acá
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveGuest} className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Tu Nombre y Apellido:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Tía Marta, Lucas..."
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Parentesco o Rama familiar (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pareja de Iván, Amigo de la familia..."
                  value={guestRole}
                  onChange={(e) => setGuestRole(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setIsGuest(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Volver a la lista
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // STEPS 2 TO 5: FLOATING GAME-STYLE BOTTOM HUD CARD (NO BLOCKING BACKDROP, OFFSET PROPERLY FROM SIDEBAR ON DESKTOP!)
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-6 sm:right-auto lg:left-[280px] lg:right-auto sm:max-w-xl md:max-w-2xl z-40 animate-fade-in pointer-events-auto">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border-2 sm:border-3 border-orange-400 dark:border-orange-500/50 shadow-2xl p-4 sm:p-6 flex flex-col gap-3.5 max-h-[82vh] overflow-y-auto">
        
        {/* Floating HUD Header */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              MC
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Matías Chababo
                </span>
                <span className="text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-bold px-1.5 py-0.2 rounded-full">
                  Paso {step} de 5
                </span>
              </div>
              <h3 className="m-0 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {step === 2 && '1. Toda tu rama familiar en el árbol'}
                {step === 3 && '2. Tu tarjeta personal'}
                {step === 4 && '3. Preguntas de memoria'}
                {step === 5 && '4. Guía de uso ultra fácil'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsMinimized(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              title="Minimizar para ver el árbol completo"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">Ver Árbol</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar guía"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* STEP 2 CONTENT */}
        {step === 2 && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <p className="m-0 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              ¡Hola <strong>{kinship.greetingName}</strong>! Primero te enfoco en el mapa a toda tu rama familiar (<strong>{selectedPerson?.branch ? `Rama ${selectedPerson.branch}` : 'Familia'}</strong>) para que veas dónde están tus padres, abuelos y tíos juntos.
            </p>

            {selectedPerson?.branch && (
              <div className="p-3 bg-orange-50/80 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800/60 flex items-center justify-between gap-2">
                <div>
                  <h4 className="m-0 text-xs sm:text-sm font-bold text-orange-950 dark:text-orange-200">
                    Familia {selectedPerson.branch}
                  </h4>
                  <p className="m-0 text-[11px] text-slate-500">Tus raíces en el mapa</p>
                </div>
                {onFocusBranch && (
                  <button
                    onClick={() => onFocusBranch(selectedPerson.branch!)}
                    className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    Enfocar Rama
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                onClick={() => setStep(1)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Cambiar persona
              </button>

              <button
                onClick={() => {
                  if (selectedPerson) onFocusPerson(selectedPerson.id);
                  setStep(3);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente: Ver mi tarjeta</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT */}
        {step === 3 && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <p className="m-0 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              {kinship.personalizedPitch}
            </p>

            {selectedPerson && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {selectedPerson.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <h4 className="m-0 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{selectedPerson.name}</h4>
                    <span className="text-[11px] text-slate-500">
                      Gen {selectedPerson.generation} · {selectedPerson.branch || 'Principal'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onFocusPerson(selectedPerson.id)}
                  className="px-3 py-1.5 bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800 rounded-lg text-xs font-bold hover:bg-orange-200 cursor-pointer shrink-0"
                >
                  🎯 Enfocar
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                onClick={() => setStep(2)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Anterior
              </button>

              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente: Preguntas para ti</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 CONTENT */}
        {step === 4 && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <p className="m-0 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
              Al tocar a cualquier familiar en el árbol, la app te deja <strong>preguntas personalizadas según tu parentesco</strong> para que nos cuentes recuerdos y queden guardados en la familia:
            </p>

            {/* Sample Question Previews */}
            <div className="flex flex-col gap-2">
              {sampleRelatives.map((rel, idx) => {
                const questions = getPersonalizedQuestionsForUser(selectedPerson?.id, rel, persons, unions);
                const firstQ = questions[0]?.question || `¿Qué recuerdo tenés de ${rel.name}?`;
                return (
                  <div key={idx} className="p-2.5 bg-orange-50/80 dark:bg-orange-950/30 rounded-xl border border-orange-200/80 dark:border-orange-800/50 text-xs">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-0.5">Sobre {rel.name}:</span>
                    <p className="m-0 italic text-slate-800 dark:text-slate-200">"{firstQ}"</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                onClick={() => setStep(3)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Anterior
              </button>

              <button
                onClick={() => setStep(5)}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Siguiente: Tips de uso</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 CONTENT */}
        {step === 5 && (
          <div className="flex flex-col gap-3 animate-fade-in text-center sm:text-left">
            <div>
              <h3 className="m-0 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50">
                ¡Ultra fácil y pensado para todas las edades!
              </h3>
              <p className="m-0 mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Podés usar la app desde el celular o la computadora:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-left">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">👆 Tocá fotos</span>
                <p className="m-0 text-[11px] text-slate-500 leading-tight">Abre fotos y datos en grande.</p>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">🔊 Escuchá voz</span>
                <p className="m-0 text-[11px] text-slate-500 leading-tight">Apretá el botón Play.</p>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">✍️ Sumá anécdotas</span>
                <p className="m-0 text-[11px] text-slate-500 leading-tight">Escribí con tus palabras.</p>
              </div>
            </div>

            <div className="text-center pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenWhyModal();
                }}
                className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Heart size={13} />
                <span>Leer la carta de Matías: ¿Por qué creé esta app?</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                onClick={() => setStep(4)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Anterior
              </button>

              <button
                onClick={handleFinish}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Check size={16} />
                <span>¡Comenzar a explorar!</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
