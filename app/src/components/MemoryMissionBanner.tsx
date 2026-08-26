import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, ChevronRight, X, Bookmark } from 'lucide-react';
import type { Person } from '../types/family';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

interface MemoryMissionBannerProps {
  persons: Person[];
  onSelectPerson: (person: Person) => void;
}

export const MemoryMissionBanner: React.FC<MemoryMissionBannerProps> = ({ persons, onSelectPerson }) => {
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const pickRandomPerson = () => {
    if (persons.length === 0) return;
    const eligible = persons.filter(p => !currentPerson || p.id !== currentPerson.id);
    if (eligible.length === 0) return;
    const random = eligible[Math.floor(Math.random() * eligible.length)];
    setCurrentPerson(random);
  };

  useEffect(() => {
    if (persons.length > 0 && !currentPerson) {
      pickRandomPerson();
    }
  }, [persons]);

  if (isDismissed || !currentPerson) return null;

  const branchTheme = (currentPerson.branch && BRANCH_COLORS[currentPerson.branch]) || DEFAULT_BRANCH_COLOR;

  if (isMinimized) {
    return (
      <div className="absolute bottom-4 left-4 z-30">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-orange-200 dark:border-orange-800/60 shadow-xl px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-orange-400 transition-all cursor-pointer group hover:scale-105"
        >
          <Sparkles size={14} className="text-orange-600 animate-pulse" />
          <span>✨ ¿Qué recuerdas de tu familia?</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-fade-in">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-orange-200/90 dark:border-orange-800/80 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div 
          className="absolute top-0 left-0 right-0 h-1" 
          style={{ backgroundColor: branchTheme.stroke }} 
        />

        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Bookmark size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                Misión de Memoria
              </span>
              <h4 className="m-0 text-sm font-bold text-slate-900 dark:text-slate-100">
                ¿Qué recuerdas de {currentPerson.name}?
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Minimizar"
            >
              <span className="text-xs font-bold leading-none -mt-1">—</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Cerrar"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        <p className="m-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentPerson.branch ? `De la rama ${currentPerson.branch}. ` : ''}
          Toca para ver sus fotos, grabaciones de voz o sumar una anécdota para la posteridad.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelectPerson(currentPerson)}
            className="flex-1 py-2 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span>Ver Historia & Aportar</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={pickRandomPerson}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold shrink-0"
            title="Elegir otro familiar al azar"
          >
            <Dices size={15} />
            <span className="hidden sm:inline">Otro familiar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
