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
}

// ─── Branch Colors ──────────────────────────────
export const BRANCH_COLORS: Record<string, BranchColorDef> = {
  Chababo: { bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.25)', tagBg: '#d97706', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' },
  Ballistreri: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  Bolbol: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  Levin: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)' },
  Evlagon: { bg: 'rgba(139, 92, 246, 0.04)', border: 'rgba(139, 92, 246, 0.25)', tagBg: '#7c3aed', stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)' },
  Isassa: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  Romeo: { bg: 'rgba(249, 115, 22, 0.04)', border: 'rgba(249, 115, 22, 0.25)', tagBg: '#ea580c', stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.35)' },
  Gindin: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0d9488', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)' },
  Alek: { bg: 'rgba(99, 102, 241, 0.04)', border: 'rgba(99, 102, 241, 0.25)', tagBg: '#4f46e5', stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)' },
  Gesrik: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#9333ea', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
  Halek: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)' },
  Guardiet: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)' },
  Goytia: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  Bonsignore: { bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.25)', tagBg: '#d97706', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' },
  Yebne: { bg: 'rgba(132, 204, 22, 0.04)', border: 'rgba(132, 204, 22, 0.25)', tagBg: '#65a30d', stroke: '#84cc16', glow: 'rgba(132, 204, 22, 0.35)' },
  Vesi: { bg: 'rgba(6, 182, 212, 0.04)', border: 'rgba(6, 182, 212, 0.25)', tagBg: '#0891b2', stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.35)' },
  Fernandez: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#9333ea', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
  'Santa Cruz': { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  Dinucchi: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  Coccolo: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)' },
  Cosolito: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  Gagliardi: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  Vondarenko: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
  Bortoliero: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)' },
  Remondino: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)' },
  Sánchez: { bg: 'rgba(139, 92, 246, 0.04)', border: 'rgba(139, 92, 246, 0.25)', tagBg: '#7c3aed', stroke: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)' },
  Martino: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  Sciutto: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)' },
  Baez: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  Romero: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  Trantemberg: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  Levi: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)' },
  Susman: { bg: 'rgba(99, 102, 241, 0.04)', border: 'rgba(99, 102, 241, 0.25)', tagBg: '#4338ca', stroke: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)' },
  Sader: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)' },
  Ades: { bg: 'rgba(20, 184, 166, 0.04)', border: 'rgba(20, 184, 166, 0.25)', tagBg: '#0f766e', stroke: '#14b8a6', glow: 'rgba(20, 184, 166, 0.35)' },
  Dahan: { bg: 'rgba(236, 72, 153, 0.04)', border: 'rgba(236, 72, 153, 0.25)', tagBg: '#db2777', stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.35)' },
  Jordan: { bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.25)', tagBg: '#2563eb', stroke: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)' },
  Gaywood: { bg: 'rgba(244, 63, 94, 0.04)', border: 'rgba(244, 63, 94, 0.25)', tagBg: '#e11d48', stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  Wilson: { bg: 'rgba(234, 88, 12, 0.04)', border: 'rgba(234, 88, 12, 0.25)', tagBg: '#c2410c', stroke: '#ea580c', glow: 'rgba(234, 88, 12, 0.35)' },
  Flores: { bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.25)', tagBg: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  Molina: { bg: 'rgba(168, 85, 247, 0.04)', border: 'rgba(168, 85, 247, 0.25)', tagBg: '#7e22ce', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
  Bermudas: { bg: 'rgba(14, 165, 233, 0.04)', border: 'rgba(14, 165, 233, 0.25)', tagBg: '#0284c7', stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.35)' },
  Nejad: { bg: 'rgba(217, 119, 6, 0.04)', border: 'rgba(217, 119, 6, 0.25)', tagBg: '#b45309', stroke: '#d97706', glow: 'rgba(217, 119, 6, 0.35)' },
  Sayed: { bg: 'rgba(132, 204, 22, 0.04)', border: 'rgba(132, 204, 22, 0.25)', tagBg: '#65a30d', stroke: '#84cc16', glow: 'rgba(132, 204, 22, 0.35)' },
  'Familia Ernesto': { bg: 'rgba(107, 114, 128, 0.04)', border: 'rgba(107, 114, 128, 0.25)', tagBg: '#4b5563', stroke: '#64748b', glow: 'rgba(100, 116, 139, 0.35)' },
  'Familia Leandro': { bg: 'rgba(107, 114, 128, 0.04)', border: 'rgba(107, 114, 128, 0.25)', tagBg: '#4b5563', stroke: '#64748b', glow: 'rgba(100, 116, 139, 0.35)' },
};

export const DEFAULT_BRANCH_COLOR: BranchColorDef = {
  bg: 'rgba(241, 245, 249, 0.03)',
  border: 'rgba(148, 163, 184, 0.2)',
  tagBg: '#64748b',
  stroke: '#94a3b8',
  glow: 'rgba(148, 163, 184, 0.25)',
};

// ─── Subtree types ──────────────────────────────
// The layout works as a recursive tree:
//
//   [Partner1] ─── ❤ ─── [Partner2]
//                  │
//     ┌────────────┼────────────┐
//     │            │            │
//   [Child1]    [Child2+P]   [Child3]
//                  │
//               [Grandchild]
//
// 1. Build a tree of SubtreeNodes starting from root unions
// 2. Compute subtree widths bottom-up (leaves first)
// 3. Position top-down, centering children under their parent union

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

// ─── Width helpers ──────────────────────────────

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

// ══════════════════════════════════════════════════
// Main Layout Function
// ══════════════════════════════════════════════════
export function buildGraphFromData(
  persons: Person[],
  unions: FamilyUnion[]
): { nodes: Node[]; edges: Edge[] } {

  const personIds = new Set(persons.map(p => p.id));
  const unionMap = new Map(unions.map(u => [u.id, u]));

  // Only consider unions whose at least one partner exists
  const validUnions = unions.filter(u =>
    (u.partner1Id && personIds.has(u.partner1Id)) ||
    (u.partner2Id && personIds.has(u.partner2Id))
  );

  // ─── Lookup Maps ────────────────────────────
  const childOf = new Map<string, FamilyUnion>();     // personId → union that produced them
  const partnerIn = new Map<string, FamilyUnion[]>(); // personId → unions where they're a partner

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

  // Track claimed unions to avoid processing the same union in multiple subtrees
  const claimed = new Set<string>();

  const personMap = new Map(persons.map(p => [p.id, p]));

  // Find minimum generation present
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

  // ─── Build Subtree (recursive, bottom-up width) ────
  function buildSubtree(unionId: string): SubtreeNode | null {
    if (claimed.has(unionId)) return null;
    claimed.add(unionId);

    const union = unionMap.get(unionId);
    if (!union) return null;

    const p1 = union.partner1Id && personIds.has(union.partner1Id) ? union.partner1Id : null;
    const p2 = union.partner2Id && personIds.has(union.partner2Id) ? union.partner2Id : null;

    const childElements: ChildElement[] = [];
    const usedSubtreeIds = new Set<string>();

    // Process children in their declared order to maintain sibling order
    union.childrenIds.forEach(cid => {
      if (!personIds.has(cid)) return;

      // Find unclaimed unions where this child is a partner
      const childUnions = (partnerIn.get(cid) || []).filter(cu => !claimed.has(cu.id));
      let addedAsSubtree = false;

      for (const cu of childUnions) {
        if (!usedSubtreeIds.has(cu.id)) {
          const sub = buildSubtree(cu.id);
          if (sub) {
            usedSubtreeIds.add(cu.id);
            childElements.push({ type: 'subtree', node: sub });
            addedAsSubtree = true;
            break; // one subtree per child
          }
        }
      }

      if (!addedAsSubtree) {
        childElements.push({ type: 'solo', personId: cid });
      }
    });

    // Width = max(couple's own width, total children width)
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

  // ─── Find Root Unions ──────────────────────────
  // A union is a true root only if NEITHER partner has a parent union in the active graph
  const rootUnionIds = validUnions
    .filter(u => {
      const p1HasParent = u.partner1Id ? childOf.has(u.partner1Id) : false;
      const p2HasParent = u.partner2Id ? childOf.has(u.partner2Id) : false;
      return !p1HasParent && !p2HasParent;
    })
    .map(u => u.id);

  // Build subtrees from root unions
  const subtrees: SubtreeNode[] = [];
  rootUnionIds.forEach(uid => {
    const tree = buildSubtree(uid);
    if (tree) subtrees.push(tree);
  });

  // Catch any unclaimed unions (disconnected families)
  validUnions.forEach(u => {
    if (!claimed.has(u.id)) {
      const tree = buildSubtree(u.id);
      if (tree) subtrees.push(tree);
    }
  });

  // ─── Position Subtrees (recursive, top-down) ────
  const positions = new Map<string, { x: number; y: number }>();
  const unionPositions = new Map<string, { x: number; y: number }>();

  function positionSubtree(node: SubtreeNode, centerX: number, y: number) {
    const p1 = node.partner1Id;
    const p2 = node.partner2Id;
    const ownW = coupleOwnWidth(!!p1, !!p2);

    // ── Position the couple + union node with Generational Snapping ──
    const p1Y = p1 ? getPersonY(p1, y) : y;
    const p2Y = p2 ? getPersonY(p2, y) : y;
    const unionY = getUnionY(node.unionId, y);

    if (p1 && p2) {
      const startX = centerX - ownW / 2;
      if (!positions.has(p1)) positions.set(p1, { x: startX, y: p1Y });
      const unionX = startX + PERSON_NODE_WIDTH + COUPLE_GAP;
      unionPositions.set(node.unionId, { x: unionX, y: unionY });
      if (!positions.has(p2)) {
        positions.set(p2, { x: unionX + UNION_NODE_SIZE + COUPLE_GAP, y: p2Y });
      }
    } else if (p1) {
      const startX = centerX - ownW / 2;
      if (!positions.has(p1)) positions.set(p1, { x: startX, y: p1Y });
      unionPositions.set(node.unionId, {
        x: startX + PERSON_NODE_WIDTH + COUPLE_GAP,
        y: unionY,
      });
    } else if (p2) {
      const unionX = centerX - ownW / 2;
      unionPositions.set(node.unionId, { x: unionX, y: unionY });
      if (!positions.has(p2)) {
        positions.set(p2, { x: unionX + UNION_NODE_SIZE + COUPLE_GAP, y: p2Y });
      }
    }

    // ── Position children centered below ──
    if (node.childElements.length === 0) return;

    // Compute effective width skipping already-positioned persons
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

  // ── Layout all root subtrees side by side ──
  const totalW = subtrees.reduce((s, t) => s + t.subtreeWidth, 0)
    + Math.max(0, subtrees.length - 1) * TREE_GAP;
  let treeX = -totalW / 2;

  subtrees.forEach(tree => {
    positionSubtree(tree, treeX + tree.subtreeWidth / 2, MARGIN_Y);
    treeX += tree.subtreeWidth + TREE_GAP;
  });

  // ── Place orphan persons (not reached by any subtree) ──
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
      data: p,
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
      data: u,
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
        data: { relationship: 'Pareja', branch: p1?.branch || 'Otros', stroke: p1BranchColor.stroke },
        style: { stroke: p1BranchColor.stroke, strokeWidth: 2.5 },
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
        data: { relationship: 'Pareja', branch: p2?.branch || 'Otros', stroke: p2BranchColor.stroke },
        style: { stroke: p2BranchColor.stroke, strokeWidth: 2.5 },
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
          data: { relationship: 'Hijo/a', branch: child?.branch || 'Otros', stroke: childBranchColor.stroke, borderRadius: 16 },
          style: { stroke: childBranchColor.stroke, strokeWidth: 2.5 },
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
