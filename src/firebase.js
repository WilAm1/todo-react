import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
