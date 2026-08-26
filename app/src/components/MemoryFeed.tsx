import React, { useState, useRef, useEffect } from 'react';
import type { MemoryPost, FactType } from '../types/family';
import { Heart, Send, Sparkles, Lock, Globe, CheckCircle2, CornerDownRight, Trash2 } from 'lucide-react';
import { useFamilyUser } from '../context/FamilyUserContext';
import { deleteMemoryFromCloud } from '../services/familyService';

interface MemoryFeedProps {
  memories: MemoryPost[];
  onAddMemory: (post: MemoryPost) => void;
  onDeleteMemory?: (id: string) => void;
  initialPrompt?: string;
  initialPersonName?: string;
}

export const MemoryFeed: React.FC<MemoryFeedProps> = ({ 
  memories, 
  onAddMemory,
  onDeleteMemory,
  initialPrompt = '',
  initialPersonName = ''
}) => {
  const { authorName: globalAuthorName, setAuthorInfo, isAdmin } = useFamilyUser();
  const [content, setContent] = useState(initialPrompt);
  const [authorName, setAuthorName] = useState(globalAuthorName);
  const [personName, setPersonName] = useState(initialPersonName);
  const [type, setType] = useState<FactType>('FACT');
  const [privacy, setPrivacy] = useState<'PUBLIC' | 'BRANCH' | 'DIRECT'>('PUBLIC');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (globalAuthorName && !authorName) {
      setAuthorName(globalAuthorName);
    }
  }, [globalAuthorName]);
  
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    setAuthorInfo(authorName.trim());

    const newPost: MemoryPost = {
      id: `mem-${Date.now()}`,
      personId: 'custom',
      personName: personName.trim() || 'Familiar',
      authorName: authorName.trim(),
      content: content.trim(),
      type,
      privacy,
      createdAt: 'Ahora mismo',
      likes: 1
    };

    onAddMemory(newPost);
    setContent('');
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('¿Deseas eliminar este recuerdo de la base de datos familiar?')) {
      if (onDeleteMemory) {
        onDeleteMemory(postId);
      }
      await deleteMemoryFromCloud(postId);
    }
  };

  const handleReplyToPost = (post: MemoryPost) => {
    setPersonName(post.personName);
    setContent(`En respuesta al recuerdo de ${post.authorName}: `);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 flex flex-col gap-6">
      {/* Create Memory Form */}
      <div ref={formRef} className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700/80 p-4 sm:p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="m-0 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Sparkles size={18} className="text-orange-600 shrink-0" />
            <span>Compartir un Recuerdo de Familia</span>
          </h3>
          <span className="hidden sm:inline text-[11px] text-slate-500 font-medium">Preserva la memoria</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Tu nombre (Ej. Matías Chababo, Tía Elena...)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 text-base sm:text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              required
            />
            <input
              type="text"
              placeholder="¿Sobre quién es el recuerdo? (Ej. Abuelo Moisés)"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 text-base sm:text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          <textarea
            placeholder="Escribe la anécdota, lección, detalle o memoria inolvidable..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 text-base sm:text-xs focus:bg-white dark:focus:bg-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-y min-h-[80px]"
            required
          />

          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <div className="flex gap-2 flex-wrap">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FactType)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 text-xs text-slate-700 dark:text-slate-200 font-medium outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="FACT">✔ Hecho Comprobable</option>
                <option value="OPINION">💬 Opinión / Percepción</option>
                <option value="CONTEXT">📜 Anécdota de Época</option>
              </select>

              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 text-xs text-slate-700 dark:text-slate-200 font-medium outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="PUBLIC">🌍 Toda la familia</option>
                <option value="BRANCH">🔒 Solo mi rama</option>
                <option value="DIRECT">✉️ Directo / DM</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <Send size={13} />
              <span>Publicar Recuerdo</span>
            </button>
          </div>
        </form>

        {/* Success Confirmation Toast */}
        {showSuccessToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>¡Tu recuerdo ha sido publicado exitosamente y guardado en el cofre familiar!</span>
          </div>
        )}
      </div>

      {/* Memory Stream Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="m-0 text-sm font-bold text-slate-700 dark:text-slate-200">Feed de Memorias Vivas</h4>
          <span className="text-xs text-slate-500 font-medium">{memories.length} historias</span>
        </div>

        {memories.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700/80 flex flex-col items-center gap-3 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-xs">
              <Sparkles size={26} />
            </div>
            <h4 className="m-0 text-base font-bold text-slate-800 dark:text-slate-100">
              El cofre familiar está listo para nuevas memorias
            </h4>
            <p className="m-0 text-xs text-slate-500 max-w-sm leading-relaxed">
              Sé el primero en compartir una anécdota, lección o recuerdo familiar en el formulario de arriba para que quede guardado para las próximas generaciones.
            </p>
          </div>
        ) : (
          memories.map((mem) => {
            const isLiked = !!likedPosts[mem.id];
            const totalLikes = (mem.likes || 0) + (isLiked ? 1 : 0);
            const isAuthorAdmin = mem.authorName.toLowerCase().includes('matías') || mem.authorName.toLowerCase().includes('matias');
            const canDelete = isAdmin || (globalAuthorName && globalAuthorName.trim().toLowerCase() === mem.authorName.trim().toLowerCase());

            return (
              <div 
                key={mem.id} 
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold text-sm border border-orange-200 dark:border-orange-800/60 shadow-2xs">
                      {mem.authorName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="m-0 text-sm font-bold text-slate-900 dark:text-slate-100">
                          {mem.authorName}
                        </h4>
                        {isAuthorAdmin && (
                          <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-1.5 py-0.2 rounded-md shadow-2xs flex items-center gap-0.5">
                            👑 Admin
                          </span>
                        )}
                        <span className="text-slate-500 font-normal text-xs">compartió sobre</span> 
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{mem.personName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        {mem.createdAt} · {mem.privacy === 'PUBLIC' ? <span className="flex items-center gap-0.5"><Globe size={11} /> Toda la familia</span> : <span className="flex items-center gap-0.5"><Lock size={11} /> Rama</span>}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      mem.type === 'FACT' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                        : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    {mem.type === 'FACT' ? '✔ Hecho Comprobable' : '💬 Percepción'}
                  </span>
                </div>

                <p className="m-0 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 pl-1 border-l-2 border-orange-500/30">
                  "{mem.content}"
                </p>

                {mem.tags && mem.tags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {mem.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-orange-700 dark:text-orange-400 font-semibold bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-md border border-orange-200/50 dark:border-orange-800/40">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-slate-100 dark:border-slate-700/60 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => toggleLike(mem.id)}
                      className={`bg-transparent border-none p-0 cursor-pointer flex items-center gap-1.5 font-semibold transition-colors ${
                        isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
                      }`}
                    >
                      <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'scale-110 transition-transform' : ''} />
                      <span>Me conmovió ({totalLikes})</span>
                    </button>

                    <button 
                      onClick={() => handleReplyToPost(mem)}
                      className="bg-transparent border-none p-0 cursor-pointer flex items-center gap-1.5 text-slate-500 hover:text-orange-600 font-semibold transition-colors"
                    >
                      <CornerDownRight size={14} />
                      <span>Aportar mi versión</span>
                    </button>
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => handleDeletePost(mem.id)}
                      className="text-slate-400 hover:text-rose-600 flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer"
                      title="Eliminar este recuerdo de la base de datos"
                    >
                      <Trash2 size={13} />
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

