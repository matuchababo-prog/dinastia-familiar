import React from 'react';
import { Sparkles, LayoutGrid, MessageSquareText, Search, Settings, Users, Bell, X, Target } from 'lucide-react';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

interface AppLayoutProps {
  children: React.ReactNode;
  activeView: 'canvas' | 'feed';
  setActiveView: (view: 'canvas' | 'feed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  memoriesCount: number;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  availableBranches: string[];
  selectedGeneration: string;
  setSelectedGeneration: (gen: string) => void;
  availableGenerations: number[];
  focalPersonId: string | null;
  setFocalPersonId: (id: string | null) => void;
  focalPersonName?: string;
  hasActiveFilter?: boolean;
  onResetFilters?: () => void;
  viewDensity?: 'compact' | 'detailed';
  setViewDensity?: (density: 'compact' | 'detailed') => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  memoriesCount,
  selectedBranch,
  setSelectedBranch,
  availableBranches,
  selectedGeneration,
  setSelectedGeneration,
  availableGenerations,
  focalPersonId,
  setFocalPersonId,
  focalPersonName,
  hasActiveFilter,
  onResetFilters,
  viewDensity = 'detailed',
  setViewDensity,
}) => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="m-0 text-sm font-bold text-white tracking-tight">Raíces y Rumbos</h1>
            <p className="m-0 text-[10px] text-slate-400 font-medium">Legado Familiar</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Vistas</div>
          
          <button
            onClick={() => setActiveView('canvas')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'canvas'
                ? 'bg-orange-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <LayoutGrid size={16} />
            <span>Árbol Familiar</span>
          </button>

          <button
            onClick={() => setActiveView('feed')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'feed'
                ? 'bg-orange-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquareText size={16} />
              <span>Recuerdos & Feed</span>
            </div>
            {memoriesCount > 0 && (
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                activeView === 'feed' ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {memoriesCount}
              </span>
            )}
          </button>

          {/* Ramas Familiares con sus colores distintivos */}
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">
            Ramas Familiares
          </div>

          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => setSelectedBranch('all')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedBranch === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span>Todas las familias</span>
              </div>
            </button>

            {availableBranches.map(branch => {
              const theme = BRANCH_COLORS[branch] || DEFAULT_BRANCH_COLOR;
              const isSelected = selectedBranch === branch;
              return (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: theme.stroke, boxShadow: `0 0 6px ${theme.stroke}` }}
                    />
                    <span className="truncate">{branch}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-3 border-t border-slate-800 flex flex-col gap-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <Settings size={16} />
            <span>Configuración</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 shrink-0">
          
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Users size={16} className="text-slate-400" />
            <span className="text-slate-400">Familia</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">
              {activeView === 'canvas' ? 'Vista General' : 'Recuerdos Recientes'}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* View Density Switcher */}
            {activeView === 'canvas' && setViewDensity && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <button
                  onClick={() => setViewDensity('compact')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewDensity === 'compact'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  title="Vista Esencia (Tarjetas compactas, limpias y livianas)"
                >
                  <Sparkles size={12} className={viewDensity === 'compact' ? 'text-amber-500' : ''} />
                  <span>Esencia</span>
                </button>
                <button
                  onClick={() => setViewDensity('detailed')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewDensity === 'detailed'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  title="Vista Detallada (Tarjetas completas con tags y recuerdos)"
                >
                  <LayoutGrid size={12} className={viewDensity === 'detailed' ? 'text-orange-500' : ''} />
                  <span>Detallado</span>
                </button>
              </div>
            )}

            {/* Search and Filter */}
            {activeView === 'canvas' && (
              <div className="flex items-center gap-2">
                {focalPersonId ? (
                  <div className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-md text-sm font-medium">
                    <Target size={16} />
                    <span>Foco en: {focalPersonName || 'Persona'}</span>
                    <button 
                      onClick={() => setFocalPersonId(null)}
                      className="ml-2 hover:bg-orange-100 p-0.5 rounded-full transition-colors"
                      title="Quitar foco"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      value={selectedGeneration}
                      onChange={(e) => setSelectedGeneration(e.target.value)}
                      className="pl-3 pr-8 py-1.5 bg-slate-100 border-transparent rounded-md text-sm text-slate-700 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.7rem top 50%',
                        backgroundSize: '0.65rem auto'
                      }}
                    >
                      <option value="all">Todas las generaciones</option>
                      {availableGenerations.map(gen => (
                        <option key={gen} value={gen}>Generación {gen}</option>
                      ))}
                    </select>

                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="pl-3 pr-8 py-1.5 bg-slate-100 border-transparent rounded-md text-sm text-slate-700 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.7rem top 50%',
                        backgroundSize: '0.65rem auto'
                      }}
                    >
                      <option value="all">Todas las familias</option>
                      {availableBranches.map(branch => (
                        <option key={branch} value={branch}>
                          {branch.toLowerCase().startsWith('familia') ? branch : `Familia ${branch}`}
                        </option>
                      ))}
                    </select>

                    <div className="relative w-52">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar familiar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-1.5 bg-slate-100 border-transparent rounded-md text-sm focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                          title="Borrar búsqueda"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>

                    {hasActiveFilter && onResetFilters && (
                      <button
                        onClick={onResetFilters}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors shadow-sm"
                        title="Restablecer todos los filtros"
                      >
                        <X size={13} />
                        <span>Limpiar</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-orange-600 rounded-full border border-white"></span>
            </button>
            <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold border border-orange-200">
              MC
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-50">
          {children}
        </div>
      </main>
    </div>
  );
};
