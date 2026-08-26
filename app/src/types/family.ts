export type FactType = 'FACT' | 'OPINION' | 'CONTEXT' | 'ANECDOTA';

export interface FactItem {
  id: string;
  type: FactType;
  content: string;
  source?: string;
}

export interface CounterpointItem {
  id: string;
  topic: string;
  versionA: { author: string; text: string; date?: string };
  versionB: { author: string; text: string; date?: string };
  notes?: string;
}

export interface Person extends Record<string, unknown> {
  id: string;
  name: string;
  maidenName?: string;
  birthDate?: string;
  birthYear?: string;
  deathDate?: string;
  deathYear?: string;
  birthPlace?: string;
  photoUrl?: string;
  tags: string[];
  generation: number;
  branch: string;
  bioSummary?: string;
  facts?: FactItem[];
  counterpoints?: CounterpointItem[];
  valuesAndTeachings?: string[];
  audioRecordings?: { id: string; title: string; duration: string; audioUrl: string; transcript: string }[];
}

export interface FamilyUnion extends Record<string, unknown> {
  id: string;
  partner1Id: string;
  partner2Id?: string;
  unionType?: 'MARRIAGE' | 'PARTNERSHIP' | 'DIVORCED';
  childrenIds: string[];
  marriageYear?: string;
}

export interface MemoryPost {
  id: string;
  personId: string;
  personName: string;
  authorName: string;
  content: string;
  type: FactType;
  privacy: 'PUBLIC' | 'BRANCH' | 'DIRECT';
  createdAt: string;
  audioUrl?: string;
  tags?: string[];
  likes: number;
}
