import { collection, onSnapshot, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import { db, storage, auth } from '../firebase';
import type { Person, FamilyUnion, MemoryPost, FactItem } from '../types/family';
import { INITIAL_PERSONS, INITIAL_UNIONS } from '../data/initialFamily';

const PERSONS_COLLECTION = 'persons';
const UNIONS_COLLECTION = 'unions';
const MEMORIES_COLLECTION = 'memories';

// Transparent background authentication so Firestore permissions succeed seamlessly
export async function initAnonymousAuth(): Promise<void> {
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  } catch (e) {
    console.warn('Firebase anonymous auth warning (running in offline/direct mode):', e);
  }
}

export function subscribeToPersons(onData: (persons: Person[]) => void): () => void {
  try {
    initAnonymousAuth();
    const colRef = collection(db, PERSONS_COLLECTION);
    
    // Seed initial data if collection is empty
    getDocs(colRef).then((snapshot) => {
      if (snapshot.empty) {
        INITIAL_PERSONS.forEach((p) => {
          setDoc(doc(db, PERSONS_COLLECTION, p.id), p).catch((e) => console.warn('Firestore seed warn:', e));
        });
      }
    }).catch((e) => console.warn('Firestore check warn:', e));

    return onSnapshot(colRef, 
      (snapshot) => {
        if (snapshot.empty) {
          onData(INITIAL_PERSONS);
        } else {
          const list: Person[] = [];
          snapshot.forEach((doc) => list.push(doc.data() as Person));
          onData(list);
        }
      },
      (error) => {
        console.warn('Firestore fallback to local initial persons:', error.message);
        onData(INITIAL_PERSONS);
      }
    );
  } catch (e) {
    console.warn('Firebase connection warning, using initial persons offline:', e);
    onData(INITIAL_PERSONS);
    return () => {};
  }
}

export function subscribeToUnions(onData: (unions: FamilyUnion[]) => void): () => void {
  try {
    const colRef = collection(db, UNIONS_COLLECTION);
    
    getDocs(colRef).then((snapshot) => {
      if (snapshot.empty) {
        INITIAL_UNIONS.forEach((u) => {
          setDoc(doc(db, UNIONS_COLLECTION, u.id), u).catch((e) => console.warn('Firestore seed warn:', e));
        });
      }
    }).catch((e) => console.warn('Firestore check warn:', e));

    return onSnapshot(colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onData(INITIAL_UNIONS);
        } else {
          const list: FamilyUnion[] = [];
          snapshot.forEach((doc) => list.push(doc.data() as FamilyUnion));
          onData(list);
        }
      },
      (error) => {
        console.warn('Firestore fallback to local initial unions:', error.message);
        onData(INITIAL_UNIONS);
      }
    );
  } catch (e) {
    console.warn('Firebase connection warning, using initial unions offline:', e);
    onData(INITIAL_UNIONS);
    return () => {};
  }
}

export function subscribeToMemories(onData: (memories: MemoryPost[]) => void): () => void {
  try {
    const colRef = collection(db, MEMORIES_COLLECTION);

    // Clean legacy example mock memories if they exist in Firestore
    deleteDoc(doc(db, MEMORIES_COLLECTION, 'mem-1')).catch(() => {});
    deleteDoc(doc(db, MEMORIES_COLLECTION, 'mem-2')).catch(() => {});

    return onSnapshot(colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onData([]);
        } else {
          const list: MemoryPost[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as MemoryPost;
            // Ignore legacy mock memories
            if (data.id !== 'mem-1' && data.id !== 'mem-2') {
              list.push(data);
            }
          });
          onData(list);
        }
      },
      (error) => {
        console.warn('Firestore fallback to local initial memories:', error.message);
        onData([]);
      }
    );
  } catch (e) {
    console.warn('Firebase connection warning, using initial memories offline:', e);
    onData([]);
    return () => {};
  }
}

export async function savePersonToCloud(person: Person): Promise<void> {
  try {
    await initAnonymousAuth();
    await setDoc(doc(db, PERSONS_COLLECTION, person.id), person);
  } catch (e) {
    console.error('Error saving person to Firestore:', e);
  }
}

export async function addFactToPerson(person: Person, fact: Omit<FactItem, 'id'>): Promise<Person> {
  const newFact: FactItem = {
    ...fact,
    id: `fact-${Date.now()}`
  };
  const updatedPerson: Person = {
    ...person,
    facts: [...(person.facts || []), newFact],
    lastEditedBy: fact.authorName,
    lastEditedAt: new Date().toLocaleDateString('es-AR')
  };
  await savePersonToCloud(updatedPerson);
  return updatedPerson;
}

export async function deleteFactFromPerson(person: Person, factId: string): Promise<Person> {
  const updatedPerson: Person = {
    ...person,
    facts: (person.facts || []).filter(f => f.id !== factId)
  };
  await savePersonToCloud(updatedPerson);
  return updatedPerson;
}

export async function addValueToPerson(person: Person, valueText: string, authorName: string): Promise<Person> {
  const updatedPerson: Person = {
    ...person,
    valuesAndTeachings: [...(person.valuesAndTeachings || []), valueText],
    lastEditedBy: authorName,
    lastEditedAt: new Date().toLocaleDateString('es-AR')
  };
  await savePersonToCloud(updatedPerson);
  return updatedPerson;
}

export async function deleteValueFromPerson(person: Person, valueIndex: number): Promise<Person> {
  const updatedPerson: Person = {
    ...person,
    valuesAndTeachings: (person.valuesAndTeachings || []).filter((_, idx) => idx !== valueIndex)
  };
  await savePersonToCloud(updatedPerson);
  return updatedPerson;
}

export async function saveUnionToCloud(union: FamilyUnion): Promise<void> {
  try {
    await initAnonymousAuth();
    await setDoc(doc(db, UNIONS_COLLECTION, union.id), union);
  } catch (e) {
    console.error('Error saving union to Firestore:', e);
  }
}

export async function saveMemoryToCloud(memory: MemoryPost): Promise<void> {
  try {
    await initAnonymousAuth();
    await setDoc(doc(db, MEMORIES_COLLECTION, memory.id), memory);
  } catch (e) {
    console.error('Error saving memory to Firestore:', e);
  }
}

export async function deleteMemoryFromCloud(memoryId: string): Promise<void> {
  try {
    await initAnonymousAuth();
    await deleteDoc(doc(db, MEMORIES_COLLECTION, memoryId));
  } catch (e) {
    console.error('Error deleting memory from Firestore:', e);
  }
}

export async function uploadFileToCloud(file: File, path: string): Promise<string> {
  try {
    await initAnonymousAuth();
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (e) {
    console.error('Error uploading file to Storage:', e);
    throw e;
  }
}

// ─── Realtime Family Visitors Tracking ────────────────────────────
export function subscribeToVisitors(onData: (visitors: VisitorRecord[]) => void): () => void {
  try {
    const colRef = collection(db, VISITORS_COLLECTION);

    getDocs(colRef).then((snapshot) => {
      if (snapshot.empty) {
        INITIAL_VISITORS.forEach((v) => {
          setDoc(doc(db, VISITORS_COLLECTION, v.id), v).catch((e) => console.warn('Firestore visitor seed warn:', e));
        });
      }
    }).catch((e) => console.warn('Firestore check visitors warn:', e));

    return onSnapshot(colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onData(INITIAL_VISITORS);
        } else {
          const list: VisitorRecord[] = [];
          snapshot.forEach((doc) => list.push(doc.data() as VisitorRecord));
          // Sort by latest seen
          list.sort((a, b) => (b.lastSeenTimestamp || 0) - (a.lastSeenTimestamp || 0));
          onData(list);
        }
      },
      (error) => {
        console.warn('Firestore fallback to local initial visitors:', error.message);
        onData(INITIAL_VISITORS);
      }
    );
  } catch (e) {
    console.warn('Firebase connection warning, using initial visitors offline:', e);
    onData(INITIAL_VISITORS);
    return () => {};
  }
}

export async function recordFamilyVisitor(
  visitor: {
    personId?: string;
    name: string;
    role?: string;
    branch?: string;
    photoUrl?: string;
    xp?: number;
    level?: number;
    contributionsCount?: number;
  }
): Promise<VisitorRecord> {
  const cleanName = visitor.name.trim();
  if (!cleanName) throw new Error('Name is required');

  const visitorId = visitor.personId 
    ? visitor.personId 
    : cleanName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-');

  const now = Date.now();
  const dateStr = new Date().toLocaleDateString('es-AR');

  const existing = INITIAL_VISITORS.find(v => v.id === visitorId);
  const previousVisitCount = existing ? existing.visitCount : 1;

  const record: VisitorRecord = {
    id: visitorId,
    personId: visitor.personId,
    name: cleanName,
    role: visitor.role || (existing?.role) || 'Miembro Familiar',
    branch: visitor.branch || existing?.branch || 'Familia',
    photoUrl: visitor.photoUrl || existing?.photoUrl,
    firstSeen: existing?.firstSeen || dateStr,
    lastSeen: 'Ahora mismo',
    lastSeenTimestamp: now,
    visitCount: previousVisitCount + 1,
    xp: visitor.xp ?? existing?.xp ?? 50,
    level: visitor.level ?? existing?.level ?? 1,
    contributionsCount: visitor.contributionsCount ?? existing?.contributionsCount ?? 0,
  };

  try {
    await initAnonymousAuth();
    await setDoc(doc(db, VISITORS_COLLECTION, visitorId), record, { merge: true });
  } catch (e) {
    console.warn('Could not save visitor to cloud (offline fallback):', e);
  }

  return record;
}

