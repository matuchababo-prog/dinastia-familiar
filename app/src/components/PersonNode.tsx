import React from 'react';
import { Handle, Position, useStore } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { User, Mic, MessageSquare, Sparkles } from 'lucide-react';
import type { Person } from '../types/family';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

export type PersonNodeType = Node<Person, 'person'>;

const zoomSelector = (s: any) => s.transform[2];

export const PersonNode: React.FC<NodeProps<PersonNodeType>> = ({ data, isConnectable }) => {
  const branchTheme = (data.branch && BRANCH_COLORS[data.branch]) || DEFAULT_BRANCH_COLOR;
  const isDimmed = (data as any).isDimmed;
  const viewDensity = (data as any).viewDensity || 'detailed';
  const zoom = useStore(zoomSelector);
  
  // Show detailed cards only when zoom is reasonable and view mode is 'detailed'
  const isCompact = viewDensity === 'compact' || zoom < 0.42;

  return (
    <div 
      className={`group relative bg-white/95 backdrop-blur-md rounded-2xl border transition-all duration-200 cursor-pointer select-none
        ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'} 
        ${(data as any).isFocal ? 'ring-4 ring-orange-400 ring-offset-2 shadow-2xl scale-105' : 'hover:shadow-xl hover:-translate-y-1 active:scale-98'}
        ${isCompact ? 'min-w-[210px] max-w-[230px] p-3' : 'min-w-[245px] max-w-[260px] p-4'}
      `}
      style={{
        borderColor: isDimmed ? 'rgba(203, 213, 225, 0.4)' : (data as any).isFocal ? '#f97316' : branchTheme.border,
        boxShadow: isDimmed 
          ? 'none' 
          : (data as any).isFocal
            ? '0 12px 30px -4px rgba(249, 115, 22, 0.25)' 
            : '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
      }}
    >
      {/* Top Subtle Branch Color Accent Bar */}
      <div 
        className="absolute top-0 left-4 right-4 h-1 rounded-full opacity-80"
        style={{ backgroundColor: branchTheme.stroke }}
      />

      <div className="flex items-center gap-3">
        {/* Avatar with branch-colored halo */}
        <div
          className="relative rounded-full flex items-center justify-center shrink-0 border overflow-hidden shadow-sm transition-transform group-hover:scale-105"
          style={{
            width: isCompact ? '40px' : '48px',
            height: isCompact ? '40px' : '48px',
            backgroundColor: branchTheme.bg,
            borderColor: branchTheme.stroke,
            boxShadow: `0 0 12px ${branchTheme.glow}`,
          }}
        >
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <User size={isCompact ? 18 : 22} color={branchTheme.stroke} />
          )}
        </div>

        {/* Text Content */}
        <div className="overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: branchTheme.stroke }}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              {data.branch || 'Familia'}
            </span>
          </div>

          <h3 className="m-0 text-sm font-bold text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis leading-snug">
            {data.name}
          </h3>

          <p className="m-0 text-xs font-semibold text-slate-500 mt-0.5">
            {data.birthYear || '?'} {data.deathYear ? `— ${data.deathYear}` : '· Presente'}
          </p>
        </div>
      </div>

      {/* Expanded Details (Hidden in compact view mode) */}
      {!isCompact && (
        <>
          {data.tags && data.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-2.5">
              {data.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium text-slate-600 bg-slate-100/90 border border-slate-200/60 shadow-2xs truncate max-w-[110px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Multimedia & Micro-Stats */}
          <div className="flex items-center justify-between border-t border-slate-100/90 pt-2.5 mt-2 text-[11px]">
            <div className="flex gap-2.5 items-center">
              {data.audioRecordings && data.audioRecordings.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/50">
                  <Mic size={11} /> {data.audioRecordings.length}
                </span>
              )}
              {data.facts && data.facts.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/50">
                  <MessageSquare size={11} /> {data.facts.length}
                </span>
              )}
              {(!data.audioRecordings?.length && !data.facts?.length) && (
                <span className="text-[10px] font-medium text-slate-400 italic">
                  Gen {data.generation}
                </span>
              )}
            </div>

            <span className="text-[11px] font-bold text-slate-400 group-hover:text-orange-600 transition-colors flex items-center gap-1">
              <Sparkles size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              Ver Ficha
            </span>
          </div>
        </>
      )}

      {/* Connection Handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top" 
        isConnectable={isConnectable} 
        style={{ 
          background: branchTheme.stroke, 
          width: '9px', 
          height: '9px', 
          border: '2px solid white', 
          top: '-5px',
          boxShadow: `0 0 6px ${branchTheme.glow}`
        }} 
      />
      
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right" 
        isConnectable={isConnectable} 
        style={{ 
          background: branchTheme.stroke, 
          width: '9px', 
          height: '9px', 
          border: '2px solid white', 
          right: '-5px',
          boxShadow: `0 0 6px ${branchTheme.glow}`
        }} 
      />
      
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left" 
        isConnectable={isConnectable} 
        style={{ 
          background: branchTheme.stroke, 
          width: '9px', 
          height: '9px', 
          border: '2px solid white', 
          left: '-5px',
          boxShadow: `0 0 6px ${branchTheme.glow}`
        }} 
      />
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom" 
        isConnectable={isConnectable} 
        style={{ 
          background: branchTheme.stroke, 
          width: '9px', 
          height: '9px', 
          border: '2px solid white', 
          bottom: '-5px',
          boxShadow: `0 0 6px ${branchTheme.glow}`
        }} 
      />
    </div>
  );
};

