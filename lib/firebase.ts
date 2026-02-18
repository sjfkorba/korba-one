"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDltgEXGUhh8es-ogo34m8hnWwGtCOJCRs",
  authDomain: "korba-one.firebaseapp.com",
  projectId: "korba-one",
  storageBucket: "korba-one.firebasestorage.app",
  messagingSenderId: "777025556327",
  appId: "1:777025556327:web:fcf4cf71ba785d1fac29c2"
};

// ✅ Singleton App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ✅ AUTO ANONYMOUS AUTH - Production Ready
let authListenerInitialized = false;

export async function initializeAuth() {
  if (authListenerInitialized) return;
  
  return new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try {
          console.log('🔐 Signing in anonymously...');
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Anonymous auth failed:', error);
        }
      } else {
        console.log('✅ Auth ready:', user.uid.slice(0, 8));
        authListenerInitialized = true;
        unsubscribe();
        resolve();
      }
    });
  });
}

export default app;
