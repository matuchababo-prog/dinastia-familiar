import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  LayoutGrid, 
  MessageSquareText, 
  Search, 
  Settings, 
  Bell, 
  X, 
  Target, 
  Menu, 
  History, 
  Check, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus search on mobile search open
  useEffect(() => {
    if (isMobileSearchOpen) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
    }
  }, [isMobileSearchOpen]);

  const activeFilterCount = (selectedBranch !== 'all' ? 1 : 0) + 
                            (selectedGeneration !== 'all' ? 1 : 0) + 
                            (searchQuery.trim() !== '' ? 1 : 0) + 
                            (focalPersonId ? 1 : 0);

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden text-slate-900 select-none">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Filter Sheet Backdrop & Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div 
            onClick={() => setIsMobileFilterOpen(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto -mt-2 mb-1" />
            
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-orange-600" />
                <span>Filtros y Visualización</span>
              </h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* Density Selector on Mobile */}
            {setViewDensity && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Densidad de Tarjetas</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setViewDensity('compact')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      viewDensity === 'compact' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <Sparkles size={14} className={viewDensity === 'compact' ? 'text-amber-500' : ''} />
                    <span>🫧 Esencia</span>
                  </button>
                  <button
                    onClick={() => setViewDensity('detailed')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      viewDensity === 'detailed' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <LayoutGrid size={14} className={viewDensity === 'detailed' ? 'text-orange-500' : ''} />
                    <span>📜 Detallado</span>
                  </button>
                </div>
              </div>
            )}

            {/* Generation Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Generación</span>
              <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-sm font-medium outline-none border border-slate-200 dark:border-slate-700"
              >
                <option value="all">Todas las generaciones</option>
                {availableGenerations.map(gen => (
                  <option key={gen} value={gen}>Generación {gen}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Familia / Rama</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-sm font-medium outline-none border border-slate-200 dark:border-slate-700"
              >
                <option value="all">Todas las familias</option>
                {availableBranches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch.toLowerCase().startsWith('familia') ? branch : `Familia ${branch}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset / Actions */}
            <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {hasActiveFilter && onResetFilters && (
                <button
                  onClick={() => {
                    onResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Limpiar Filtros</span>
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="m-0 text-sm font-bold text-white tracking-tight">Raíces y Rumbos</h1>
              <p className="m-0 text-[10px] text-slate-400 font-medium">Legado Familiar</p>
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-2"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Vistas</div>
          
          <button
            onClick={() => {
              setActiveView('canvas');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'canvas'
                ? 'bg-orange-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <LayoutGrid size={18} />
            <span>Árbol Familiar</span>
          </button>

          <button
            onClick={() => {
              setActiveView('feed');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'feed'
                ? 'bg-orange-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquareText size={18} />
              <span>Recuerdos & Feed</span>
            </div>
            {memoriesCount > 0 && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
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
              onClick={() => {
                setSelectedBranch('all');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedBranch === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span>Todas las familias</span>
              </div>
            </button>

            {availableBranches.map(branch => {
              const theme = BRANCH_COLORS[branch] || DEFAULT_BRANCH_COLOR;
              const isSelected = selectedBranch === branch;
              return (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
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
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <Settings size={16} />
            <span>Configuración</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-3 sm:px-4 shrink-0 relative z-30">
          
          {/* Mobile Search Overlay */}
          {isMobileSearchOpen && (
            <div className="absolute inset-0 bg-white z-40 flex items-center px-3 gap-2 animate-fade-in">
              <Search size={16} className="text-orange-600 shrink-0" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Buscar por nombre, familia, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 text-sm text-slate-900 outline-none border-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Left: Mobile Hamburger & Title */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium text-slate-600 min-w-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-1.5 truncate">
              <span className="text-slate-900 font-bold text-sm sm:text-base truncate">
                {activeView === 'canvas' ? 'Árbol Familiar' : 'Recuerdos'}
              </span>
              {focalPersonId && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                  <Target size={11} /> {focalPersonName}
                  <button 
                    onClick={() => setFocalPersonId(null)}
                    title="Quitar enfoque de persona"
                    className="hover:text-orange-950 ml-0.5 cursor-pointer"
                  >
                    <X size={10} />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Desktop Density & Filter Controls (>= lg) */}
            {activeView === 'canvas' && (
              <div className="hidden lg:flex items-center gap-2">
                {focalPersonId ? (
                  <div className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-md text-xs font-semibold shadow-2xs">
                    <Target size={14} />
                    <span>Foco en: {focalPersonName || 'Persona'}</span>
                    <button 
                      onClick={() => setFocalPersonId(null)}
                      className="ml-2 hover:bg-orange-100 p-0.5 rounded-full transition-colors cursor-pointer"
                      title="Quitar foco"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Density Switcher */}
                    {setViewDensity && (
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 shadow-2xs">
                        <button
                          onClick={() => setViewDensity('compact')}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
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
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
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

                    {/* Generation Select */}
                    <select
                      value={selectedGeneration}
                      onChange={(e) => setSelectedGeneration(e.target.value)}
                      className="pl-3 pr-8 py-1.5 bg-slate-100 border-transparent rounded-md text-xs text-slate-700 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none cursor-pointer"
                    >
                      <option value="all">Todas las generaciones</option>
                      {availableGenerations.map(gen => (
                        <option key={gen} value={gen}>Generación {gen}</option>
                      ))}
                    </select>

                    {/* Branch Select */}
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="pl-3 pr-8 py-1.5 bg-slate-100 border-transparent rounded-md text-xs text-slate-700 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none cursor-pointer max-w-[140px] truncate"
                    >
                      <option value="all">Todas las familias</option>
                      {availableBranches.map(branch => (
                        <option key={branch} value={branch}>
                          {branch.toLowerCase().startsWith('familia') ? branch : `Familia ${branch}`}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* Search Input */}
                <div className="relative w-48 xl:w-56">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar familiar... [/]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-12 py-1.5 bg-slate-100 border-transparent rounded-md text-xs focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {searchQuery ? (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          searchInputRef.current?.focus();
                        }}
                        className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                        title="Borrar búsqueda"
                      >
                        <X size={12} />
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-200/80 rounded border border-slate-300">
                        /
                      </kbd>
                    )}
                  </div>
                </div>

                {hasActiveFilter && onResetFilters && (
                  <button
                    onClick={onResetFilters}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors shadow-2xs cursor-pointer"
                    title="Restablecer todos los filtros"
                  >
                    <X size={12} />
                    <span>Limpiar</span>
                  </button>
                )}
              </div>
            )}

            {/* Mobile Controls (< lg): Search Button & Filter Drawer Trigger */}
            {activeView === 'canvas' && (
              <div className="flex lg:hidden items-center gap-1">
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
                  aria-label="Buscar familiar"
                >
                  <Search size={18} />
                  {searchQuery && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-600 rounded-full" />}
                </button>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className={`p-2 rounded-xl transition-colors relative flex items-center gap-1 text-xs font-bold cursor-pointer ${
                    activeFilterCount > 0 
                      ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  aria-label="Abrir filtros"
                >
                  <SlidersHorizontal size={18} />
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Notifications Button with Popover */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
                aria-label="Ver notificaciones de actividad"
                aria-expanded={showNotifications}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-600 rounded-full ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <>
                  <div 
                    onClick={() => setShowNotifications(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 p-4 flex flex-col gap-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                      <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <History size={14} className="text-orange-600" />
                        <span>Actividad Reciente</span>
                      </h4>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">En Vivo</span>
                    </div>

                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex gap-2.5 items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles size={12} />
                        </div>
                        <div className="flex-1">
                          <p className="m-0 font-semibold text-slate-800 dark:text-slate-200">Árbol Optimizado para Móvil</p>
                          <p className="m-0 text-[11px] text-slate-500 mt-0.5">Navegación táctil fluida, filtros móviles y diseño adaptable.</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex gap-2.5 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} />
                        </div>
                        <div className="flex-1">
                          <p className="m-0 font-semibold text-slate-800 dark:text-slate-200">Sincronización en la Nube</p>
                          <p className="m-0 text-[11px] text-slate-500 mt-0.5">Todos los datos respaldados en tiempo real.</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowNotifications(false)}
                      className="w-full py-1.5 text-center text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold border border-orange-200 shadow-2xs">
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
