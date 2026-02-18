"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase"; // ✅ auth added
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot,
   deleteDoc, // ✅ added
  doc,       // ✅ added
} from "firebase/firestore";
import { useParams } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Star,
  ShieldCheck,
  MapPin,
  Loader2,
  PackageSearch,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Vendor {
  displayName: string;
  username: string;
  photoURL?: string;
  phone?: string;
  email: string;
  uid?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
}

interface Listing {
  id: string;
  title: string;
  imageUrl?: string;
  price?: string;
  slug?: string;
}

interface Review {
  id: string;
  comment: string;
  rating: number;
  author: string;
}

export default function VendorProfile() {
  const params = useParams();
  const username =
    typeof params?.username === "string"
      ? params.username.toLowerCase()
      : "";

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"showcase" | "reviews">("showcase");

  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const userQ = query(
          collection(db, "users"),
          where("username", "==", username),
          limit(1)
        );

        const userSnap = await getDocs(userQ);
        if (userSnap.empty) return;
        const docData = userSnap.docs[0]
        const vendorData = userSnap.docs[0].data() as Vendor;

        setVendor({
          ...vendorData,
          uid: docData.id,
          rating: 0,
          reviewCount: 0,
          verified: vendorData.verified !== false,
        });

        const listQ = query(
          collection(db, "listings"),
          where("ownerEmail", "==", vendorData.email),
          where("isActive", "==", true),
          limit(12)
        );

        const listSnap = await getDocs(listQ);

        setListings(
          listSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Listing[]
        );

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  /* ================= REALTIME REVIEWS ================= */

  useEffect(() => {
    if (!username) return;

    const revQ = query(
      collection(db, "reviews"),
      where("vendorUsername", "==", username),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(revQ, (snapshot) => {
      const reviewData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];

      setReviews(reviewData);

      if (reviewData.length > 0) {
        const avg =
          reviewData.reduce((acc, r) => acc + r.rating, 0) /
          reviewData.length;

        setVendor((prev) =>
          prev
            ? {
                ...prev,
                rating: Number(avg.toFixed(1)),
                reviewCount: reviewData.length,
              }
            : prev
        );
      }
    });

    return () => unsubscribe();
  }, [username]);

   /* ================= REALTIME LIKES ================= */

  useEffect(() => {
    if (!username) return;

    const qLikes = query(
      collection(db, "likes"),
      where("vendorUsername", "==", username)
    );

    const unsubscribe = onSnapshot(qLikes, (snapshot) => {
      setLikesCount(snapshot.size);

      const user = auth.currentUser;
      if (user) {
        const found = snapshot.docs.find(
          (doc) => doc.data().userId === user.uid
        );
        setIsLiked(!!found);
      }
    });

    return () => unsubscribe();
  }, [username]);

  /* ================= TOGGLE LIKE ================= */

  const toggleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Login required");
      return;
    }

    const qCheck = query(
      collection(db, "likes"),
      where("vendorUsername", "==", username),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(qCheck);

    if (!snap.empty) {
      await deleteDoc(doc(db, "likes", snap.docs[0].id));
    } else {
      await addDoc(collection(db, "likes"), {
        vendorUsername: username,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    }
  };

  /* ================= SUBMIT REVIEW ================= */

  const submitReview = async () => {
    if (!authorName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!newComment.trim()) {
      setErrorMsg("Please write a comment.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg("");

      await addDoc(collection(db, "reviews"), {
        vendorUsername: username,
        rating: newRating,
        comment: newComment,
        author: authorName.trim(),
        createdAt: serverTimestamp(),
      });

      setNewComment("");
      setNewRating(5);
      setAuthorName("");

    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };



  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
      </main>
    );
  }

  if (!vendor) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center bg-slate-50">
        <Users className="mx-auto mb-4 text-gray-300" size={60} />
        <h1 className="text-2xl font-bold">Vendor Not Found</h1>
      </main>
    );
  }

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">

          <img
            src={
              vendor.photoURL ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${vendor.username}`
            }
            className="w-28 h-28 rounded-3xl object-cover border-4 border-white/20"
            alt={vendor.displayName}
          />

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2 justify-center md:justify-start">
              <ShieldCheck size={16} /> Verified Vendor
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              {vendor.displayName}
            </h1>

            <div className="flex items-center gap-4 text-sm mt-3 justify-center md:justify-start">
              <span className="flex items-center gap-1 text-orange-400 font-medium">
                <Star size={14} fill="currentColor" />
                {vendor.rating} ({vendor.reviewCount})
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin size={14} /> Korba, CG
              </span>
              <span>
                <div className="mt-4">
              <button
                onClick={toggleLike}
                className="bg-white text-slate-900 px-6 py-2 rounded-full font-semibold"
              >
                {isLiked ? "Liked" : "Like"} ({likesCount})
              </button>
            </div>
              </span>
            </div>
          </div>
        </div>
        

      </section>


      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14">

        {/* TABS */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setActiveTab("showcase")}
            className={`px-6 py-3 rounded-full font-semibold ${
              activeTab === "showcase"
                ? "bg-orange-600 text-white"
                : "bg-white border"
            }`}
          >
            Showcase
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 rounded-full font-semibold ${
              activeTab === "reviews"
                ? "bg-orange-600 text-white"
                : "bg-white border"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* SHOWCASE */}
        {activeTab === "showcase" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400">
                <PackageSearch size={50} className="mx-auto mb-4" />
                No Active Listings
              </div>
            )}

            {listings.map((listing) =>
              listing.slug ? (
                <motion.div
                  key={listing.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition"
                >
                  <img
                    src={listing.imageUrl || "https://via.placeholder.com/800x600"}
                    alt={listing.title}
                    className="h-48 w-full object-cover rounded-t-2xl"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-orange-600 font-bold mt-2 mb-4">
                      ₹{listing.price || "Ask"}
                    </p>
                    <Link
                      href={`/p/${username}/ad/${listing.slug}`}
                      className="text-sm font-semibold flex items-center gap-1 hover:text-orange-600"
                    >
                      View Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div>

            {/* WRITE REVIEW */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10">
              <h3 className="font-semibold mb-4">Write a Review</h3>

              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your Name *"
                className="w-full border rounded-xl p-4 text-sm mb-4 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setNewRating(star)}>
                    <Star
                      size={24}
                      fill={star <= newRating ? "orange" : "none"}
                      className={
                        star <= newRating
                          ? "text-orange-500"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                rows={4}
              />

              {errorMsg && (
                <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
              )}

              <button
                onClick={submitReview}
                disabled={submitting}
                className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>

            {/* REVIEW LIST */}
            <div className="space-y-6">
              {reviews.length === 0 && (
                <div className="text-gray-400 text-center py-10">
                  No Reviews Yet
                </div>
              )}

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{review.author}</span>
                    <div className="flex text-orange-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </section>

      {/* CONTACT */}
      <section className="bg-white border-t py-14 text-center">
        <h3 className="text-xl font-semibold mb-6">
          Connect with {vendor.displayName}
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {vendor.phone && (
            <a
              href={`tel:${vendor.phone}`}
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Call Now
            </a>
          )}

          {vendor.phone && (
            <a
              href={`https://wa.me/91${vendor.phone}`}
              className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition"
            >
              WhatsApp
            </a>
          )}
        </div>
      </section>

    </main>
  );
}
