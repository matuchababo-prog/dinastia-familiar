import type { Node, Edge } from '@xyflow/react';
import type { Person, FamilyUnion } from '../types/family';

// ─── Dimensions ─────────────────────────────────
const PERSON_NODE_WIDTH = 250;
const PERSON_NODE_HEIGHT = 140;
const UNION_NODE_SIZE = 24;

// ─── Spacing ────────────────────────────────────
const HORIZONTAL_GAP = 24;       // Between sibling subtrees
const COUPLE_GAP = 16;           // Between partner card and union node
const GENERATION_GAP = 120;      // Vertical space between generations
const TREE_GAP = 96;             // Gap between separate family trees
const MARGIN_Y = 60;

export interface BranchColorDef {
  bg: string;
  border: string;
  tagBg: string;
  stroke: string;
  glow: string;
  rgb: string;
}

// ─── Branch Colors ──────────────────────────────
export const BRANCH_COLORS: Record<string, BranchColorDef> = {
  Chababo: { bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.25)', tagBg: '#d97706', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)', rgb: '245, 158, 11' },
  Ballistreri: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Bolbol: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Levin: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)', rgb: '59, 130, 246' },
  Evlagon: { bg: 'rgba(139, 92, 246, 0.04)', border: 'rgba(139, 92, 246, 0.25)', tagBg: '#7c3aed', stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)', rgb: '139, 92, 246' },
  Isassa: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Romeo: { bg: 'rgba(249, 115, 22, 0.04)', border: 'rgba(249, 115, 22, 0.25)', tagBg: '#ea580c', stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.35)', rgb: '249, 115, 22' },
  Gindin: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0d9488', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)', rgb: '20, 184, 166' },
  Alek: { bg: 'rgba(99, 102, 241, 0.04)', border: 'rgba(99, 102, 241, 0.25)', tagBg: '#4f46e5', stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)', rgb: '99, 102, 241' },
  Gesrik: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#9333ea', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  Halek: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Guardiet: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Goytia: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Bonsignore: { bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.25)', tagBg: '#d97706', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)', rgb: '245, 158, 11' },
  Yebne: { bg: 'rgba(132, 204, 22, 0.04)', border: 'rgba(132, 204, 22, 0.25)', tagBg: '#65a30d', stroke: '#84cc16', glow: 'rgba(132, 204, 22, 0.35)', rgb: '132, 204, 22' },
  Vesi: { bg: 'rgba(6, 182, 212, 0.04)', border: 'rgba(6, 182, 212, 0.25)', tagBg: '#0891b2', stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.35)', rgb: '6, 182, 212' },
  Fernandez: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#9333ea', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  'Santa Cruz': { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Dinucchi: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Coccolo: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)', rgb: '59, 130, 246' },
  Cosolito: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Gagliardi: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Vondarenko: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  Bortoliero: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Remondino: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Sánchez: { bg: 'rgba(139, 92, 246, 0.04)', border: 'rgba(139, 92, 246, 0.25)', tagBg: '#7c3aed', stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)', rgb: '139, 92, 246' },
  Martino: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Sciutto: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)', rgb: '20, 184, 166' },
  Baez: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Romero: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Trantemberg: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Levi: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Susman: { bg: 'rgba(99, 102, 241, 0.04)', border: 'rgba(99, 102, 241, 0.25)', tagBg: '#4338ca', stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)', rgb: '99, 102, 241' },
  Sader: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Ades: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)', rgb: '20, 184, 166' },
  Dahan: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Jordan: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)', rgb: '59, 130, 246' },
  Gaywood: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Wilson: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Flores: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Molina: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  Bermudas: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Nejad: { bg: 'rgba(217, 119, 6, 0.04)', border: 'rgba(217, 119, 6, 0.25)', tagBg: '#b45309', stroke: '#d97706', glow: 'rgba(217, 119, 6, 0.35)', rgb: '217, 119, 6' },
  Sayed: { bg: 'rgba(132, 204, 22, 0.04)', border: 'rgba(132, 204, 22, 0.25)', tagBg: '#65a30d', stroke: '#84cc16', glow: 'rgba(132, 204, 22, 0.35)', rgb: '132, 204, 22' },
  Telesca: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Zucchini: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Sijel: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Robledo: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  Cantale: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  Cantador: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)', rgb: '168, 85, 247' },
  Belune: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)', rgb: '244, 63, 94' },
  Zocco: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)', rgb: '20, 184, 166' },
  Zacco: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)', rgb: '20, 184, 166' },
  Moll: { bg: 'rgba(99, 102, 241, 0.04)', border: 'rgba(99, 102, 241, 0.25)', tagBg: '#4338ca', stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)', rgb: '99, 102, 241' },
  Betbe: { bg: 'rgba(217, 119, 6, 0.04)', border: 'rgba(217, 119, 6, 0.25)', tagBg: '#b45309', stroke: '#d97706', glow: 'rgba(217, 119, 6, 0.35)', rgb: '217, 119, 6' },
  Betabe: { bg: 'rgba(217, 119, 6, 0.04)', border: 'rgba(217, 119, 6, 0.25)', tagBg: '#b45309', stroke: '#d97706', glow: 'rgba(217, 119, 6, 0.35)', rgb: '217, 119, 6' },
  Bitar: { bg: 'rgba(6, 182, 212, 0.04)', border: 'rgba(6, 182, 212, 0.25)', tagBg: '#0891b2', stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.35)', rgb: '6, 182, 212' },
  Bernal: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)', rgb: '236, 72, 153' },
  Jamónaca: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  'Iamónico': { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Iamonico: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)', rgb: '14, 165, 233' },
  Sauan: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)', rgb: '16, 185, 129' },
  'Mc Roullion': { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)', rgb: '234, 88, 12' },
  Preve: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)', rgb: '59, 130, 246' },
  'Familia Ernesto': { bg: 'rgba(107, 114, 128, 0.04)', border: 'rgba(107, 114, 128, 0.25)', tagBg: '#4b5563', stroke: '#64748b', glow: 'rgba(100, 116, 139, 0.35)', rgb: '100, 116, 139' },
  'Familia Leandro': { bg: 'rgba(107, 114, 128, 0.04)', border: 'rgba(107, 114, 128, 0.25)', tagBg: '#4b5563', stroke: '#64748b', glow: 'rgba(100, 116, 139, 0.35)', rgb: '100, 116, 139' },
};

export const DEFAULT_BRANCH_COLOR: BranchColorDef = {
  bg: 'rgba(241, 245, 249, 0.03)',
  border: 'rgba(148, 163, 184, 0.2)',
  tagBg: '#64748b',
  stroke: '#94a3b8',
  glow: 'rgba(148, 163, 184, 0.25)',
  rgb: '148, 163, 184',
};

// ─── Subtree Types ──────────────────────────────
interface SubtreeNode {
  unionId: string;
  partner1Id: string | null;
  partner2Id: string | null;
  childElements: ChildElement[];
  subtreeWidth: number;
}

type ChildElement =
  | { type: 'subtree'; node: SubtreeNode }
  | { type: 'solo'; personId: string };

// ─── Width Helpers ──────────────────────────────
function coupleOwnWidth(hasP1: boolean, hasP2: boolean): number {
  if (hasP1 && hasP2) return PERSON_NODE_WIDTH * 2 + COUPLE_GAP * 2 + UNION_NODE_SIZE;
  if (hasP1 || hasP2) return PERSON_NODE_WIDTH + COUPLE_GAP + UNION_NODE_SIZE;
  return UNION_NODE_SIZE;
}

function elementWidth(e: ChildElement): number {
  return e.type === 'subtree' ? e.node.subtreeWidth : PERSON_NODE_WIDTH;
}

function totalChildrenWidth(elements: ChildElement[]): number {
  if (elements.length === 0) return 0;
  return elements.reduce((sum, e) => sum + elementWidth(e), 0)
    + (elements.length - 1) * HORIZONTAL_GAP;
}

// ─── Affinity Ordering for Root Trees ────────────
export const AFFINITY_ORDER = [
  'union-valentina-elena',
  'union-jaime-basilia',
  'union-graciela-martino-hijas',
  'union-jose-rosa-trantemberg',
  'union-juda-malea',
  'union-catalina-hijos-ballistreri',
  'union-tatuna-trichi',
  'union-padres-pipi',
  'union-georges-magidi',
  'union-pedro-hellen',
  'union-pablo-celia-guardiet',
  'union-antoine-mary-jordan',
];

// ══════════════════════════════════════════════════
// Main Layout Function
// ══════════════════════════════════════════════════
export function buildGraphFromData(
  persons: Person[],
  unions: FamilyUnion[],
  isLiving = false
): { nodes: Node[]; edges: Edge[] } {

  const personIds = new Set(persons.map(p => p.id));
  const unionMap = new Map(unions.map(u => [u.id, u]));

  // Only consider unions where at least one partner exists in current graph
  const validUnions = unions.filter(u =>
    (u.partner1Id && personIds.has(u.partner1Id)) ||
    (u.partner2Id && personIds.has(u.partner2Id))
  );

  // ─── Lookup Maps ────────────────────────────
  const childOf = new Map<string, FamilyUnion>();
  const partnerIn = new Map<string, FamilyUnion[]>();

  validUnions.forEach(u => {
    u.childrenIds.forEach(cid => {
      if (personIds.has(cid)) childOf.set(cid, u);
    });
    [u.partner1Id, u.partner2Id].forEach(pid => {
      if (pid && personIds.has(pid)) {
        if (!partnerIn.has(pid)) partnerIn.set(pid, []);
        partnerIn.get(pid)!.push(u);
      }
    });
  });

  const claimed = new Set<string>();
  const personMap = new Map(persons.map(p => [p.id, p]));

  // Minimum generation present
  const presentGens = persons
    .map(p => p.generation)
    .filter((g): g is number => typeof g === 'number');
  const minGen = presentGens.length > 0 ? Math.min(...presentGens) : 0;

  function getPersonY(personId: string, fallbackY: number): number {
    const p = personMap.get(personId);
    if (p && typeof p.generation === 'number') {
      return MARGIN_Y + (p.generation - minGen) * (PERSON_NODE_HEIGHT + GENERATION_GAP);
    }
    return fallbackY;
  }

  function getUnionY(unionId: string, fallbackY: number): number {
    const u = unionMap.get(unionId);
    if (!u) return fallbackY + PERSON_NODE_HEIGHT / 2 - UNION_NODE_SIZE / 2;
    const p1 = u.partner1Id ? personMap.get(u.partner1Id) : null;
    const p2 = u.partner2Id ? personMap.get(u.partner2Id) : null;
    const g1 = p1?.generation;
    const g2 = p2?.generation;
    let gen = 0;
    if (typeof g1 === 'number' && typeof g2 === 'number') {
      gen = Math.max(g1, g2);
    } else if (typeof g1 === 'number') {
      gen = g1;
    } else if (typeof g2 === 'number') {
      gen = g2;
    } else {
      return fallbackY + PERSON_NODE_HEIGHT / 2 - UNION_NODE_SIZE / 2;
    }
    return MARGIN_Y + (gen - minGen) * (PERSON_NODE_HEIGHT + GENERATION_GAP) + PERSON_NODE_HEIGHT / 2 - UNION_NODE_SIZE / 2;
  }

  // ─── Build Subtree ──────────────────────────
  function buildSubtree(unionId: string): SubtreeNode | null {
    if (claimed.has(unionId)) return null;
    claimed.add(unionId);

    const union = unionMap.get(unionId);
    if (!union) return null;

    const p1 = union.partner1Id && personIds.has(union.partner1Id) ? union.partner1Id : null;
    const p2 = union.partner2Id && personIds.has(union.partner2Id) ? union.partner2Id : null;

    const childElements: ChildElement[] = [];
    const usedSubtreeIds = new Set<string>();

    union.childrenIds.forEach(cid => {
      if (!personIds.has(cid)) return;

      const childUnions = (partnerIn.get(cid) || []).filter(cu => !claimed.has(cu.id));
      let addedAsSubtree = false;

      for (const cu of childUnions) {
        if (!usedSubtreeIds.has(cu.id)) {
          const sub = buildSubtree(cu.id);
          if (sub) {
            usedSubtreeIds.add(cu.id);
            childElements.push({ type: 'subtree', node: sub });
            addedAsSubtree = true;
          }
        }
      }

      if (!addedAsSubtree) {
        childElements.push({ type: 'solo', personId: cid });
      }
    });

    const ownW = coupleOwnWidth(!!p1, !!p2);
    const kidW = totalChildrenWidth(childElements);

    return {
      unionId,
      partner1Id: p1,
      partner2Id: p2,
      childElements,
      subtreeWidth: Math.max(ownW, kidW),
    };
  }

  // ─── Root Unions Sorted by Affinity ─────────
  const rootUnionIds = validUnions
    .filter(u => {
      const p1HasParent = u.partner1Id ? childOf.has(u.partner1Id) : false;
      const p2HasParent = u.partner2Id ? childOf.has(u.partner2Id) : false;
      return !p1HasParent && !p2HasParent;
    })
    .sort((a, b) => {
      const idxA = AFFINITY_ORDER.indexOf(a.id);
      const idxB = AFFINITY_ORDER.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return b.childrenIds.length - a.childrenIds.length;
    })
    .map(u => u.id);

  const subtrees: SubtreeNode[] = [];
  rootUnionIds.forEach(uid => {
    if (!claimed.has(uid)) {
      const tree = buildSubtree(uid);
      if (tree) subtrees.push(tree);
    }
  });

  // Catch any disconnected unions
  validUnions.forEach(u => {
    if (!claimed.has(u.id)) {
      const tree = buildSubtree(u.id);
      if (tree) subtrees.push(tree);
    }
  });

  // ─── Position Subtrees ──────────────────────
  const positions = new Map<string, { x: number; y: number }>();
  const unionPositions = new Map<string, { x: number; y: number }>();

  function positionSubtree(node: SubtreeNode, centerX: number, y: number) {
    const p1 = node.partner1Id;
    const p2 = node.partner2Id;
    const ownW = coupleOwnWidth(!!p1, !!p2);

    const p1Y = p1 ? getPersonY(p1, y) : y;
    const p2Y = p2 ? getPersonY(p2, y) : y;
    const unionY = getUnionY(node.unionId, y);

    if (p1 && p2) {
      if (!positions.has(p1) && !positions.has(p2)) {
        const startX = centerX - ownW / 2;
        positions.set(p1, { x: startX, y: p1Y });
        const unionX = startX + PERSON_NODE_WIDTH + COUPLE_GAP;
        unionPositions.set(node.unionId, { x: unionX, y: unionY });
        const p2X = unionX + UNION_NODE_SIZE + COUPLE_GAP;
        positions.set(p2, { x: p2X, y: p2Y });
      } else if (positions.has(p1) && !positions.has(p2)) {
        const p1Pos = positions.get(p1)!;
        const unionX = p1Pos.x + PERSON_NODE_WIDTH + COUPLE_GAP;
        unionPositions.set(node.unionId, { x: unionX, y: unionY });
        const p2X = unionX + UNION_NODE_SIZE + COUPLE_GAP;
        positions.set(p2, { x: p2X, y: p2Y });
      } else if (!positions.has(p1) && positions.has(p2)) {
        const p2Pos = positions.get(p2)!;
        const unionX = p2Pos.x - COUPLE_GAP - UNION_NODE_SIZE;
        unionPositions.set(node.unionId, { x: unionX, y: unionY });
        const p1X = unionX - COUPLE_GAP - PERSON_NODE_WIDTH;
        positions.set(p1, { x: p1X, y: p1Y });
      } else {
        const p1Pos = positions.get(p1)!;
        const p2Pos = positions.get(p2)!;
        const unionX = (p1Pos.x + p2Pos.x) / 2;
        unionPositions.set(node.unionId, { x: unionX, y: unionY });
      }
    } else if (p1) {
      const startX = centerX - ownW / 2;
      if (!positions.has(p1)) {
        positions.set(p1, { x: startX, y: p1Y });
      }
      const p1Pos = positions.get(p1)!;
      unionPositions.set(node.unionId, {
        x: p1Pos.x + PERSON_NODE_WIDTH + COUPLE_GAP,
        y: unionY,
      });
    } else if (p2) {
      if (!positions.has(p2)) {
        positions.set(p2, { x: centerX - ownW / 2 + UNION_NODE_SIZE + COUPLE_GAP, y: p2Y });
      }
      const p2Pos = positions.get(p2)!;
      unionPositions.set(node.unionId, {
        x: p2Pos.x - COUPLE_GAP - UNION_NODE_SIZE,
        y: unionY,
      });
    }

    if (node.childElements.length === 0) return;

    let effectiveWidth = 0;
    let effectiveCount = 0;
    node.childElements.forEach(ce => {
      if (ce.type === 'subtree') {
        effectiveWidth += ce.node.subtreeWidth;
        effectiveCount++;
      } else if (!positions.has(ce.personId)) {
        effectiveWidth += PERSON_NODE_WIDTH;
        effectiveCount++;
      }
    });
    if (effectiveCount > 1) {
      effectiveWidth += (effectiveCount - 1) * HORIZONTAL_GAP;
    }

    const nextLevelY = y + PERSON_NODE_HEIGHT + GENERATION_GAP;
    let childX = centerX - effectiveWidth / 2;

    node.childElements.forEach(ce => {
      if (ce.type === 'subtree') {
        const w = ce.node.subtreeWidth;
        positionSubtree(ce.node, childX + w / 2, nextLevelY);
        childX += w + HORIZONTAL_GAP;
      } else {
        if (!positions.has(ce.personId)) {
          const personY = getPersonY(ce.personId, nextLevelY);
          positions.set(ce.personId, { x: childX, y: personY });
          childX += PERSON_NODE_WIDTH + HORIZONTAL_GAP;
        }
      }
    });
  }

  const totalW = subtrees.reduce((s, t) => s + t.subtreeWidth, 0)
    + Math.max(0, subtrees.length - 1) * TREE_GAP;
  let treeX = -totalW / 2;

  subtrees.forEach(tree => {
    positionSubtree(tree, treeX + tree.subtreeWidth / 2, MARGIN_Y);
    treeX += tree.subtreeWidth + TREE_GAP;
  });

  // Place orphans
  let orphanX = treeX + TREE_GAP;
  persons.forEach(p => {
    if (!positions.has(p.id)) {
      const pY = getPersonY(p.id, MARGIN_Y);
      positions.set(p.id, { x: orphanX, y: pY });
      orphanX += PERSON_NODE_WIDTH + HORIZONTAL_GAP;
    }
  });

  // ═══════════════════════════════════════════════
  // Build React Flow Nodes
  // ═══════════════════════════════════════════════
  const personNodes: Node[] = [];
  persons.forEach(p => {
    const pos = positions.get(p.id);
    if (!pos) return;
    personNodes.push({
      id: p.id,
      type: 'person',
      position: { x: pos.x, y: pos.y },
      data: {
        ...p,
        isLiving,
      },
      zIndex: 10,
    });
  });

  const unionNodes: Node[] = [];
  validUnions.forEach(u => {
    const pos = unionPositions.get(u.id);
    if (!pos) return;
    unionNodes.push({
      id: u.id,
      type: 'union',
      position: { x: pos.x, y: pos.y },
      data: {
        ...u,
        isLiving,
      },
      zIndex: 5,
    });
  });

  // ═══════════════════════════════════════════════
  // Build Edges
  // ═══════════════════════════════════════════════
  const edges: Edge[] = [];

  validUnions.forEach(u => {
    if (!unionPositions.has(u.id)) return;

    const p1 = u.partner1Id ? personMap.get(u.partner1Id) : null;
    const p2 = u.partner2Id ? personMap.get(u.partner2Id) : null;
    const p1BranchColor = p1?.branch ? BRANCH_COLORS[p1.branch] || DEFAULT_BRANCH_COLOR : DEFAULT_BRANCH_COLOR;
    const p2BranchColor = p2?.branch ? BRANCH_COLORS[p2.branch] || DEFAULT_BRANCH_COLOR : DEFAULT_BRANCH_COLOR;

    // Partner 1 → Union (horizontal, straight)
    if (u.partner1Id && positions.has(u.partner1Id)) {
      edges.push({
        id: `e-${u.partner1Id}-${u.id}`,
        source: u.partner1Id,
        sourceHandle: 'right',
        target: u.id,
        targetHandle: 'left',
        type: 'straight',
        className: isLiving ? 'living-edge-path' : undefined,
        data: { relationship: 'Pareja', branch: p1?.branch || 'Otros', stroke: p1BranchColor.stroke },
        style: { stroke: p1BranchColor.stroke, strokeWidth: isLiving ? 3 : 2.5 },
      });
    }

    // Union → Partner 2 (horizontal, straight)
    if (u.partner2Id && positions.has(u.partner2Id)) {
      edges.push({
        id: `e-${u.id}-${u.partner2Id}`,
        source: u.id,
        sourceHandle: 'right',
        target: u.partner2Id,
        targetHandle: 'left',
        type: 'straight',
        className: isLiving ? 'living-edge-path' : undefined,
        data: { relationship: 'Pareja', branch: p2?.branch || 'Otros', stroke: p2BranchColor.stroke },
        style: { stroke: p2BranchColor.stroke, strokeWidth: isLiving ? 3 : 2.5 },
      });
    }

    // Union → Children (vertical, smoothstep with rounded corners)
    u.childrenIds.forEach(cid => {
      if (positions.has(cid)) {
        const child = personMap.get(cid);
        const childBranchColor = child?.branch ? BRANCH_COLORS[child.branch] || DEFAULT_BRANCH_COLOR : DEFAULT_BRANCH_COLOR;
        edges.push({
          id: `e-${u.id}-${cid}`,
          source: u.id,
          sourceHandle: 'bottom',
          target: cid,
          targetHandle: 'top',
          type: 'smoothstep',
          className: isLiving ? 'living-edge-path' : undefined,
          data: { relationship: 'Hijo/a', branch: child?.branch || 'Otros', stroke: childBranchColor.stroke, borderRadius: 16 },
          style: { stroke: childBranchColor.stroke, strokeWidth: isLiving ? 3 : 2.5 },
        });
      }
    });
  });

  // ═══════════════════════════════════════════════
  // Branch Group Bounding Boxes
  // ═══════════════════════════════════════════════
  const branchMap: Record<string, Node[]> = {};
  personNodes.forEach(node => {
    const person = node.data as unknown as Person;
    const branch = person.branch || 'Otros';
    if (!branchMap[branch]) branchMap[branch] = [];
    branchMap[branch].push(node);
  });

  const groupNodes: Node[] = [];
  const PADDING = 32;

  Object.entries(branchMap).forEach(([branchName, branchPersonNodes]) => {
    if (branchPersonNodes.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    branchPersonNodes.forEach(node => {
      const x = node.position.x;
      const y = node.position.y;
      if (x < minX) minX = x;
      if (x + PERSON_NODE_WIDTH > maxX) maxX = x + PERSON_NODE_WIDTH;
      if (y < minY) minY = y;
      if (y + PERSON_NODE_HEIGHT > maxY) maxY = y + PERSON_NODE_HEIGHT;
    });

    const colors = BRANCH_COLORS[branchName] || DEFAULT_BRANCH_COLOR;
    const width = maxX - minX + PADDING * 2;
    const height = maxY - minY + PADDING * 2 + 16;

    groupNodes.push({
      id: `group-branch-${branchName}`,
      type: 'branchGroup',
      position: { x: minX - PADDING, y: minY - PADDING - 16 },
      style: { width, height },
      data: {
        label: branchName,
        count: branchPersonNodes.length,
        bg: colors.bg,
        border: colors.border,
        tagBg: colors.tagBg,
        rgb: colors.rgb,
        isLiving,
      },
      zIndex: -10,
      selectable: false,
      draggable: false,
    });
  });

  return {
    nodes: [...groupNodes, ...unionNodes, ...personNodes],
    edges,
  };
}
