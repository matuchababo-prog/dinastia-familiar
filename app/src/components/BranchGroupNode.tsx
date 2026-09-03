import React from 'react';

const BranchGroupNodeComponent: React.FC<{ data: { label: string; count: number; bg: string; border: string; tagBg: string; rgb?: string; isLiving?: boolean } }> = ({ data }) => {
  const livingRgb = data.rgb || '234, 88, 12';
  return (
    <div
      className={data.isLiving ? 'living-branch-group' : ''}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '32px',
        backgroundColor: data.bg || 'rgba(255, 255, 255, 0.02)',
        border: `1.5px solid ${data.border || 'rgba(226, 232, 240, 0.6)'}`,
        pointerEvents: 'none',
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        ['--living-rgb' as any]: livingRgb,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          left: '28px',
          backgroundColor: '#ffffff',
          border: `1.5px solid ${data.isLiving ? `rgba(${livingRgb}, 0.6)` : 'rgba(226, 232, 240, 0.9)'}`,
          color: '#1e293b',
          padding: '4px 14px 4px 10px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.01em',
          boxShadow: data.isLiving ? `0 0 14px rgba(${livingRgb}, 0.25)` : '0 2px 8px rgba(0, 0, 0, 0.06)',
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
            boxShadow: data.isLiving ? `0 0 6px ${data.tagBg || '#f59e0b'}` : undefined,
          }}
          className={data.isLiving ? 'animate-pulse' : ''}
        />
        <span>Familia {data.label}</span>
        <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 600 }}>
          ({data.count} {data.count === 1 ? 'persona' : 'personas'})
        </span>
        {data.isLiving && (
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping ml-0.5" />
        )}
      </div>
    </div>
  );
};

export const BranchGroupNode = React.memo(BranchGroupNodeComponent);
