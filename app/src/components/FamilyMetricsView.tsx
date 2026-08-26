import React, { useMemo } from 'react';
import type { Person, FamilyUnion, MemoryPost } from '../types/family';
import type { VisitorRecord } from '../types/gamification';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';
import { 
  Users, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Heart, 
  Mic, 
  Eye, 
  MessageSquare, 
  Award, 
  Layers, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  UserCheck
} from 'lucide-react';

interface FamilyMetricsViewProps {
  persons: Person[];
  unions: FamilyUnion[];
  memories: MemoryPost[];
  visitors: VisitorRecord[];
  onSelectPerson?: (person: Person) => void;
  onFilterBranch?: (branch: string) => void;
  onFilterGeneration?: (gen: number) => void;
  onOpenGamification?: () => void;
  onOpenVisitors?: () => void;
}

export const FamilyMetricsView: React.FC<FamilyMetricsViewProps> = ({
  persons,
  unions,
  memories,
  visitors,
  onSelectPerson,
  onFilterBranch,
  onFilterGeneration,
  onOpenGamification,
  onOpenVisitors,
}) => {
  // Total stats
  const totalPersons = persons.length;
  const totalUnions = unions.length;
  const totalMemories = memories.length;
  const totalAudios = useMemo(() => {
    return persons.reduce((acc, p) => acc + (p.audioRecordings?.length || 0), 0);
  }, [persons]);

  // Completitud del Legado
  const personsWithPhoto = useMemo(() => persons.filter(p => !!p.photoUrl).length, [persons]);
  const personsWithBio = useMemo(() => persons.filter(p => !!p.bioSummary && p.bioSummary.trim().length > 10).length, [persons]);
  const personsWithFacts = useMemo(() => persons.filter(p => (p.facts && p.facts.length > 0) || (p.valuesAndTeachings && p.valuesAndTeachings.length > 0)).length, [persons]);
  const personsWithAudio = useMemo(() => persons.filter(p => p.audioRecordings && p.audioRecordings.length > 0).length, [persons]);

  const photoPercent = totalPersons > 0 ? Math.round((personsWithPhoto / totalPersons) * 100) : 0;
  const bioPercent = totalPersons > 0 ? Math.round((personsWithBio / totalPersons) * 100) : 0;
  const factsPercent = totalPersons > 0 ? Math.round((personsWithFacts / totalPersons) * 100) : 0;
  const overallHealthScore = Math.round((photoPercent + bioPercent + factsPercent) / 3);

  // Generation distribution
  const generationStats = useMemo(() => {
    const map: Record<number, number> = {};
    persons.forEach(p => {
      const gen = typeof p.generation === 'number' ? p.generation : 0;
      map[gen] = (map[gen] || 0) + 1;
    });
    const sorted = Object.entries(map).map(([gen, count]) => ({
      gen: Number(gen),
      count,
      label: gen === '0' ? 'Gen 0 (Ancestros)' : gen === '1' ? 'Gen 1 (Bisabuelos)' : gen === '2' ? 'Gen 2 (Abuelos / Padres)' : gen === '3' ? 'Gen 3 (Nuestra Generación)' : `Gen ${gen} (Descendientes)`
    })).sort((a, b) => a.gen - b.gen);
    return sorted;
  }, [persons]);

  const maxGenCount = useMemo(() => {
    return Math.max(...generationStats.map(g => g.count), 1);
  }, [generationStats]);

  // Branch breakdown
  const branchStats = useMemo(() => {
    const map: Record<string, number> = {};
    persons.forEach(p => {
      if (p.branch) {
        map[p.branch] = (map[p.branch] || 0) + 1;
      }
    });
    return Object.entries(map)
      .map(([branch, count]) => ({
        branch,
        count,
        percent: totalPersons > 0 ? Math.round((count / totalPersons) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [persons, totalPersons]);

  // Atlas of Origins (birthplaces)
  const birthplaceStats = useMemo(() => {
    const map: Record<string, { count: number; persons: string[] }> = {};
    persons.forEach(p => {
      const place = p.birthPlace?.trim();
      if (place && place !== 'Desconocido' && place !== '?') {
        if (!map[place]) map[place] = { count: 0, persons: [] };
        map[place].count += 1;
        map[place].persons.push(p.name);
      }
    });
    return Object.entries(map)
      .map(([place, data]) => ({ place, count: data.count, persons: data.persons }))
      .sort((a, b) => b.count - a.count);
  }, [persons]);

  // Top Most Popular First Names
  const topNamesStats = useMemo(() => {
    const map: Record<string, number> = {};
    persons.forEach(p => {
      const firstName = p.name.split(' ')[0].trim();
      if (firstName && firstName.length > 2 && !['Familia', 'Don', 'Doña'].includes(firstName)) {
        map[firstName] = (map[firstName] || 0) + 1;
      }
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .filter(item => item.count >= 2)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [persons]);

  // Visitors who accessed the app
  const uniqueVisitorsCount = visitors.length;

  return (
    <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 pb-12">
        
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold shadow-md">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="m-0 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Métricas de la Dinastía
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 flex items-center gap-1">
                  <Activity size={11} className="animate-pulse" /> En Vivo
                </span>
              </div>
              <p className="m-0 text-xs sm:text-sm text-slate-500 mt-0.5">
                Radiografía histórica, demografía y estadísticas en tiempo real de toda la familia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenVisitors && (
              <button
                onClick={onOpenVisitors}
                className="py-2 px-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300 font-bold text-xs flex items-center gap-2 border border-orange-200 dark:border-orange-800 transition-all cursor-pointer shadow-2xs"
              >
                <Eye size={15} className="text-orange-600" />
                <span>¿Quiénes ya lo vieron? ({uniqueVisitorsCount})</span>
              </button>
            )}

            {onOpenGamification && (
              <button
                onClick={onOpenGamification}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Award size={15} />
                <span>Logros & Trivia</span>
              </button>
            )}
          </div>
        </div>

        {/* Top 4 Primary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Integrantes</span>
              <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center">
                <Users size={18} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{totalPersons}</div>
              <span className="text-[11px] font-semibold text-slate-500">en {branchStats.length} ramas documentadas</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matrimonios</span>
              <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                <Heart size={18} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{totalUnions}</div>
              <span className="text-[11px] font-semibold text-slate-500">uniones genealógicas</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recuerdos & Audios</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {totalMemories + totalAudios}
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {totalMemories} notas · {totalAudios} grabaciones
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Familiares Vistos</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <UserCheck size={18} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{uniqueVisitorsCount}</div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                ¡Ya han visitado el árbol!
              </span>
            </div>
          </div>
        </div>

        {/* Tree Health & Completion Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <span>Índice de Completitud del Legado</span>
              </h3>
              <p className="m-0 text-xs text-slate-500 mt-0.5">
                Porcentaje de integrantes con contenido histórico enriquecido (fotos, biografías y anécdotas).
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-orange-600">{overallHealthScore}%</span>
              <span className="text-xs font-bold text-slate-400">salud del archivo</span>
            </div>
          </div>

          {/* Progress Multi-Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Retratos & Fotografías</span>
                <span className="text-orange-600">{photoPercent}% ({personsWithPhoto}/{totalPersons})</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${photoPercent}%` }} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Biografías & Reseñas</span>
                <span className="text-amber-600">{bioPercent}% ({personsWithBio}/{totalPersons})</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${bioPercent}%` }} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Hechos & Anécdotas</span>
                <span className="text-emerald-600">{factsPercent}% ({personsWithFacts}/{totalPersons})</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${factsPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Generation Breakdown & Branches Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Generations Bar Chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers size={18} className="text-orange-600" />
                <span>Distribución por Generaciones</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">{generationStats.length} niveles</span>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              {generationStats.map(item => {
                const widthPercent = Math.max(8, Math.round((item.count / maxGenCount) * 100));
                return (
                  <div 
                    key={item.gen} 
                    onClick={() => onFilterGeneration && onFilterGeneration(item.gen)}
                    className="flex flex-col gap-1 cursor-pointer group"
                    title={`Ver generación ${item.gen}`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200 group-hover:text-orange-600 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-slate-500">{item.count} personas</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all group-hover:opacity-90"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ramas Familiares Más Numerosas */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users size={18} className="text-amber-500" />
                <span>Ramas Familiares Principales</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">{branchStats.length} familias</span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
              {branchStats.slice(0, 9).map(item => {
                const theme = BRANCH_COLORS[item.branch] || DEFAULT_BRANCH_COLOR;
                return (
                  <div
                    key={item.branch}
                    onClick={() => onFilterBranch && onFilterBranch(item.branch)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-all cursor-pointer group"
                    title={`Filtrar por rama ${item.branch}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span 
                        className="w-3 h-3 rounded-full shrink-0" 
                        style={{ backgroundColor: theme.stroke, boxShadow: `0 0 8px ${theme.stroke}` }}
                      />
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600 transition-colors">
                        {item.branch}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-20 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${item.percent}%`, backgroundColor: theme.stroke }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-12 text-right">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Atlas of Origins & Top Names */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Atlas of Origins */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MapPin size={18} className="text-rose-500" />
                <span>Atlas de Orígenes & Migración</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">{birthplaceStats.length} ciudades</span>
            </div>

            <p className="m-0 text-xs text-slate-500 -mt-1">
              Lugares documentados donde nacieron los integrantes de nuestra familia.
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {birthplaceStats.map(item => (
                <div
                  key={item.place}
                  className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs"
                >
                  <MapPin size={13} className="text-rose-500 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.place}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-[10px] text-slate-600 dark:text-slate-300">
                    {item.count} {item.count === 1 ? 'familiar' : 'familiares'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Frequent Names */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award size={18} className="text-amber-500" />
                <span>Nombres Históricos Más Frecuentes</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">Herencia</span>
            </div>

            <p className="m-0 text-xs text-slate-500 -mt-1">
              Nombres que se repiten con cariño a lo largo de las generaciones.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
              {topNamesStats.map((item, idx) => (
                <div
                  key={item.name}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-1 shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">#{idx + 1}</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-full">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.count} familiares
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
