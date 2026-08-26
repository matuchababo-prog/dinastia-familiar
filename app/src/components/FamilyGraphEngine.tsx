import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  SelectionMode,
  ReactFlowProvider,
  useReactFlow,
  MiniMap
} from '@xyflow/react';
import type { NodeTypes, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MousePointer2, Move, RotateCcw, UnfoldVertical, Maximize2 } from 'lucide-react';
import { PersonNode } from './PersonNode';
import { UnionNode } from './UnionNode';
import { BranchGroupNode } from './BranchGroupNode';
import { ProfileSheet } from './ProfileSheet';
import { MemoryFeed } from './MemoryFeed';
import { AppLayout } from './AppLayout';
import type { Person, FamilyUnion, MemoryPost } from '../types/family';
import { buildGraphFromData, BRANCH_COLORS } from '../utils/layout';
import { getFocalPersonSubgraph, getBranchSubgraph } from '../utils/focalGraph';
import { subscribeToPersons, subscribeToUnions, subscribeToMemories, saveMemoryToCloud } from '../services/familyService';

import { INITIAL_PERSONS, INITIAL_UNIONS, INITIAL_MEMORIES } from '../data/initialFamily';

const nodeTypes: NodeTypes = {
  person: PersonNode as any,
  union: UnionNode as any,
  branchGroup: BranchGroupNode as any,
};

// Subcomponent to automatically fit/center the view when filters or nodes change
const AutoFitView: React.FC<{ filterKey: string; nodeCount: number }> = ({ filterKey, nodeCount }) => {
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (nodeCount > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.2, duration: 400 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [filterKey, nodeCount, fitView]);

  return null;
};

const FamilyGraphContent: React.FC = () => {
  const { getViewport, setViewport, fitView } = useReactFlow();

  const [persons, setPersons] = useState<Person[]>(INITIAL_PERSONS);
  const [unions, setUnions] = useState<FamilyUnion[]>(INITIAL_UNIONS);
  const [memories, setMemories] = useState<MemoryPost[]>(INITIAL_MEMORIES);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'canvas' | 'feed'>('canvas');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('all');
  const [focalPersonId, setFocalPersonId] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [viewDensity, setViewDensity] = useState<'compact' | 'detailed'>('detailed');

  // Realtime Cloud Persistence Subscriptions
  useEffect(() => {
    const unsubPersons = subscribeToPersons(setPersons);
    const unsubUnions = subscribeToUnions(setUnions);
    const unsubMemories = subscribeToMemories(setMemories);

    return () => {
      unsubPersons();
      unsubUnions();
      unsubMemories();
    };
  }, []);

  const availableBranches = useMemo(() => {
    const branches = new Set<string>();
    persons.forEach(p => {
      if (p.branch) branches.add(p.branch);
    });
    return Array.from(branches).sort();
  }, [persons]);

  const availableGenerations = useMemo(() => {
    const gens = new Set<number>();
    persons.forEach(p => {
      if (typeof p.generation === 'number') gens.add(p.generation);
    });
    return Array.from(gens).sort((a, b) => a - b);
  }, [persons]);

  // Robust Filter Computation (Ghosting logic)
  const { matchedPersonIds, matchedUnionIds } = useMemo(() => {
    let matchedIds: Set<string>;

    if (focalPersonId) {
      matchedIds = getFocalPersonSubgraph(focalPersonId, persons, unions);
    } else {
      // 1. If branch selected, get full lineage subgraph for that family
      let candidateIds: Set<string>;
      if (selectedBranch !== 'all') {
        candidateIds = getBranchSubgraph(selectedBranch, persons, unions);
      } else {
        candidateIds = new Set(persons.map(p => p.id));
      }

      // 2. Filter candidate persons by generation & search query
      const matched = persons.filter((p) => {
        if (!candidateIds.has(p.id)) return false;

        const matchGen = selectedGeneration === 'all' || p.generation === Number(selectedGeneration);

        const q = searchQuery.trim().toLowerCase();
        const matchSearch = q === '' || 
          p.name.toLowerCase().includes(q) ||
          (p.branch && p.branch.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));

        return matchGen && matchSearch;
      });

      matchedIds = new Set(matched.map(p => p.id));

      // 3. Include spouses of matched members so marriage nodes/lines stay intact
      unions.forEach(union => {
        const hasP1 = union.partner1Id && matchedIds.has(union.partner1Id);
        const hasP2 = union.partner2Id && matchedIds.has(union.partner2Id);
        
        if (hasP1 && union.partner2Id && !matchedIds.has(union.partner2Id)) {
          matchedIds.add(union.partner2Id);
        }
        if (hasP2 && union.partner1Id && !matchedIds.has(union.partner1Id)) {
          matchedIds.add(union.partner1Id);
        }
      });
    }

    const mUnions = new Set<string>();
    unions.forEach(u => {
      if ((u.partner1Id && matchedIds.has(u.partner1Id)) || 
          (u.partner2Id && matchedIds.has(u.partner2Id))) {
        mUnions.add(u.id);
      }
    });

    return { matchedPersonIds: matchedIds, matchedUnionIds: mUnions };
  }, [persons, unions, searchQuery, selectedBranch, selectedGeneration, focalPersonId]);

  // Compute Layout for the FULL tree, but apply isDimmed and viewDensity to nodes
  useEffect(() => {
    if (persons.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }
    const { nodes: layoutedNodes, edges: layoutedEdges } = buildGraphFromData(persons, unions);
    
    const hasActiveFilter = selectedBranch !== 'all' || selectedGeneration !== 'all' || searchQuery.trim() !== '' || focalPersonId !== null;

    // Apply ghosting (dimming) & viewDensity
    const processedNodes = layoutedNodes.map(node => {
      let isDimmed = false;
      if (hasActiveFilter) {
        if (node.type === 'person') {
          isDimmed = !matchedPersonIds.has(node.id);
        } else if (node.type === 'union') {
          isDimmed = !matchedUnionIds.has(node.id);
        }
      }
      return {
        ...node,
        data: {
          ...node.data,
          isDimmed,
          viewDensity,
        }
      };
    });

    // Apply ghosting & branch colors to edges
    const processedEdges = layoutedEdges.map(edge => {
      let isDimmed = false;
      if (hasActiveFilter) {
        // Find if source or target is dimmed
        const sourceNode = processedNodes.find(n => n.id === edge.source);
        const targetNode = processedNodes.find(n => n.id === edge.target);
        if (sourceNode?.data.isDimmed || targetNode?.data.isDimmed) {
          isDimmed = true;
        }
      }
      
      const originalStroke = (edge.data as any)?.stroke || '#94a3b8';

      return {
        ...edge,
        style: {
          ...edge.style,
          stroke: isDimmed ? '#e2e8f0' : originalStroke,
          strokeWidth: isDimmed ? 1.5 : 2.5,
          opacity: isDimmed ? 0.12 : 1,
          transition: 'stroke 0.3s ease, opacity 0.3s ease, stroke-width 0.3s ease',
        }
      };
    });

    setNodes(processedNodes);
    setEdges(processedEdges);
  }, [persons, unions, matchedPersonIds, matchedUnionIds, setNodes, setEdges, selectedBranch, selectedGeneration, searchQuery, focalPersonId, viewDensity]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.type === 'person') {
        setSelectedPerson(node.data as unknown as Person);
      }
    },
    []
  );

  const handleAddMemory = async (newPost: MemoryPost) => {
    setMemories((prev) => [newPost, ...prev]);
    await saveMemoryToCloud(newPost);
  };

  const handleResetFilters = useCallback(() => {
    setSelectedBranch('all');
    setSelectedGeneration('all');
    setSearchQuery('');
    setFocalPersonId(null);
  }, []);

  // Vertical Fit Handler: fits the entire tree height inside the viewport
  const handleFitVertical = useCallback(() => {
    const personNodes = nodes.filter(n => n.type === 'person');
    if (personNodes.length === 0) return;

    let minY = Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let maxX = -Infinity;

    personNodes.forEach(node => {
      if (node.position.y < minY) minY = node.position.y;
      if (node.position.y + 140 > maxY) maxY = node.position.y + 140;
      if (node.position.x < minX) minX = node.position.x;
      if (node.position.x + 250 > maxX) maxX = node.position.x + 250;
    });

    const container = document.querySelector('.react-flow') as HTMLElement | null;
    const viewportHeight = container ? container.clientHeight : window.innerHeight - 56;
    const viewportWidth = container ? container.clientWidth : window.innerWidth - 256;

    const treeHeight = Math.max(100, maxY - minY);
    const paddingY = 110; // 55px top, 55px bottom for comfortable breathing room
    const availableHeight = Math.max(100, viewportHeight - paddingY);

    // Zoom that fits all generations vertically
    const targetZoom = Math.min(1.0, Math.max(0.15, availableHeight / treeHeight));

    // Vertical position to center tree vertically
    const targetY = (viewportHeight - treeHeight * targetZoom) / 2 - minY * targetZoom;

    // Horizontal position: preserve user's horizontal focus
    const currentViewport = getViewport();
    let targetX: number;

    if (currentViewport.zoom <= 0.2 || Math.abs(currentViewport.x) < 5) {
      targetX = (viewportWidth - (maxX + minX) * targetZoom) / 2;
    } else {
      const currentWorldCenterX = (viewportWidth / 2 - currentViewport.x) / currentViewport.zoom;
      const clampedWorldX = Math.max(minX - 100, Math.min(maxX + 100, currentWorldCenterX));
      targetX = viewportWidth / 2 - clampedWorldX * targetZoom;
    }

    setViewport({ x: targetX, y: targetY, zoom: targetZoom }, { duration: 400 });
  }, [nodes, getViewport, setViewport]);

  const handleFitAll = useCallback(() => {
    fitView({ padding: 0.15, duration: 400 });
  }, [fitView]);

  const filterKey = `${selectedBranch}-${selectedGeneration}-${searchQuery}-${focalPersonId}`;
  const hasActiveFilter = selectedBranch !== 'all' || selectedGeneration !== 'all' || searchQuery.trim() !== '' || focalPersonId !== null;

  return (
    <AppLayout
      activeView={activeView}
      setActiveView={setActiveView}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      memoriesCount={memories.length}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
      availableBranches={availableBranches}
      selectedGeneration={selectedGeneration}
      setSelectedGeneration={setSelectedGeneration}
      availableGenerations={availableGenerations}
      focalPersonId={focalPersonId}
      setFocalPersonId={setFocalPersonId}
      focalPersonName={persons.find(p => p.id === focalPersonId)?.name}
      hasActiveFilter={hasActiveFilter}
      onResetFilters={handleResetFilters}
      viewDensity={viewDensity}
      setViewDensity={setViewDensity}
    >
      <div className="w-full h-full relative">
        {activeView === 'canvas' ? (
          <>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{ 
                type: 'smoothstep', 
                style: { stroke: 'var(--color-border)', strokeWidth: 2.5 } 
              }}
              fitView
              minZoom={0.1}
              maxZoom={2}
              panOnDrag={!isSelectionMode}
              panOnScroll={true}
              selectionOnDrag={isSelectionMode}
              selectionMode={SelectionMode.Partial}
            >
              <Background color="rgba(203, 213, 225, 0.4)" gap={28} size={1.5} />
              <MiniMap 
                nodeStrokeWidth={2} 
                zoomable 
                pannable 
                nodeColor={(n) => {
                  if (n.data.isDimmed) return '#f1f5f9';
                  if (n.type === 'person') {
                    const data = n.data as any;
                    if (data.isFocal) return '#ea580c';
                    if (data.branch && BRANCH_COLORS[data.branch]) {
                      return BRANCH_COLORS[data.branch].stroke;
                    }
                    return '#94a3b8';
                  }
                  if (n.type === 'union') return '#f43f5e';
                  return '#e2e8f0';
                }}
                maskColor="rgba(248, 250, 252, 0.75)"
                className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 backdrop-blur-md"
              />
              <Controls className="bg-white/95 backdrop-blur-md shadow-lg border-slate-200/90 rounded-xl" />
              <Panel position="top-right" className="bg-white p-1 rounded-lg shadow-lg border border-slate-200 flex flex-col gap-1 mt-2 mr-2">
                <button
                  onClick={() => setIsSelectionMode(false)}
                  className={`p-2 rounded-md transition-colors ${!isSelectionMode ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="Modo Mover (Arrastrar para mover la cámara libremente)"
                >
                  <Move size={18} />
                </button>
                <button
                  onClick={() => setIsSelectionMode(true)}
                  className={`p-2 rounded-md transition-colors ${isSelectionMode ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="Modo Selección Múltiple (Arrastrar recuadro para seleccionar y mover varias cartas juntas)"
                >
                  <MousePointer2 size={18} />
                </button>

                <div className="h-px bg-slate-200 my-0.5 mx-1" />

                <button
                  onClick={handleFitVertical}
                  className="p-2 rounded-md text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center relative group"
                  title="Ajuste Vertical (Encuadrar al alto de pantalla para scrollear horizontal sin perder generaciones)"
                >
                  <UnfoldVertical size={18} />
                  <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    Ajuste Vertical (Alto)
                  </span>
                </button>

                <button
                  onClick={handleFitAll}
                  className="p-2 rounded-md text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center relative group"
                  title="Encuadre Completo (Ver todo el árbol en pantalla)"
                >
                  <Maximize2 size={18} />
                  <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    Encuadre Total
                  </span>
                </button>
              </Panel>
              <AutoFitView filterKey={filterKey} nodeCount={nodes.length} />
            </ReactFlow>

            {/* Empty State Overlay */}
            {hasActiveFilter && matchedPersonIds.size === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm z-30 p-6 text-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                  <RotateCcw size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No se encontraron familiares</h3>
                <p className="text-sm text-slate-500 mb-4 max-w-sm">
                  Ningún integrante coincide con la combinación de filtros seleccionada.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 pointer-events-auto"
                >
                  <RotateCcw size={14} />
                  Restablecer todos los filtros
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="h-full overflow-y-auto bg-slate-50">
            <MemoryFeed memories={memories} onAddMemory={handleAddMemory} />
          </div>
        )}

        {/* Profile Drawer */}
        <ProfileSheet 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
          onFocusPerson={(id) => {
            setFocalPersonId(id);
            setSelectedPerson(null);
          }}
          isFocal={selectedPerson?.id === focalPersonId}
        />
      </div>
    </AppLayout>
  );
};

export const FamilyGraphEngine: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FamilyGraphContent />
    </ReactFlowProvider>
  );
};

