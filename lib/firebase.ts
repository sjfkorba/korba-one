import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDltgEXGUhh8es-ogo34m8hnWwGtCOJCRs",
  authDomain: "korba-one.firebaseapp.com",
  projectId: "korba-one",
  storageBucket: "korba-one.firebasestorage.app",
  messagingSenderId: "777025556327",
  appId: "1:777025556327:web:fcf4cf71ba785d1fac29c2"

};

// Singleton pattern: Taaki har reload par naya app initialize na ho
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };