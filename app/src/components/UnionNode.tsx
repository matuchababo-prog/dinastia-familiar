import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { Heart } from 'lucide-react';
import type { FamilyUnion } from '../types/family';

export type UnionNodeType = Node<FamilyUnion, 'union'>;

export const UnionNode: React.FC<NodeProps<UnionNodeType>> = ({ data, isConnectable }) => {
  const isDimmed = (data as any).isDimmed;
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center bg-white border border-slate-300 shadow-sm text-rose-400 relative transition-all duration-300 ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}`}
      title={`Unión familiar (${data.marriageYear || 'Unión'})`}
    >
      {/* Left: receives edge from Partner1 */}
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Right: sends edge to Partner2 */}
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Top: optional target */}
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Bottom: sends edges to children */}
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      
      <Heart size={12} strokeWidth={2.5} fill="currentColor" />
    </div>
  );
};
