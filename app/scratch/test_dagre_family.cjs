const dagre = require('@dagrejs/dagre');

const persons = [
  { id: 'la-tatuna', branch: 'Ballistreri' },
  { id: 'padres-pipi', branch: 'Ballistreri' },
  { id: 'moises', branch: 'Chababo' },
  { id: 'la-trichi', branch: 'Ballistreri' },
  { id: 'la-pipi', branch: 'Ballistreri' },
  { id: 'ernesto-padre', branch: 'Familia Ernesto' },
  { id: 'victoria', branch: 'Familia Ernesto' },
  { id: 'mariana', branch: 'Familia Ernesto' },
  { id: 'ernesto-hijo', branch: 'Familia Ernesto' },
];

const unions = [
  { id: 'u-tatuna', partner1Id: 'la-tatuna', childrenIds: ['la-trichi'] },
  { id: 'u-pipi', partner1Id: 'ernesto-padre', partner2Id: 'la-pipi', childrenIds: ['victoria', 'mariana', 'ernesto-hijo'] },
];

const dagreGraph = new dagre.graphlib.Graph({ compound: true });
dagreGraph.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 110, marginx: 60, marginy: 60 });
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Branches
const branches = ['Ballistreri', 'Chababo', 'Familia Ernesto'];
branches.forEach(b => dagreGraph.setNode(`branch-${b}`, {}));

persons.forEach(p => {
  dagreGraph.setNode(p.id, { width: 250, height: 140 });
  dagreGraph.setParent(p.id, `branch-${p.branch}`);
});

unions.forEach(u => {
  dagreGraph.setNode(u.id, { width: 50, height: 50 });
  if (u.partner1Id) dagreGraph.setEdge(u.partner1Id, u.id);
  if (u.partner2Id) dagreGraph.setEdge(u.partner2Id, u.id);
  u.childrenIds.forEach(c => dagreGraph.setEdge(u.id, c));
});

dagre.layout(dagreGraph);

['ernesto-padre', 'la-pipi', 'u-pipi', 'victoria', 'mariana', 'ernesto-hijo', 'branch-Familia Ernesto', 'branch-Ballistreri'].forEach(id => {
  console.log(id, dagreGraph.node(id));
});
