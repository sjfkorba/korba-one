"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

interface Vendor {
  uid: string;
  name?: string;
  companyName?: string;
  role?: "buyer" | "seller";
}

export function useAuthVendor() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFirebaseUser(null);
        setVendor(null);
        setLoading(false);
        return;
      }

      setFirebaseUser(user);

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        const data = snap.data();

        setVendor({
          uid: user.uid,
          name: data.name || user.displayName || "",
          companyName: data.companyName || "",
          role: data.role || "buyer",
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { firebaseUser, vendor, loading };
}
