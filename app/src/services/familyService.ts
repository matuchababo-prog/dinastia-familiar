import { collection, onSnapshot, setDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import type { Person, FamilyUnion, MemoryPost } from '../types/family';
import { INITIAL_PERSONS, INITIAL_UNIONS, INITIAL_MEMORIES } from '../data/initialFamily';

const PERSONS_COLLECTION = 'persons';
const UNIONS_COLLECTION = 'unions';
const MEMORIES_COLLECTION = 'memories';

export function subscribeToPersons(onData: (persons: Person[]) => void): () => void {
  try {
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

    getDocs(colRef).then((snapshot) => {
      if (snapshot.empty) {
        INITIAL_MEMORIES.forEach((m) => {
          setDoc(doc(db, MEMORIES_COLLECTION, m.id), m).catch((e) => console.warn('Firestore seed warn:', e));
        });
      }
    }).catch((e) => console.warn('Firestore check warn:', e));

    return onSnapshot(colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onData(INITIAL_MEMORIES);
        } else {
          const list: MemoryPost[] = [];
          snapshot.forEach((doc) => list.push(doc.data() as MemoryPost));
          onData(list);
        }
      },
      (error) => {
        console.warn('Firestore fallback to local initial memories:', error.message);
        onData(INITIAL_MEMORIES);
      }
    );
  } catch (e) {
    console.warn('Firebase connection warning, using initial memories offline:', e);
    onData(INITIAL_MEMORIES);
    return () => {};
  }
}

export async function savePersonToCloud(person: Person): Promise<void> {
  try {
    await setDoc(doc(db, PERSONS_COLLECTION, person.id), person);
  } catch (e) {
    console.error('Error saving person to Firestore:', e);
  }
}

export async function saveUnionToCloud(union: FamilyUnion): Promise<void> {
  try {
    await setDoc(doc(db, UNIONS_COLLECTION, union.id), union);
  } catch (e) {
    console.error('Error saving union to Firestore:', e);
  }
}

export async function saveMemoryToCloud(memory: MemoryPost): Promise<void> {
  try {
    await setDoc(doc(db, MEMORIES_COLLECTION, memory.id), memory);
  } catch (e) {
    console.error('Error saving memory to Firestore:', e);
  }
}

export async function uploadFileToCloud(file: File, path: string): Promise<string> {
  try {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (e) {
    console.error('Error uploading file to Storage:', e);
    throw e;
  }
}
