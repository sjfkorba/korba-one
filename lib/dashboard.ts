import { db } from "./firebase"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

/* ======================================================
   📦 TYPES
====================================================== */

export type SellerListing = {
  id: string
  title: string
  views: number
  contacts: number
  expiryDate: Timestamp | null
  status: "active" | "expired"
}

export type SellerStats = {
  listings: number
  offers: number
  contacts: number
  views: number
}

export type AnalyticsPoint = {
  date: string
  views: number
}

export type PublicJob = {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary?: string
  featured?: boolean
  postedAt?: string
}

/* ======================================================
   📊 SELLER STATS
====================================================== */

export async function getSellerStats(
  userId: string
): Promise<SellerStats> {
  const listingsQ = query(
    collection(db, "listings"),
    where("ownerId", "==", userId)
  )

  const offersQ = query(
    collection(db, "offers"),
    where("ownerId", "==", userId)
  )

  const contactsQ = query(
    collection(db, "contacts"),
    where("sellerId", "==", userId)
  )

  const viewsQ = query(
    collection(db, "profileViews"),
    where("sellerId", "==", userId)
  )

  const [listingsSnap, offersSnap, contactsSnap, viewsSnap] =
    await Promise.all([
      getDocs(listingsQ),
      getDocs(offersQ),
      getDocs(contactsQ),
      getDocs(viewsQ),
    ])

  let totalViews = 0
  viewsSnap.forEach((doc) => {
    totalViews += doc.data().views || 0
  })

  return {
    listings: listingsSnap.size,
    offers: offersSnap.size,
    contacts: contactsSnap.size,
    views: totalViews,
  }
}

/* ======================================================
   📦 GET SELLER LISTINGS
====================================================== */

export async function getSellerListings(userId: string) {
  try {
    const q = query(
      collection(db, "listings"),
      where("ownerId", "==", userId)
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data()

      return {
        id: docSnap.id,
        title: data.title ?? "",
        views: data.views ?? 0,
        contacts: data.contacts ?? 0,
        expiryDate: data.expiryDate ?? null,
        status: data.status ?? "active",
      }
    })
  } catch (error) {
    console.error("Listing fetch error:", error)
    return []
  }
}

/* ======================================================
   ➕ CREATE LISTING (30 Days Expiry)
====================================================== */

export async function createListing(userId: string, data: any) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  // 🔥 Fetch seller data once
  const sellerRef = doc(db, "users", userId);
  const sellerSnap = await getDoc(sellerRef);

  let companyName = "Company";
  let companySlug = userId;

  if (sellerSnap.exists()) {
    const sellerData = sellerSnap.data();
    companyName = sellerData.companyName || "Company";
    companySlug = sellerData.slug || userId;
  }

  return await addDoc(collection(db, "listings"), {
    ...data,

    ownerId: userId,

    // 🔥 Snapshot fields
    companyName,
    companySlug,

    createdAt: serverTimestamp(),
    expiryDate: Timestamp.fromDate(expiryDate),
    status: "active",
    views: 0,
    contacts: 0,
  });
}

/* ======================================================
   📅 MONTHLY 15 LISTING LIMIT
====================================================== */

export async function checkMonthlyListingLimit(userId: string) {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const q = query(
    collection(db, "listings"),
    where("ownerId", "==", userId),
    where("createdAt", ">=", Timestamp.fromDate(startOfMonth))
  )

  const snapshot = await getDocs(q)

  const used = snapshot.size

  return {
    used,
    remaining: 15 - used,
    limitReached: used >= 15,
  }
}

/* ======================================================
   💼 GET LATEST JOBS (Landing Page)
====================================================== */

export async function getLatestJobs(): Promise<PublicJob[]> {
  const now = new Date()

  const q = query(
    collection(db, "listings"),
    where("type", "==", "job"),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  const jobs: PublicJob[] = []

  snapshot.forEach((docSnap) => {
    const data = docSnap.data()

    const expiryDate = data.expiryDate?.toDate?.()
    if (expiryDate && expiryDate < now) return

    jobs.push({
      id: docSnap.id,
      title: data.title || "Untitled Job",
      company: data.meta?.companyName || "Company",
      location: data.location || "Korba",
      type: data.meta?.jobType || "Full Time",
      salary: data.meta?.salaryRange || "",
      featured: data.featured || false,
      postedAt: formatDaysAgo(data.createdAt),
    })
  })

  return jobs.slice(0, 4)
}

function formatDaysAgo(timestamp: any) {
  if (!timestamp?.toDate) return ""

  const created = timestamp.toDate()
  const now = new Date()

  const diff = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diff === 0) return "Today"
  if (diff === 1) return "1 day ago"
  return `${diff} days ago`
}

/* ======================================================
   🔎 GET JOB BY ID (FINAL ARCHITECTURE)
====================================================== */

export async function getJobById(id: string) {
  const docRef = doc(db, "listings", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  // 🔥 Fetch Vendor using ownerId
  let companySlug = "";
  let companyName = "Company";

  if (data.ownerId) {
    const vendorRef = doc(db, "vendors", data.ownerId);
    const vendorSnap = await getDoc(vendorRef);

    if (vendorSnap.exists()) {
      const vendorData = vendorSnap.data();
      companySlug = vendorData.slug || "";
      companyName = vendorData.companyName || companyName;
    }
  }

  return {
    id: snapshot.id,
    title: data.title,
    company: companyName,
    companySlug,
    location: data.location || "Korba",
    type: data.meta?.jobType || "Full Time",
    salary: data.meta?.salaryRange || "",
    description: data.description || "",
    responsibilities: data.meta?.responsibilities || [],
    requirements: data.meta?.requirements || [],
    postedOn: data.createdAt?.toDate
      ? data.createdAt.toDate().toDateString()
      : "",
    whatsapp: data.meta?.whatsapp || "",
    status: data.status,
  };
}

export async function incrementJobView(id: string) {
  const ref = doc(db, "listings", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  await updateDoc(ref, {
    views: (snap.data().views || 0) + 1,
  });
}

export async function incrementJobContact(id: string) {
  const ref = doc(db, "listings", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  await updateDoc(ref, {
    contacts: (snap.data().contacts || 0) + 1,
  });
}

/* ======================================================
   🏪 GET SHOP BY SLUG
====================================================== */

export async function getShopBySlug(slug: string) {
  const q = query(
    collection(db, "vendors"),
    where("slug", "==", slug),
    where("status", "==", "active")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  const data = docSnap.data();

  return {
    id: docSnap.id,
    ownerId: data.uid,
    name: data.companyName,
    category: data.category?.[0] || "Business",
    location: data.address,
    phone: data.phone,
    description: data.description || "",
  };
}

export async function getVendorListings(ownerId: string) {
  const q = query(
    collection(db, "listings"),
    where("ownerId", "==", ownerId),
    where("status", "==", "active")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ======================================================
   ⭐ GET VENDOR REVIEWS
====================================================== */

export async function getVendorReviews(vendorId: string) {
  const q = query(
    collection(db, "reviews"),
    where("vendorId", "==", vendorId)
  );

  const snapshot = await getDocs(q);

  let totalRating = 0;

  const reviews = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    totalRating += Number(data.rating) || 0;

    return {
      id: docSnap.id,
      userName: data.userName || "User",
      rating: Number(data.rating) || 0,
      comment: data.comment || "",
    };
  });

  const total = reviews.length;

  const average =
    total > 0 ? Number((totalRating / total).toFixed(1)) : 0;

  return {
    average, // ✅ ALWAYS number
    total,
    reviews,
  };
}

/* ======================================================
   ✍️ ADD REVIEW
====================================================== */

export async function addVendorReview({
  vendorId,
  userId,
  userName,
  rating,
  comment,
}: {
  vendorId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}) {
  // 🔒 Check if user already reviewed
  const q = query(
    collection(db, "reviews"),
    where("vendorId", "==", vendorId),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("You have already reviewed this shop.");
  }

  await addDoc(collection(db, "reviews"), {
    vendorId,
    userId,
    userName,
    rating,
    comment,
    createdAt: serverTimestamp(),
  });
}

/* ======================================================
   🏪 GET FEATURED / LATEST SHOPS
====================================================== */

export type PublicShop = {
  id: string;
  name: string;
  category: string;
  location: string;
  slug: string;
};

export async function getLatestShops(): Promise<PublicShop[]> {
  const q = query(
    collection(db, "vendors"),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    name: docSnap.data().companyName || "Shop",
    category: docSnap.data().category || "Business",
    location: docSnap.data().address || "Korba",
    slug: docSnap.data().slug || docSnap.id,
  }));
}

export async function getAnalyticsData(
  userId: string
): Promise<AnalyticsPoint[]> {
  const q = query(
    collection(db, "profileViews"),
    where("sellerId", "==", userId),
    orderBy("createdAt", "asc")
  )

  const snapshot = await getDocs(q)

  const data: AnalyticsPoint[] = []

  snapshot.forEach((docSnap) => {
    const docData = docSnap.data()

    if (!docData.createdAt?.toDate) return

    const date = docData.createdAt
      .toDate()
      .toISOString()
      .split("T")[0]

    data.push({
      date,
      views: docData.views || 0,
    })
  })

  return data
}