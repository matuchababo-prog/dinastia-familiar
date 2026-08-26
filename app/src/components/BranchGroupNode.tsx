import React from 'react';

export const BranchGroupNode: React.FC<{ data: { label: string; count: number; bg: string; border: string; tagBg: string } }> = ({ data }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        backgroundColor: data.bg || 'rgba(255, 255, 255, 0.03)',
        border: `2px dashed ${data.border || 'rgba(255, 255, 255, 0.2)'}`,
        pointerEvents: 'none',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          left: '24px',
          backgroundColor: data.tagBg || '#2563eb',
          color: 'white',
          padding: '4px 16px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto'
        }}
      >
        <span>📂 RAMA {data.label}</span>
        <span style={{ opacity: 0.85, fontSize: '11px', fontWeight: 600 }}>({data.count} {data.count === 1 ? 'integrante' : 'integrantes'})</span>
      </div>
    </div>
  );
};
