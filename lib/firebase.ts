// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDltgEXGUhh8es-ogo34m8hnWwGtCOJCRs",
  authDomain: "korba-one.firebaseapp.com",
  projectId: "korba-one",
  storageBucket: "korba-one.firebasestorage.app",
  messagingSenderId: "777025556327",
  appId: "1:777025556327:web:fcf4cf71ba785d1fac29c2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
