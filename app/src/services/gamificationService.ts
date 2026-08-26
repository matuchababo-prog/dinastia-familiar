import type { Badge, BadgeId, TriviaQuestion, UserGamificationState, FamilyQuest } from '../types/gamification';
import type { Person, FamilyUnion } from '../types/family';

const STORAGE_KEY = 'dinastia_gamification_state_v1';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_steps',
    title: 'Primeros Pasos',
    description: 'Te identificaste con tu nombre en el árbol familiar.',
    icon: '🌟',
    category: 'EXPLORATION',
  },
  {
    id: 'branch_explorer',
    title: 'Gran Explorador',
    description: 'Exploraste al menos 4 ramas familiares distintas.',
    icon: '🧭',
    category: 'EXPLORATION',
  },
  {
    id: 'roots_seeker',
    title: 'Buscador de Raíces',
    description: 'Descubriste a los patriarcas y ancestros de la Generación 0.',
    icon: '📜',
    category: 'EXPLORATION',
  },
  {
    id: 'audio_listener',
    title: 'Memoria Viva',
    description: 'Escuchaste un testimonio de voz histórico de la familia.',
    icon: '🎙️',
    category: 'KNOWLEDGE',
  },
  {
    id: 'family_chronicler',
    title: 'Cronista Familiar',
    description: 'Escribiste y compartiste una anécdota o recuerdo.',
    icon: '✍️',
    category: 'CONTRIBUTION',
  },
  {
    id: 'wisdom_sharer',
    title: 'Sabiduría Compartida',
    description: 'Sumaste un valor o enseñanza al perfil de un familiar.',
    icon: '💡',
    category: 'CONTRIBUTION',
  },
  {
    id: 'photo_keeper',
    title: 'Guardián Visual',
    description: 'Subiste una fotografía histórica al archivo familiar.',
    icon: '📷',
    category: 'CONTRIBUTION',
  },
  {
    id: 'trivia_master',
    title: 'Genio Genealógico',
    description: 'Acertaste preguntas en la Trivia Familiar.',
    icon: '🧠',
    category: 'KNOWLEDGE',
  },
  {
    id: 'tree_ambassador',
    title: 'Embajador del Legado',
    description: 'Compartiste el enlace del árbol para que otros parientes lo vean.',
    icon: '🤝',
    category: 'SOCIAL',
  }
];

export const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, title: 'Explorador Novato', nextXp: 60 },
  { level: 2, minXp: 60, title: 'Curioso de las Raíces', nextXp: 150 },
  { level: 3, minXp: 150, title: 'Cronista Familiar', nextXp: 300 },
  { level: 4, minXp: 300, title: 'Guardián del Legado', nextXp: 500 },
  { level: 5, minXp: 500, title: 'Maestro Genealógico', nextXp: 1000 },
];

export function calculateLevel(xp: number): { level: number; levelTitle: string; nextLevelXp: number; progressPercent: number } {
  let current = LEVEL_THRESHOLDS[0];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) {
      current = LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const prevXp = current.minXp;
  const nextXp = current.nextXp;
  const range = nextXp - prevXp;
  const inLevelXp = xp - prevXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((inLevelXp / range) * 100)));

  return {
    level: current.level,
    levelTitle: current.title,
    nextLevelXp: current.nextXp,
    progressPercent
  };
}

export function getUserGamificationState(): UserGamificationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const levelInfo = calculateLevel(parsed.xp || 0);
      return {
        xp: parsed.xp || 0,
        level: levelInfo.level,
        levelTitle: levelInfo.levelTitle,
        nextLevelXp: levelInfo.nextLevelXp,
        unlockedBadgeIds: parsed.unlockedBadgeIds || [],
        completedQuestIds: parsed.completedQuestIds || [],
        exploredPersonIds: parsed.exploredPersonIds || [],
        exploredBranches: parsed.exploredBranches || [],
        triviaScore: parsed.triviaScore || 0,
      };
    }
  } catch (e) {
    console.warn('Error reading gamification state:', e);
  }

  const levelInfo = calculateLevel(0);
  return {
    xp: 0,
    level: levelInfo.level,
    levelTitle: levelInfo.levelTitle,
    nextLevelXp: levelInfo.nextLevelXp,
    unlockedBadgeIds: [],
    completedQuestIds: [],
    exploredPersonIds: [],
    exploredBranches: [],
    triviaScore: 0,
  };
}

export function saveUserGamificationState(state: UserGamificationState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Error saving gamification state:', e);
  }
}

export interface AwardResult {
  newState: UserGamificationState;
  newBadges: Badge[];
  xpGained: number;
}

export function awardXp(amount: number, badgeIdToUnlock?: BadgeId): AwardResult {
  const current = getUserGamificationState();
  const newXp = current.xp + amount;
  const newBadges: Badge[] = [];

  const unlockedSet = new Set(current.unlockedBadgeIds);

  if (badgeIdToUnlock && !unlockedSet.has(badgeIdToUnlock)) {
    unlockedSet.add(badgeIdToUnlock);
    const badge = ALL_BADGES.find(b => b.id === badgeIdToUnlock);
    if (badge) newBadges.push(badge);
  }

  const levelInfo = calculateLevel(newXp);

  const updated: UserGamificationState = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.levelTitle,
    nextLevelXp: levelInfo.nextLevelXp,
    unlockedBadgeIds: Array.from(unlockedSet),
  };

  saveUserGamificationState(updated);
  return {
    newState: updated,
    newBadges,
    xpGained: amount,
  };
}

export function recordExploredPerson(person: Person): AwardResult {
  const current = getUserGamificationState();
  const exploredPersons = new Set(current.exploredPersonIds);
  const exploredBranches = new Set(current.exploredBranches);

  let xpGain = 0;
  const newBadges: Badge[] = [];
  const unlockedBadges = new Set(current.unlockedBadgeIds);

  if (!exploredPersons.has(person.id)) {
    exploredPersons.add(person.id);
    xpGain += 8; // 8 XP for each newly discovered family member
  }

  if (person.branch && !exploredBranches.has(person.branch)) {
    exploredBranches.add(person.branch);
    xpGain += 15; // 15 XP for discovering a new branch
  }

  // Check Roots Seeker badge (Gen 0)
  if (person.generation === 0 && !unlockedBadges.has('roots_seeker')) {
    unlockedBadges.add('roots_seeker');
    xpGain += 25;
    const b = ALL_BADGES.find(x => x.id === 'roots_seeker');
    if (b) newBadges.push(b);
  }

  // Check Branch Explorer badge (>= 4 branches)
  if (exploredBranches.size >= 4 && !unlockedBadges.has('branch_explorer')) {
    unlockedBadges.add('branch_explorer');
    xpGain += 35;
    const b = ALL_BADGES.find(x => x.id === 'branch_explorer');
    if (b) newBadges.push(b);
  }

  const newXp = current.xp + xpGain;
  const levelInfo = calculateLevel(newXp);

  const updated: UserGamificationState = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.levelTitle,
    nextLevelXp: levelInfo.nextLevelXp,
    exploredPersonIds: Array.from(exploredPersons),
    exploredBranches: Array.from(exploredBranches),
    unlockedBadgeIds: Array.from(unlockedBadges),
  };

  saveUserGamificationState(updated);
  return { newState: updated, newBadges, xpGained: xpGain };
}

export function generateDailyQuests(): FamilyQuest[] {
  const state = getUserGamificationState();
  const quests: FamilyQuest[] = [
    {
      id: 'quest_id_identify',
      title: 'Identifícate en el Árbol',
      description: 'Ingresa tu nombre y parentesco para dejar tu huella familiar.',
      xpReward: 30,
      targetType: 'PERSON',
      isCompleted: state.unlockedBadgeIds.includes('first_steps'),
      actionLabel: 'Poner mi nombre',
    },
    {
      id: 'quest_ancestors',
      title: 'Conoce a tus Ancestros',
      description: 'Abre la ficha de Jacobo Chababo o Ema Trantemberg (Gen 0).',
      xpReward: 25,
      targetType: 'PERSON',
      targetId: 'jacobo-chababo',
      isCompleted: state.exploredPersonIds.includes('jacobo-chababo') || state.exploredPersonIds.includes('ema-trantemberg'),
      actionLabel: 'Ver Ancestros',
    },
    {
      id: 'quest_memory',
      title: 'Aporta una Anécdota',
      description: 'Escribe un recuerdo o hecho sobre cualquier integrante.',
      xpReward: 50,
      targetType: 'MEMORY',
      isCompleted: state.unlockedBadgeIds.includes('family_chronicler'),
      actionLabel: 'Escribir Recuerdo',
    },
    {
      id: 'quest_trivia',
      title: 'Desafío de Trivia',
      description: 'Demuestra cuánto sabes de tu historia jugando una ronda de trivia.',
      xpReward: 35,
      targetType: 'TRIVIA',
      isCompleted: state.triviaScore > 0,
      actionLabel: 'Jugar Trivia',
    }
  ];

  return quests;
}

// ─── Dynamic Trivia Generator based on Real Family Data ──────────
export function generateFamilyTrivia(persons: Person[], unions: FamilyUnion[], count = 5): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  // Question 1: Birthplace of Gen 0
  const jacobo = persons.find(p => p.id === 'jacobo-chababo');
  if (jacobo) {
    questions.push({
      id: 't_jacobo_origin',
      question: '¿En qué histórica ciudad nació Jacobo Chababo antes de emigrar a Argentina?',
      options: ['Jerusalén', 'Hamburgo', 'Rosario', 'Alepo'],
      correctIndex: 0,
      explanation: 'Jacobo Chababo nació en Jerusalén (hijo de Judá Chababo y Malea Levi) y contrajo matrimonio en Rosario en 1913.',
      personId: jacobo.id,
      branch: jacobo.branch
    });
  }

  // Question 2: Ema Trantemberg origin
  const ema = persons.find(p => p.id === 'ema-trantemberg');
  if (ema) {
    questions.push({
      id: 't_ema_origin',
      question: '¿De qué ciudad alemana era originaria la matriarca Ema Trantemberg?',
      options: ['Berlín', 'Hamburgo', 'Múnich', 'Frankfurt'],
      correctIndex: 1,
      explanation: 'Ema Trantemberg nació en Hamburgo, Alemania, hija de José Trantemberg y Rosa Esrique.',
      personId: ema.id,
      branch: ema.branch
    });
  }

  // Question 3: Rectification of surname
  questions.push({
    id: 't_surname_rectification',
    question: 'Según los registros civiles y la libreta de familia, ¿qué apellido fue rectificado judicialmente a Chababo?',
    options: ['Sida', 'Sabag', 'Chabane', 'Cohen'],
    correctIndex: 0,
    explanation: 'El apellido original asentado en la libreta familiar era "Sida", rectificado legalmente a "Chababo" ante el Juez Dr. Rossi.',
    branch: 'Chababo'
  });

  // Question 4: Branch identification of living / prominent member
  const leon = persons.find(p => p.name.toLowerCase().includes('león') || p.name.toLowerCase().includes('leon'));
  if (leon) {
    questions.push({
      id: 't_leon_branch',
      question: `¿A qué generación pertenece ${leon.name} en el linaje familiar?`,
      options: [`Generación ${leon.generation}`, `Generación ${leon.generation + 1}`, `Generación ${Math.max(0, leon.generation - 1)}`, `Generación ${leon.generation + 2}`],
      correctIndex: 0,
      explanation: `${leon.name} pertenece a la Generación ${leon.generation} de la rama ${leon.branch}.`,
      personId: leon.id,
      branch: leon.branch
    });
  }

  // Question 5: Total generations in the tree
  const maxGen = Math.max(...persons.map(p => p.generation || 0));
  questions.push({
    id: 't_generations_depth',
    question: '¿Cuántas generaciones completas de la familia están documentadas en este árbol genealógico?',
    options: [`${maxGen + 1} generaciones`, `${maxGen - 1} generaciones`, `${maxGen + 3} generaciones`, '2 generaciones'],
    correctIndex: 0,
    explanation: `El árbol documenta desde la Generación 0 (ancestros) hasta la Generación ${maxGen} (bisnietos/tataranietos).`
  });

  // Question 6: Random Marriage / Couple Match
  const sampleUnion = unions.find(u => u.partner1Id && u.partner2Id);
  if (sampleUnion) {
    const p1 = persons.find(p => p.id === sampleUnion.partner1Id);
    const p2 = persons.find(p => p.id === sampleUnion.partner2Id);
    if (p1 && p2) {
      // Find other opposite persons for distractors
      const distractors = persons.filter(p => p.id !== p2.id && p.id !== p1.id).slice(0, 3).map(p => p.name);
      if (distractors.length >= 3) {
        const options = [p2.name, distractors[0], distractors[1], distractors[2]].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(p2.name);
        questions.push({
          id: `t_union_${sampleUnion.id}`,
          question: `¿Quién es la pareja de ${p1.name} en el árbol familiar?`,
          options,
          correctIndex,
          explanation: `${p1.name} y ${p2.name} forman una de las uniones registradas en el árbol.`,
          personId: p1.id,
        });
      }
    }
  }

  // Question 7: Branches count
  const distinctBranches = Array.from(new Set(persons.map(p => p.branch).filter(Boolean)));
  questions.push({
    id: 't_branches_count',
    question: `¿Aproximadamente cuántas ramas y apellidos familiares convergen en este gran árbol?`,
    options: [`Más de ${Math.max(10, distinctBranches.length - 5)} familias`, 'Solo 2 familias', 'Exactamente 1 familia', '5 familias'],
    correctIndex: 0,
    explanation: `El árbol integra más de ${distinctBranches.length} ramas entrelazadas a través de matrimonios y descendencia.`
  });

  // Shuffle and pick requested count
  return questions.sort(() => 0.5 - Math.random()).slice(0, count);
}

export function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return 'Recientemente';
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return 'Hace unos segundos';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  
  return new Date(timestamp).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
  });
}
