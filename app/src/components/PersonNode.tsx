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
  const visitorInfo = (data as any).visitorInfo;
  const hasVisited = !!visitorInfo || data.hasVisited;
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
        borderColor: isDimmed ? 'rgba(203, 213, 225, 0.4)' : (data as any).isFocal ? '#f97316' : hasVisited ? '#10b981' : branchTheme.border,
        boxShadow: isDimmed 
          ? 'none' 
          : (data as any).isFocal
            ? '0 12px 30px -4px rgba(249, 115, 22, 0.25)' 
            : hasVisited
              ? '0 6px 22px -2px rgba(16, 185, 129, 0.15), 0 2px 6px -1px rgba(15, 23, 42, 0.03)'
              : '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
      }}
    >
      {/* Top Subtle Branch Color Accent Bar */}
      <div 
        className="absolute top-0 left-4 right-4 h-1 rounded-full opacity-80"
        style={{ backgroundColor: hasVisited ? '#10b981' : branchTheme.stroke }}
      />

      <div className="flex items-center gap-3">
        {/* Avatar with branch-colored halo (or green halo if visited) */}
        <div
          className="relative rounded-full flex items-center justify-center shrink-0 border overflow-hidden shadow-sm transition-transform group-hover:scale-105"
          style={{
            width: isCompact ? '40px' : '48px',
            height: isCompact ? '40px' : '48px',
            backgroundColor: branchTheme.bg,
            borderColor: hasVisited ? '#10b981' : branchTheme.stroke,
            boxShadow: hasVisited ? '0 0 14px rgba(16, 185, 129, 0.4)' : `0 0 12px ${branchTheme.glow}`,
          }}
        >
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <User size={isCompact ? 18 : 22} color={hasVisited ? '#10b981' : branchTheme.stroke} />
          )}
          {hasVisited && (
            <span 
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300 flex items-center justify-center"
              title="¡Ya exploró el árbol!"
            />
          )}
        </div>

        {/* Text Content */}
        <div className="overflow-hidden flex-1">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: branchTheme.stroke }}
              />
              <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider truncate">
                {data.branch || 'Familia'}
              </span>
            </div>

            {/* Visitor Badge */}
            {hasVisited && (
              <span 
                className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1 shrink-0 shadow-2xs"
                title={`¡${data.name} ya exploró el árbol! ${visitorInfo?.lastSeen ? `(Última vez: ${visitorInfo.lastSeen})` : ''}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>¡Ya lo vio!</span>
              </span>
            )}
          </div>

          <h3 className="m-0 text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-50 whitespace-nowrap overflow-hidden text-ellipsis leading-snug">
            {data.name}
          </h3>

          <p className="m-0 text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5">
            {data.birthYear || '?'} {data.deathYear ? `— ${data.deathYear}` : '· Presente'}
          </p>
        </div>
      </div>

      {/* Expanded Details (Hidden in compact view mode) */}
      {!isCompact && (
        <>
          {data.tags && data.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-2.5">
              {data.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-0.5 rounded-full font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-2xs truncate max-w-[120px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Multimedia & Micro-Stats */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2.5 mt-2.5 text-xs font-bold">
            <div className="flex gap-2 items-center">
              {data.audioRecordings && data.audioRecordings.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-amber-900 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-300">
                  <Mic size={12} /> {data.audioRecordings.length}
                </span>
              )}
              {data.facts && data.facts.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-emerald-900 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-300">
                  <MessageSquare size={12} /> {data.facts.length}
                </span>
              )}
              {(!data.audioRecordings?.length && !data.facts?.length) && (
                <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <Sparkles size={11} /> + Sumar recuerdo
                </span>
              )}
            </div>

            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
              Ver historia ➔
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

