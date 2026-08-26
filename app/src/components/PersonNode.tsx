import React from 'react';
import { Handle, Position, useStore } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { User, Mic, MessageSquare } from 'lucide-react';
import type { Person } from '../types/family';

export type PersonNodeType = Node<Person, 'person'>;

const GENERATION_COLORS: Record<number, { bg: string; border: string; tagBg: string; text: string }> = {
  0: { bg: '#fdf2f8', border: '#db2777', tagBg: '#be185d', text: '#9d174d' }, // Pink (ancestors)
  1: { bg: '#fff7ed', border: '#ea580c', tagBg: '#ea580c', text: '#9a3412' }, // Orange
  2: { bg: '#f0fdf4', border: '#16a34a', tagBg: '#16a34a', text: '#166534' }, // Green
  3: { bg: '#f8fafc', border: '#475569', tagBg: '#475569', text: '#334155' }, // Slate
  4: { bg: '#f0fdfa', border: '#0d9488', tagBg: '#0d9488', text: '#115e59' }, // Teal
};

const zoomSelector = (s: any) => s.transform[2];

export const PersonNode: React.FC<NodeProps<PersonNodeType>> = ({ data, isConnectable }) => {
  const genTheme = GENERATION_COLORS[data.generation] || GENERATION_COLORS[3];
  const isDimmed = (data as any).isDimmed;
  const zoom = useStore(zoomSelector);
  const showDetails = zoom >= 0.4;

  return (
    <div 
      className={`task-card p-4 min-w-[240px] max-w-[260px] flex flex-col gap-3 relative transition-all duration-300 ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'} ${(data as any).isFocal ? 'ring-4 ring-orange-400 ring-offset-2' : ''}`}
    >

      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border overflow-hidden shadow-sm"
          style={{
            backgroundColor: genTheme.bg,
            borderColor: genTheme.border,
          }}
        >
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <User size={20} color={genTheme.border} />
          )}
        </div>

        <div className="overflow-hidden flex-1">
          <h3 className="m-0 text-sm font-bold text-[color:var(--color-foreground)] whitespace-nowrap overflow-hidden text-ellipsis leading-tight mb-0.5">
            {data.name}
          </h3>
          <p className="m-0 text-xs font-medium text-[color:var(--color-foreground)] opacity-70">
            {data.birthYear || '?'} {data.deathYear ? `- ${data.deathYear}` : '· Presente'}
          </p>
        </div>
      </div>

      {showDetails && data.tags && data.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-1">
          {data.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white shadow-sm"
              style={{ backgroundColor: genTheme.tagBg }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Badges de Contenido Multimedia / Recuerdos */}
      {showDetails && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1 text-[11px]">
          <div className="flex gap-3 items-center">
            {data.audioRecordings && data.audioRecordings.length > 0 && (
              <span className="flex items-center gap-1 font-bold" style={{ color: genTheme.text }}>
                <Mic size={13} /> {data.audioRecordings.length}
              </span>
            )}
            {data.facts && data.facts.length > 0 && (
              <span className="flex items-center gap-1 font-bold" style={{ color: genTheme.text }}>
                <MessageSquare size={13} /> {data.facts.length}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer">Ver Detalles</span>
        </div>
      )}

      {/* Top: target for edges coming from parent union */}
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} 
        style={{ background: genTheme.border, width: '8px', height: '8px', border: '2px solid white', top: '-4px' }} />
      
      {/* Right: source (to union node) */}
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} 
        style={{ background: genTheme.border, width: '8px', height: '8px', border: '2px solid white', right: '-4px' }} />
      
      {/* Left: target (from union node) */}
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} 
        style={{ background: genTheme.border, width: '8px', height: '8px', border: '2px solid white', left: '-4px' }} />
      
      {/* Bottom: source for edges going to child union */}
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} 
        style={{ background: genTheme.border, width: '8px', height: '8px', border: '2px solid white', bottom: '-4px' }} />
    </div>
  );
};
