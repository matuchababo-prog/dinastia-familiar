import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMrHwNDjkmckjcboVJKO_smAHplZwXws4",
  authDomain: "raices-y-rumbos-2026.firebaseapp.com",
  projectId: "raices-y-rumbos-2026",
  storageBucket: "raices-y-rumbos-2026.firebasestorage.app",
  messagingSenderId: "1096276385965",
  appId: "1:1096276385965:web:4f8869e7d149678291a624"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
