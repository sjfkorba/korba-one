import { db } from "@/lib/firebase"; // Isse hamesha sahi path milega
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getVendorsByCategory(category: string) {
  try {
    const q = query(
      collection(db, "vendors"),
      // Hum ensure kar rahe hain ki isVerified true ho taki sirf verified log dikhein
      where("category", "==", category.toLowerCase()),
      where("isVerified", "==", true) 
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
}