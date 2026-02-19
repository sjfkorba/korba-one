import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://korba-one.vercel.app";

  /* =========================
     1. STATIC CORE PAGES
  ========================= */

  const staticRoutes = [
    { route: '', priority: 1 },
    { route: '/directory', priority: 0.9 },
    { route: '/mandi', priority: 0.9 },
    { route: '/emergency', priority: 0.9 },
    { route: '/register', priority: 0.8 },

    // Additional Pages
    { route: '/about', priority: 0.7 },
    { route: '/contact', priority: 0.7 },

    // Legal / Policy Pages
    { route: '/privacy-policy', priority: 0.5 },
    { route: '/terms-and-conditions', priority: 0.5 },
    { route: '/listing-policy', priority: 0.5 },
    { route: '/advertisement-policy', priority: 0.5 },
    { route: '/refund-policy', priority: 0.5 },

  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: item.priority,
  }));

  /* =========================
     2. DYNAMIC VERIFIED VENDORS
  ========================= */

  let vendorRoutes: MetadataRoute.Sitemap = [];

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
