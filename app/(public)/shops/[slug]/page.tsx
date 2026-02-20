"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getShopBySlug,
  getVendorListings,
  getVendorReviews,
  addVendorReview,
} from "@/lib/dashboard";
import {
  MapPin,
  Phone,
  Star,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

type ReviewType = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
};

type ReviewsState = {
  average: number;
  total: number;
  reviews: ReviewType[];
};

export default function ShopPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [shop, setShop] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [reviewsData, setReviewsData] = useState<ReviewsState>({
    average: 0,
    total: 0,
    reviews: [],
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  /* ===============================
     🔐 AUTH CHECK
  =============================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  /* ===============================
     📦 FETCH SHOP DATA
  =============================== */
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const shopData = await getShopBySlug(slug);

        if (!shopData) {
          setShop(null);
          setLoading(false);
          return;
        }

        setShop(shopData);

        const [vendorListings, reviews] = await Promise.all([
          getVendorListings(shopData.ownerId),
          getVendorReviews(shopData.id),
        ]);

        setListings(vendorListings || []);

        setReviewsData(
          reviews || { average: 0, total: 0, reviews: [] }
        );
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  /* ===============================
     📲 WHATSAPP CONTACT
  =============================== */
  const handleWhatsAppContact = () => {
    if (!shop?.phone) return;

    const cleanNumber = shop.phone.replace(/\D/g, "");

    const message = `Hello 👋

I found your shop "${shop.name}" on KorbaOne and would like to know more.

Thank you.`;

    window.open(
      `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  /* ===============================
     ⭐ SUBMIT REVIEW
  =============================== */
  const handleSubmitReview = async () => {
  if (!comment.trim()) return;

  if (!currentUser) {
    setShowLoginModal(true);
    return;
  }

  // 🛡 Prevent Self Review
  if (currentUser.uid === shop.ownerId) {
    alert("You cannot review your own shop.");
    return;
  }

  setSubmitting(true);

  try {
    await addVendorReview({
      vendorId: shop.id,
      userId: currentUser.uid,
      userName: currentUser.displayName || "User",
      rating,
      comment,
    });

    const updatedReviews = await getVendorReviews(shop.id);
    setReviewsData(updatedReviews);

    setComment("");
    setRating(5);
  } catch (error: any) {
    alert(error.message);
  }

  setSubmitting(false);
};

  /* ===============================
     ⏳ LOADING STATE
  =============================== */
  if (loading)
    return (
      <div className="section-padding text-center text-white">
        Loading shop...
      </div>
    );

  if (!shop)
    return (
      <div className="section-padding text-center text-white">
        Shop not found.
      </div>
    );

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <div className="h-80 bg-gradient-to-br from-orange-600/30 via-black to-slate-900" />

          <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10">

            <span className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-xs">
              {shop.category}
            </span>

            <h1 className="text-4xl font-black mt-4 text-white">
              {shop.name}
            </h1>

            <div className="flex items-center gap-3 mt-4 text-sm text-white/70">
              <Star size={14} className="text-orange-500" />
              <span>
                {reviewsData.average.toFixed(1)} Rating
              </span>
              <span className="text-white/50">
                ({reviewsData.total} reviews)
              </span>

              <MapPin size={14} />
              <span>{shop.location}</span>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleWhatsAppContact}
                className="btn-primary flex items-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>

              <button className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-xl flex items-center gap-2">
                <Phone size={16} />
                {shop.phone}
              </button>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="card-premium">
          <h2 className="text-xl font-bold text-orange-500 mb-4">
            About This Business
          </h2>
          <p className="text-white/70 whitespace-pre-line">
            {shop.description}
          </p>
        </div>

        {/* LIVE LISTINGS */}
        <div>
  <h2 className="text-2xl font-bold text-white mb-6">
    Live Listings
  </h2>

  {listings.length === 0 ? (
    <div className="text-white/60">
      No active listings.
    </div>
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      {listings.map((item) => {
        const postedDate =
          item.createdAt?.toDate
            ? item.createdAt.toDate().toLocaleDateString()
            : "Recently";

        return (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="card-premium p-6 flex flex-col justify-between"
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full text-xs">
                {item.category || "General"}
              </span>

              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                {item.status || "Active"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-snug">
              {item.title}
            </h3>

            {/* Type */}
            <p className="text-sm text-white/60 mt-2">
              {item.type}
            </p>

            {/* Posted Date */}
            <p className="text-xs text-white/40 mt-4">
              Posted on {postedDate}
            </p>

            {/* Action */}
            <a
              href={`/${item.type}s/${item.slug || item.id}`}
              className="mt-6 inline-block text-sm text-orange-500 hover:underline"
            >
              View Details →
            </a>
          </motion.div>
        );
      })}
    </div>
  )}
</div>

        {/* REVIEWS */}
        <div className="card-premium">
          <h2 className="text-xl font-bold text-orange-500 mb-6">
            Reviews & Ratings
          </h2>

          <div className="mb-6">
            <p className="text-3xl font-bold text-white">
              {reviewsData.average.toFixed(1)}
            </p>
            <p className="text-white/60">
              Based on {reviewsData.total} reviews
            </p>
          </div>

          <div className="space-y-6">
            {reviewsData.reviews.map((r) => (
              <div key={r.id} className="border-b border-white/10 pb-4">
                <div className="flex justify-between text-sm text-white/60">
                  <span>{r.userName}</span>
                  <span>{r.rating} ⭐</span>
                </div>
                <p className="text-white/70 mt-2">{r.comment}</p>
              </div>
            ))}
          </div>

          {/* WRITE REVIEW */}

          {currentUser?.uid !== shop.ownerId && (
  <div className="mt-10 border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-4">
              Write a Review
            </h3>

            {/* STAR RATING */}
<div className="flex gap-2 text-orange-500 text-2xl">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      type="button"
      onClick={() => setRating(star)}
      className="transition transform hover:scale-110"
    >
      {star <= rating ? "★" : "☆"}
    </button>
  ))}
</div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience..."
              className="w-full mt-4 bg-black border border-white/10 rounded p-3 text-white"
            />

            <button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="btn-primary mt-4"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
)}
          
          
        </div>

      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 w-[400px] text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Login Required
            </h3>
            <p className="text-white/60 mb-6">
              You must login to submit a review.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="btn-primary w-full"
            >
              Login Now
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-white/50 hover:text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}