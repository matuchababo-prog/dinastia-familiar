import React, { useState } from 'react';
import type { MemoryPost, FactType } from '../types/family';
import { MessageSquare, Heart, Send, Sparkles, Lock, Globe } from 'lucide-react';

interface MemoryFeedProps {
  memories: MemoryPost[];
  onAddMemory: (post: MemoryPost) => void;
}

export const MemoryFeed: React.FC<MemoryFeedProps> = ({ memories, onAddMemory }) => {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [personName, setPersonName] = useState('');
  const [type, setType] = useState<FactType>('FACT');
  const [privacy, setPrivacy] = useState<'PUBLIC' | 'BRANCH' | 'DIRECT'>('PUBLIC');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

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
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Create Memory Form */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} /> Compartir un Recuerdo de Familia
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder="Tu nombre (Ej. Tía Elena)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', background: 'var(--glass-bg)', fontSize: '13px', outline: 'none' }}
              required
            />
            <input
              type="text"
              placeholder="¿Sobre quién es el recuerdo? (Ej. Abuelo Moisés)"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', background: 'var(--glass-bg)', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <textarea
            placeholder="Escribe la anécdota, lección o recuerdo..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--color-border)', background: 'var(--glass-bg)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            required
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FactType)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px', background: 'var(--glass-bg)' }}
              >
                <option value="FACT">✔ Hecho Comprobable</option>
                <option value="OPINION">💬 Opinión / Percepción</option>
                <option value="ANECDOTA">📜 Anécdota de Época</option>
              </select>

              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as any)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px', background: 'var(--glass-bg)' }}
              >
                <option value="PUBLIC">🌍 Toda la familia</option>
                <option value="BRANCH">🔒 Solo mi rama</option>
                <option value="DIRECT">✉️ Directo / DM</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={14} /> Publicar Recuerdo
            </button>
          </div>
        </form>
      </div>

      {/* Memory Stream Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, opacity: 0.8 }}>Feed Reciente de Memorias Vivas</h4>
        {memories.map((mem) => (
          <div key={mem.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  {mem.authorName.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700 }}>
                    {mem.authorName} <span style={{ opacity: 0.7, fontWeight: 400 }}>compartió un recuerdo de</span> {mem.personName}
                  </h4>
                  <span style={{ fontSize: '11px', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {mem.createdAt} · {mem.privacy === 'PUBLIC' ? <Globe size={11} /> : <Lock size={11} />}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  backgroundColor: mem.type === 'FACT' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(37, 99, 235, 0.15)',
                  color: mem.type === 'FACT' ? '#059669' : '#2563eb'
                }}
              >
                {mem.type === 'FACT' ? '✔ Hecho' : '💬 Opinión'}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>"{mem.content}"</p>

            {mem.tags && mem.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '6px' }}>
                {mem.tags.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '10px', color: 'var(--color-primary)', opacity: 0.8, fontWeight: 600 }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', gap: '16px', fontSize: '12px', opacity: 0.8 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit' }}>
                <Heart size={14} color="#e11d48" /> Me conmovió ({mem.likes})
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit' }}>
                <MessageSquare size={14} /> Responder con mi versión
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
