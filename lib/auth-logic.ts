// lib/auth-logic.ts
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function checkUserIdentity(email: string) {
  try {
    // Hum 'users' collection mein check kar rahe hain
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { hasProfile: true };
    }
    return { hasProfile: false };
  } catch (error) {
    console.error("Firestore Error:", error);
    throw error; // Isse main component ke catch block mein error jayega
  }
}