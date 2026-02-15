import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://korbaone.com';

  // 1. STATIC ROUTES (Jo hamesha rehte hain)
  const staticRoutes = [
    '',
    '/directory',
    '/mandi',
    '/emergency',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. DYNAMIC VENDOR ROUTES (Har shop ke liye unique URL)
  let vendorRoutes: any[] = [];
  
  try {
    const vendorsSnap = await getDocs(
      query(collection(db, "vendors"), where("isVerified", "==", true))
    );

    vendorRoutes = vendorsSnap.docs.map((doc) => ({
      url: `${baseUrl}/directory/${doc.id}`,
      lastModified: doc.data().createdAt?.toDate() || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap error:", error);
  }

  return [...staticRoutes, ...vendorRoutes];
}