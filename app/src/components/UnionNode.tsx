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
      className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-md border border-rose-200/90 shadow-md text-rose-500 hover:scale-110 active:scale-95 hover:border-rose-400 hover:shadow-rose-200/40 transition-all duration-200 relative group cursor-pointer ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}`}
      title={`Unión familiar (${data.marriageYear || 'Unión matrimonial'})`}
    >
      {/* Left: receives edge from Partner1 */}
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Right: sends edge to Partner2 */}
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Top: optional target */}
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      {/* Bottom: sends edges to children */}
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} style={{ background: 'transparent', border: 'none', width: '6px', height: '6px' }} />
      
      <Heart size={13} strokeWidth={2.5} fill="currentColor" className="text-rose-500 transition-transform group-hover:scale-110" />
    </div>
  );
};

