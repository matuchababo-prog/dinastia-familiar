import React, { useState } from 'react';
import { X, UserCheck, Search, Activity, Sparkles, Target, Award, Clock } from 'lucide-react';
import type { VisitorRecord } from '../types/gamification';
import type { Person } from '../types/family';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';
import { formatRelativeTime } from '../services/gamificationService';

interface FamilyVisitorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitors: VisitorRecord[];
  persons: Person[];
  onFocusPerson?: (personId: string) => void;
}

export const FamilyVisitorsModal: React.FC<FamilyVisitorsModalProps> = ({
  isOpen,
  onClose,
  visitors,
  persons,
  onFocusPerson,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredVisitors = visitors.filter(v => {
    const q = search.trim().toLowerCase();
    return q === '' || v.name.toLowerCase().includes(q) || (v.branch && v.branch.toLowerCase().includes(q)) || (v.role && v.role.toLowerCase().includes(q));
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 max-w-xl w-full shadow-2xl z-10 flex flex-col gap-4 max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs">
              <UserCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="m-0 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Familiares que ya lo vieron
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Activity size={10} className="animate-pulse" /> En Vivo
                </span>
              </div>
              <p className="m-0 text-xs text-slate-500">
                {visitors.length} familiares han accedido y explorado el árbol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search filter */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o rama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-xl border-none outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Visitors List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 min-h-[220px]">
          {filteredVisitors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
              <UserCheck size={28} className="opacity-40 mb-2" />
              <p className="text-xs font-semibold">No se encontraron visitantes con ese nombre</p>
            </div>
          ) : (
            filteredVisitors.map((visitor) => {
              const branchTheme = (visitor.branch && BRANCH_COLORS[visitor.branch]) || DEFAULT_BRANCH_COLOR;
              const hasTreePerson = !!visitor.personId && persons.some(p => p.id === visitor.personId);

              return (
                <div
                  key={visitor.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 overflow-hidden shadow-2xs"
                      style={{ backgroundColor: branchTheme.stroke }}
                    >
                      {visitor.photoUrl ? (
                        <img src={visitor.photoUrl} alt={visitor.name} className="w-full h-full object-cover" />
                      ) : (
                        visitor.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {visitor.name}
                        </span>
                        {visitor.role?.includes('Admin') && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                            👑 Admin
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate mt-0.5">
                        <span className="truncate">{visitor.role || 'Miembro familiar'}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                          <Clock size={10} /> {formatRelativeTime(visitor.lastSeenTimestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {visitor.level && (
                      <span className="hidden sm:inline-flex text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full items-center gap-1">
                        <Award size={10} /> Nivel {visitor.level}
                      </span>
                    )}

                    {hasTreePerson && onFocusPerson && (
                      <button
                        onClick={() => {
                          if (visitor.personId) {
                            onFocusPerson(visitor.personId);
                            onClose();
                          }
                        }}
                        className="py-1 px-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-orange-50 dark:hover:bg-orange-950/50 text-slate-700 dark:text-slate-200 hover:text-orange-600 border border-slate-200 dark:border-slate-600 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        title="Ver en el árbol"
                      >
                        <Target size={12} />
                        <span className="hidden sm:inline">Ver Ficha</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles size={13} className="text-orange-600" />
            Cada familiar que entra deja su huella
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
