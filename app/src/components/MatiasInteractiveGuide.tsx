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
  Compass,
  Users
} from 'lucide-react';
import type { Person, FamilyUnion } from '../types/family';
import { calculateKinshipWithMatias, getPersonalizedQuestionsForUser } from '../utils/kinship';
import type { KinshipInfo } from '../utils/kinship';
import { useFamilyUser } from '../context/FamilyUserContext';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

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
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.branch && p.branch.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Example sample questions for relatives
  const sampleRelatives = selectedPerson 
    ? persons.filter(p => p.id !== selectedPerson.id && (p.branch === selectedPerson.branch || p.generation <= selectedPerson.generation)).slice(0, 2)
    : persons.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Main Quest / Tutorial Card */}
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border-3 border-orange-400 dark:border-orange-500/40 shadow-2xl p-5 sm:p-7 flex flex-col gap-4 animate-fade-in max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar guía"
        >
          <X size={18} />
        </button>

        {/* Host Avatar: Matías Cibernético */}
        <div className="flex items-center gap-3.5 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent p-3.5 rounded-2xl border-2 border-orange-300 dark:border-orange-900/60">
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0 ring-3 ring-orange-400/40">
              MC
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center" title="Matías En Línea">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={14} /> Matías Chababo
              </span>
              <span className="text-[11px] bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 font-bold px-2 py-0.5 rounded-full">
                Guía Familiar
              </span>
            </div>
            <h3 className="m-0 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
              {step === 1 ? '¡Hola! ¿Quién sos en la familia?' : `Hablando con ${selectedPerson?.name || guestName || 'vos'}`}
            </h3>
          </div>

          <span className="text-xs sm:text-sm font-black text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-slate-800 px-3 py-1 rounded-xl shadow-2xs border border-orange-200 dark:border-slate-700">
            Paso {step} de 5
          </span>
        </div>

        {/* STEP 1: Identification */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-800/60 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              <p className="m-0 font-semibold">
                ¡Hola! Creé esta app para que toda la familia pueda conocer sus raíces y guardar sus recuerdos. Para empezar, <strong>elegí tu nombre en la lista:</strong>
              </p>
            </div>

            {!isGuest ? (
              <div className="flex flex-col gap-3">
                {/* Search Box */}
                <div className="relative">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscá tu nombre o apellido..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:bg-white focus:border-orange-500 outline-none"
                    autoFocus
                  />
                </div>

                {/* Persons Scroll List */}
                <div className="max-h-56 overflow-y-auto flex flex-col gap-2 pr-1">
                  {filteredPersons.slice(0, 15).map((p) => {
                    const theme = p.branch ? (BRANCH_COLORS[p.branch] || DEFAULT_BRANCH_COLOR) : DEFAULT_BRANCH_COLOR;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPerson(p)}
                        className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 flex items-center justify-between transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-xs"
                            style={{ backgroundColor: theme.stroke }}
                          >
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 block">
                              {p.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              Generación {p.generation} · Rama {p.branch || 'Familia'}
                            </span>
                          </div>
                        </div>

                        <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
                      </button>
                    );
                  })}
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
                    className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 text-sm text-slate-900 outline-none focus:border-orange-500"
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
                    className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => setIsGuest(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Volver a la lista
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
                  >
                    Continuar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* STEP 2: Whole Family Branch Overview */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-800/60 rounded-2xl flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300">
                <Users size={18} />
                <span>1. Mirá dónde está toda tu familia en el árbol</span>
              </div>
              <p className="m-0 text-xs sm:text-sm font-medium text-orange-950 dark:text-orange-100 leading-relaxed">
                ¡Hola <strong>{kinship.greetingName}</strong>! Primero te muestro en pantalla a toda tu rama familiar (<strong>{selectedPerson?.branch ? `Rama ${selectedPerson.branch}` : 'Familia'}</strong>) para que veas dónde están ubicados tus padres, abuelos, tíos y primos juntos.
              </p>
            </div>

            {selectedPerson?.branch && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="m-0 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    Familia {selectedPerson.branch}
                  </h4>
                  <p className="m-0 text-xs text-slate-500">Tus raíces y parientes en el mapa</p>
                </div>
                {onFocusBranch && (
                  <button
                    onClick={() => onFocusBranch(selectedPerson.branch!)}
                    className="px-3.5 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    Ver Toda mi Rama
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={16} /> Cambiar persona
              </button>

              <button
                onClick={() => {
                  if (selectedPerson) onFocusPerson(selectedPerson.id);
                  setStep(3);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Siguiente: Ver mi tarjeta</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Personal Card Focus */}
        {step === 3 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-800/60 rounded-2xl flex flex-col gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300">
                <Compass size={18} />
                <span>2. ¡Y acá está tu tarjeta personal!</span>
              </div>
              <p className="m-0 text-xs sm:text-sm font-semibold text-orange-950 dark:text-orange-100 leading-relaxed">
                {kinship.personalizedPitch}
              </p>
            </div>

            {selectedPerson && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                    {selectedPerson.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="m-0 text-sm font-bold text-slate-900 dark:text-slate-100">{selectedPerson.name}</h4>
                    <span className="text-xs text-slate-500">
                      Generación {selectedPerson.generation} · Rama {selectedPerson.branch || 'Principal'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onFocusPerson(selectedPerson.id)}
                  className="px-3.5 py-2 bg-white dark:bg-slate-700 border-2 border-orange-300 dark:border-slate-600 rounded-xl text-xs font-bold text-orange-700 hover:bg-orange-50 cursor-pointer shadow-2xs"
                >
                  🎯 Enfocar Tarjeta
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Siguiente: Preguntas para ti</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Personalized Questions for this User */}
        {step === 4 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/60 rounded-2xl text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed flex flex-col gap-2">
              <span className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300 text-sm">
                💡 3. Preguntas personalizadas sobre tus familiares
              </span>
              <p className="m-0">
                Al tocar a tus familiares cercanos (padres, abuelos, hermanos o tíos), la app te va a dejar <strong>preguntas especiales hechas a tu medida</strong> para que nos cuentes tus anécdotas con ellos:
              </p>
            </div>

            {/* Sample Question Previews */}
            <div className="flex flex-col gap-2">
              {sampleRelatives.map((rel, idx) => {
                const questions = getPersonalizedQuestionsForUser(selectedPerson?.id, rel, persons, unions);
                const firstQ = questions[0]?.question || `¿Qué recuerdo tenés de ${rel.name}?`;
                return (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-orange-600 block mb-0.5">Sobre {rel.name}:</span>
                    <p className="m-0 italic text-slate-700 dark:text-slate-300">"{firstQ}"</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              <button
                onClick={() => setStep(5)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Siguiente: ¡Cómo usarlo!</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Senior-Friendly Usage Tips & Start */}
        {step === 5 && (
          <div className="flex flex-col gap-4 animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto text-2xl shadow-md">
              👴👵
            </div>

            <div>
              <h3 className="m-0 text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50">
                ¡Ultra fácil y pensado para todos!
              </h3>
              <p className="m-0 mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Podés usar la app desde el teléfono o la computadora con total tranquilidad:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">👆 Tocá cualquier foto</span>
                <p className="m-0 text-slate-500">Abre su historia y sus fotos en grande.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">🔊 Escuchá su voz</span>
                <p className="m-0 text-slate-500">Apretá el botón grande de Play.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">✍️ Sumá anécdotas</span>
                <p className="m-0 text-slate-500">Escribí con tus palabras sin apuro.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              <button
                onClick={() => {
                  onClose();
                  onOpenWhyModal();
                }}
                className="text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <Heart size={14} />
                <span>Leer la carta de Matías: ¿Por qué creé esta app?</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              <button
                onClick={handleFinish}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer flex items-center gap-2 ml-auto transition-transform hover:scale-105"
              >
                <Check size={18} />
                <span>¡Comenzar a ver el árbol!</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
