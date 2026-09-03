import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { User, Mic, MessageSquare, Sparkles } from 'lucide-react';
import type { Person } from '../types/family';
import { BRANCH_COLORS, DEFAULT_BRANCH_COLOR } from '../utils/layout';

export type PersonNodeType = Node<Person, 'person'>;

const PersonNodeComponent: React.FC<NodeProps<PersonNodeType>> = ({ data, isConnectable }) => {
  const branchTheme = (data.branch && BRANCH_COLORS[data.branch]) || DEFAULT_BRANCH_COLOR;
  const isDimmed = (data as any).isDimmed;
  const isLiving = (data as any).isLiving;
  const viewDensity = (data as any).viewDensity || 'detailed';
  const visitorInfo = (data as any).visitorInfo;
  const hasVisited = !!visitorInfo || data.hasVisited;
  
  const isCompact = viewDensity === 'compact';
  const livingRgb = branchTheme.rgb || '234, 88, 12';

  return (
    <div 
      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer select-none
        ${isLiving ? 'living-family-node' : ''}
        ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'} 
        ${(data as any).isFocal ? 'ring-4 ring-orange-400 ring-offset-2 shadow-2xl scale-105' : 'hover:shadow-lg active:scale-98'}
        ${isCompact ? 'min-w-[210px] max-w-[230px] p-3' : 'min-w-[245px] max-w-[260px] p-4'}
      `}
      style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        borderColor: isDimmed 
          ? 'rgba(203, 213, 225, 0.4)' 
          : (data as any).isFocal 
            ? '#f97316' 
            : isLiving
              ? `rgba(${livingRgb}, 0.85)`
              : hasVisited 
                ? '#10b981' 
                : branchTheme.border,
        boxShadow: isDimmed 
          ? 'none' 
          : (data as any).isFocal
            ? '0 10px 25px -3px rgba(249, 115, 22, 0.25)' 
            : isLiving
              ? `0 0 20px 3px rgba(${livingRgb}, 0.3), 0 8px 20px -2px rgba(15, 23, 42, 0.12)`
              : hasVisited
                ? '0 4px 16px -2px rgba(16, 185, 129, 0.15)'
                : '0 4px 16px -2px rgba(15, 23, 42, 0.08)',
        ['--living-rgb' as any]: livingRgb,
      }}
    >
      {/* Top Subtle Branch Color Accent Bar */}
      <div 
        className="absolute top-0 left-4 right-4 h-1 rounded-full opacity-90 transition-all duration-300"
        style={{ 
          backgroundColor: hasVisited ? '#10b981' : branchTheme.stroke,
          boxShadow: isLiving ? `0 0 8px ${branchTheme.stroke}` : undefined,
        }}
      />

      <div className="flex items-center gap-3">
        {/* Avatar with branch-colored halo (or green halo if visited) */}
        <div
          className="relative rounded-full flex items-center justify-center shrink-0 border overflow-hidden shadow-xs transition-transform duration-300"
          style={{
            width: isCompact ? '40px' : '48px',
            height: isCompact ? '40px' : '48px',
            backgroundColor: branchTheme.bg,
            borderColor: isLiving ? branchTheme.stroke : hasVisited ? '#10b981' : branchTheme.stroke,
            boxShadow: isLiving ? `0 0 10px 2px rgba(${livingRgb}, 0.35)` : undefined,
          }}
        >
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" loading="lazy" />
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
              <span 
                className="text-[11px] font-extrabold uppercase tracking-wider truncate"
                style={{ color: '#475569' }}
              >
                {data.branch || 'Familia'}
              </span>
            </div>

            {/* Visitor Badge */}
            {hasVisited && (
              <span 
                className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0 shadow-2xs"
                title={`¡${data.name} ya exploró el árbol! ${visitorInfo?.lastSeen ? `(Última vez: ${visitorInfo.lastSeen})` : ''}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>¡Ya lo vio!</span>
              </span>
            )}

            {/* Living Active Filter Badge */}
            {isLiving && !hasVisited && (
              <span 
                className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-orange-50 text-orange-800 border border-orange-200/80 flex items-center gap-1 shrink-0 shadow-2xs"
                title="Familia viva y activa en pantalla"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>Enfocada</span>
              </span>
            )}
          </div>

          <h3 
            className="m-0 text-sm sm:text-base font-black whitespace-nowrap overflow-hidden text-ellipsis leading-snug"
            style={{ color: '#0f172a' }}
          >
            {data.name}
          </h3>

          <p 
            className="m-0 text-xs font-bold mt-0.5"
            style={{ color: '#64748b' }}
          >
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
                  className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 border border-slate-300 shadow-2xs truncate max-w-[120px]"
                  style={{ color: '#334155' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Multimedia & Micro-Stats */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 mt-2.5 text-xs font-bold">
            <div className="flex gap-2 items-center">
              {data.audioRecordings && data.audioRecordings.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                  <Mic size={12} /> {data.audioRecordings.length}
                </span>
              )}
              {data.facts && data.facts.length > 0 && (
                <span className="flex items-center gap-1 font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  <MessageSquare size={12} /> {data.facts.length}
                </span>
              )}
              {(!data.audioRecordings?.length && !data.facts?.length) && (
                <span className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
                  <Sparkles size={11} /> + Sumar recuerdo
                </span>
              )}
            </div>

            <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
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
        }} 
      />
    </div>
  );
};

export const PersonNode = React.memo(PersonNodeComponent);
