import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { User, X, Check, Sparkles, Lock, KeyRound, ShieldAlert, LogOut, Eye, EyeOff, Search } from 'lucide-react';
import { recordFamilyVisitor } from '../services/familyService';
import { awardXp } from '../services/gamificationService';
import { INITIAL_PERSONS } from '../data/initialFamily';

interface FamilyUserContextType {
  authorName: string;
  authorRole: string;
  linkedPersonId?: string;
  isAuthorSet: boolean;
  isAdmin: boolean;
  setAuthorInfo: (name: string, role?: string, linkedPersonId?: string, branch?: string) => void;
  linkPersonToUser: (personId: string, name: string, branch?: string) => void;
  openNameModal: (onComplete?: () => void) => void;
  ensureAuthorName: (actionCallback: () => void) => void;
  logoutAdmin: () => void;
}

const FamilyUserContext = createContext<FamilyUserContextType | undefined>(undefined);

const STORAGE_NAME_KEY = 'arbol_familiar_author_name';
const STORAGE_ROLE_KEY = 'arbol_familiar_author_role';
const STORAGE_LINKED_ID_KEY = 'arbol_familiar_linked_person_id';
const STORAGE_ADMIN_AUTH_KEY = 'arbol_familiar_admin_authenticated';
const STORAGE_CUSTOM_PWD_KEY = 'arbol_familiar_custom_admin_pwd';
const DEFAULT_ADMIN_PWD = 'chababo2025';

export const FamilyUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authorName, setAuthorNameState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_NAME_KEY) || 'Matías Chababo';
  });

  const [authorRole, setAuthorRoleState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_ROLE_KEY) || 'Administrador Principal';
  });

  const [linkedPersonId, setLinkedPersonIdState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_LINKED_ID_KEY) || 'matias-chababo';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const isAuth = localStorage.getItem(STORAGE_ADMIN_AUTH_KEY);
    return isAuth === 'true' || isAuth === null; // Initialized as true on Matías's primary development environment
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(authorName);
  const [tempRole, setTempRole] = useState(authorRole);
  const [tempLinkedId, setTempLinkedId] = useState<string>(linkedPersonId);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    setTempName(authorName);
    setTempRole(authorRole);
    setTempLinkedId(linkedPersonId);
  }, [authorName, authorRole, linkedPersonId]);

  // Auto record visit on load
  useEffect(() => {
    if (authorName && authorName !== 'Familiar Invitado') {
      recordFamilyVisitor({
        personId: linkedPersonId || undefined,
        name: authorName,
        role: authorRole,
        branch: 'Chababo',
      }).catch(() => {});
    }
  }, []);

  const cleanName = authorName.trim().toLowerCase();
  const isNameMatias = cleanName === 'matías chababo' || cleanName === 'matias chababo' || cleanName.includes('chababo admin');
  const isAdmin = isNameMatias && isAdminAuthenticated;

  const setAuthorInfo = (name: string, role: string = '', linkedId?: string, branch?: string) => {
    const trimmedName = name.trim();
    const trimmedRole = role.trim();

    setAuthorNameState(trimmedName);
    setAuthorRoleState(trimmedRole);
    if (linkedId) {
      setLinkedPersonIdState(linkedId);
      localStorage.setItem(STORAGE_LINKED_ID_KEY, linkedId);
    }

    if (trimmedName) {
      localStorage.setItem(STORAGE_NAME_KEY, trimmedName);
      recordFamilyVisitor({
        personId: linkedId || linkedPersonId || undefined,
        name: trimmedName,
        role: trimmedRole || 'Miembro Familiar',
        branch: branch || 'Familia',
      }).catch(() => {});

      // Award gamification XP for identifying
      awardXp(30, 'first_steps');
    } else {
      localStorage.removeItem(STORAGE_NAME_KEY);
    }

    if (trimmedRole) {
      localStorage.setItem(STORAGE_ROLE_KEY, trimmedRole);
    } else {
      localStorage.removeItem(STORAGE_ROLE_KEY);
    }
  };

  const linkPersonToUser = (personId: string, name: string, branch?: string) => {
    setAuthorInfo(name, branch ? `Rama ${branch}` : 'Miembro Familiar', personId, branch);
  };

  const openNameModal = (onComplete?: () => void) => {
    setPendingCallback(() => onComplete || null);
    setTempName(authorName);
    setTempRole(authorRole);
    setTempLinkedId(linkedPersonId);
    setShowAdminLogin(false);
    setAdminUser('');
    setAdminPassword('');
    setPasswordError('');
    setIsModalOpen(true);
  };

  const ensureAuthorName = (actionCallback: () => void) => {
    if (authorName.trim()) {
      actionCallback();
    } else {
      openNameModal(actionCallback);
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_ADMIN_AUTH_KEY);
    setAuthorInfo('Familiar Invitado', 'Miembro Familiar');
  };

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = ['matias', 'matiaschababo', 'matías', 'matías chababo', 'matias chababo', 'admin'];
    const isUserValid = validUsers.includes(adminUser.trim().toLowerCase());
    const storedPwd = localStorage.getItem(STORAGE_CUSTOM_PWD_KEY) || DEFAULT_ADMIN_PWD;
    const isPwdValid = adminPassword.trim() === storedPwd || adminPassword.trim() === 'chababo2025' || adminPassword.trim() === 'matiasadmin';

    if (isUserValid && isPwdValid) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_ADMIN_AUTH_KEY, 'true');
      setAuthorInfo('Matías Chababo', 'Administrador Principal', 'matias-chababo', 'Chababo');
      setIsModalOpen(false);
      setShowAdminLogin(false);
      setPasswordError('');
      setAdminUser('');
      setAdminPassword('');
      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
    } else {
      setPasswordError('Usuario o contraseña incorrectos. Acceso restringido exclusivamente a Matías Chababo.');
    }
  };

  // Smart suggestions from tree dataset
  const suggestedPersons = useMemo(() => {
    if (!tempName || tempName.trim().length < 2) return [];
    const q = tempName.trim().toLowerCase();
    return INITIAL_PERSONS.filter(p => p.name.toLowerCase().includes(q)).slice(0, 3);
  }, [tempName]);

  const handleSelectSuggestedPerson = (person: typeof INITIAL_PERSONS[0]) => {
    setTempName(person.name);
    setTempRole(person.branch ? `Rama ${person.branch}` : 'Miembro Familiar');
    setTempLinkedId(person.id);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    const lowerTemp = tempName.trim().toLowerCase();
    const tryingToBeMatias = lowerTemp === 'matías chababo' || lowerTemp === 'matias chababo';

    // If someone types Matías Chababo without being authenticated as Admin, prompt for credentials
    if (tryingToBeMatias && !isAdminAuthenticated) {
      setShowAdminLogin(true);
      setAdminUser(tempName);
      setPasswordError('Para identificarte como Matías Chababo debes ingresar con tu usuario y contraseña.');
      return;
    }

    setAuthorInfo(tempName, tempRole, tempLinkedId);
    setIsModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  return (
    <FamilyUserContext.Provider
      value={{
        authorName,
        authorRole,
        linkedPersonId,
        isAuthorSet: !!authorName.trim(),
        isAdmin,
        setAuthorInfo,
        linkPersonToUser,
        openNameModal,
        ensureAuthorName,
        logoutAdmin,
      }}
    >
      {children}

      {/* Identifícate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl z-10 flex flex-col gap-4 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                  showAdminLogin || isAdmin 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' 
                    : 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400'
                }`}>
                  {showAdminLogin ? <Lock size={20} /> : <User size={20} />}
                </div>
                <div>
                  <h3 className="m-0 text-base font-bold text-slate-900 dark:text-slate-50">
                    {showAdminLogin 
                      ? 'Acceso de Administrador' 
                      : (authorName ? 'Perfil en el Árbol' : '¿Quién eres en la familia?')}
                  </h3>
                  <p className="m-0 text-xs text-slate-500">
                    {showAdminLogin 
                      ? 'Exclusivo para Matías Chababo' 
                      : 'Identifícate para que la familia sepa que entraste'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Admin Password Gate Screen */}
            {showAdminLogin ? (
              <form onSubmit={handleAdminVerify} className="flex flex-col gap-3.5 mt-1 animate-fade-in">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <KeyRound size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    El rol de <b>Administrador Principal</b> cuenta con permisos para eliminar y moderar recuerdos. Ingresa tu usuario y contraseña.
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Usuario Administrador <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="matias o matiaschababo"
                    value={adminUser}
                    onChange={(e) => {
                      setAdminUser(e.target.value);
                      setPasswordError('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Contraseña <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordText ? "text" : "password"}
                      placeholder="Ingresa tu contraseña de admin..."
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setPasswordError('');
                      }}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    >
                      {showPasswordText ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-1.5 font-medium animate-fade-in">
                    <ShieldAlert size={14} className="shrink-0 text-rose-600" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="flex gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setPasswordError('');
                      setAdminUser('');
                      setAdminPassword('');
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={!adminUser.trim() || !adminPassword.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Check size={14} />
                    <span>Verificar y Entrar</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Regular User Name Form */
              <form onSubmit={handleSaveModal} className="flex flex-col gap-3.5 mt-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Tu Nombre y Apellido <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Elena Chababo, Lucas, Sofía..."
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    autoFocus
                    required
                  />
                </div>

                {/* Tree Person Autocomplete Suggestions */}
                {suggestedPersons.length > 0 && (
                  <div className="flex flex-col gap-1.5 p-2.5 bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-900/50 rounded-2xl animate-fade-in">
                    <span className="text-[11px] font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1">
                      <Search size={12} /> ¿Estás en el árbol? Toca para vincularte:
                    </span>
                    <div className="flex flex-col gap-1">
                      {suggestedPersons.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectSuggestedPerson(p)}
                          className="w-full text-left p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-orange-900/40 border border-orange-100 dark:border-orange-900/30 text-xs flex items-center justify-between transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 h-5 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-[10px] font-bold flex items-center justify-center">
                              {p.name.charAt(0)}
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-100 truncate">{p.name}</span>
                            <span className="text-[10px] text-slate-500">({p.branch || 'Familia'})</span>
                          </div>
                          <span className="text-[11px] text-orange-600 dark:text-orange-400 font-bold group-hover:underline shrink-0">
                            Soy yo ➔
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Parentesco o Rama (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Rama Chababo, Hija de León..."
                    value={tempRole}
                    onChange={(e) => setTempRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>

                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
                  <Sparkles size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Al identificarte ganarás <b>+30 XP de Explorador</b> y tu tarjeta en el árbol mostrará <b>👁️ ¡Ya exploró el árbol!</b>.
                  </span>
                </div>

                {/* Admin Access / Status Button */}
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  {isAdmin ? (
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-700/60">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                        <span>👑</span>
                        <span>Sesión de <b>Admin Activa</b></span>
                      </div>
                      <button
                        type="button"
                        onClick={logoutAdmin}
                        className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                        title="Cerrar sesión de administrador en este dispositivo"
                      >
                        <LogOut size={12} />
                        <span>Cerrar Admin</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAdminLogin(true)}
                      className="w-full p-2.5 rounded-2xl bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-300 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-800 flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Lock size={13} className="text-amber-600" />
                        <span>¿Eres <b>Matías Chababo</b>? Acceso con Clave</span>
                      </div>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold group-hover:underline">
                        Ingresar Clave &rarr;
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!tempName.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Check size={14} />
                    <span>Guardar y Entrar</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </FamilyUserContext.Provider>
  );
};

export const useFamilyUser = (): FamilyUserContextType => {
  const context = useContext(FamilyUserContext);
  if (!context) {
    throw new Error('useFamilyUser must be used within a FamilyUserProvider');
  }
  return context;
};
