export interface VisitorRecord {
  id: string;             // Typically personId or slugified name
  personId?: string;      // ID of person in the tree if linked
  name: string;
  role?: string;
  branch?: string;
  photoUrl?: string;
  firstSeen: string;
  lastSeen: string;
  lastSeenTimestamp: number;
  visitCount: number;
  xp?: number;
  level?: number;
  contributionsCount?: number;
}

export type BadgeId = 
  | 'first_steps'        // Se identificó en el árbol
  | 'branch_explorer'    // Exploró al menos 4 ramas
  | 'audio_listener'     // Escuchó un testimonio de audio
  | 'family_chronicler'  // Aportó un recuerdo o anécdota
  | 'roots_seeker'       // Descubrió a los ancestros de la Gen 0
  | 'wisdom_sharer'      // Sumó un valor o enseñanza
  | 'trivia_master'      // Acertó 5 preguntas en la trivia
  | 'photo_keeper'       // Subió una foto familiar
  | 'tree_ambassador';   // Compartió el árbol con la familia

export interface Badge {
  id: BadgeId;
  title: string;
  description: string;
  icon: string;
  category: 'EXPLORATION' | 'CONTRIBUTION' | 'KNOWLEDGE' | 'SOCIAL';
  unlockedAt?: string;
}

export interface FamilyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  targetType: 'PERSON' | 'BRANCH' | 'AUDIO' | 'MEMORY' | 'TRIVIA';
  targetId?: string;
  isCompleted: boolean;
  actionLabel: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  personId?: string;
  branch?: string;
}

export interface UserGamificationState {
  xp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  unlockedBadgeIds: BadgeId[];
  completedQuestIds: string[];
  exploredPersonIds: string[];
  exploredBranches: string[];
  triviaScore: number;
}
