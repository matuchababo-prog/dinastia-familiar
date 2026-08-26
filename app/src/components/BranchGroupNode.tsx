import React from 'react';

export const BranchGroupNode: React.FC<{ data: { label: string; count: number; bg: string; border: string; tagBg: string } }> = ({ data }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '32px',
        backgroundColor: data.bg || 'rgba(255, 255, 255, 0.02)',
        border: `1.5px solid ${data.border || 'rgba(226, 232, 240, 0.6)'}`,
        boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.015), 0 10px 30px -10px rgba(0, 0, 0, 0.03)',
        pointerEvents: 'none',
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          left: '28px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          color: '#1e293b',
          padding: '4px 14px 4px 10px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.01em',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: data.tagBg || '#f59e0b',
            boxShadow: `0 0 8px ${data.tagBg || '#f59e0b'}`,
          }}
        />
        <span>Familia {data.label}</span>
        <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 500 }}>
          ({data.count} {data.count === 1 ? 'persona' : 'personas'})
        </span>
      </div>
    </div>
  );
};

