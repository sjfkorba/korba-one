"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Trash2, Edit3, Plus, Save, 
  Loader2, ExternalLink, LayoutGrid, Zap,
  TrendingUp, Eye, MessageCircle, CheckCircle,
  Clock, AlertCircle, Share2, Copy, Check
} from "lucide-react";
import Link from "next/link";

export default function VendorPremiumAdmin() {
  const [profile, setProfile] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // 1. AUTH & DATA FETCHING
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/register"); 
        return;
      }
      
      try {
        const email = user.email!;
        const userSnap = await getDoc(doc(db, "users", email));
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setProfile(userData);

          // Fetch User's Listings
          const q = query(collection(db, "listings"), where("ownerEmail", "==", email));
          const listSnap = await getDocs(q);
          setListings(listSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          router.push("/setup-profile");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. COPY PROFILE LINK LOGIC
  const handleCopyLink = () => {
    const link = `${window.location.origin}/p/${profile?.username}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. PROFILE UPDATE LOGIC
  const handleUpdateProfile = async () => {
    if (!profile) return;
    setUpdating(true);
    try {
      await updateDoc(doc(db, "users", auth.currentUser?.email!), {
        displayName: profile.displayName,
        // Yahan aap aur bhi fields add kar sakte hain
      });
      alert("Shatrughan ji, Identity Update ho gayi hai!");
    } catch (e) {
      alert("Update failed. Rules check karein.");
    } finally {
      setUpdating(false);
    }
  };

  // 4. DELETE LISTING LOGIC
  const handleDeleteListing = async (id: string) => {
    if (window.confirm("Kya aap is ad ko delete karna chahte hain?")) {
      await deleteDoc(doc(db, "listings", id));
      setListings(prev => prev.filter(item => item.id !== id));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-orange-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 font-sans antialiased">
      
      {/* 🟢 PREMIUM STICKY NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black uppercase tracking-tighter">Korba One <span className="text-orange-600">Pro</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleCopyLink} className="p-3 text-slate-400 hover:text-orange-600 bg-slate-50 rounded-xl transition-all">
                {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18}/>}
             </button>
             <div className="h-8 w-px bg-slate-100 mx-2" />
             <div className="flex items-center gap-3 bg-white p-1 rounded-full border border-slate-100 shadow-sm pr-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
                   <img src={profile?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.username}`} alt="" />
                </div>
                <p className="text-[10px] font-black text-slate-900 leading-none truncate max-w-25">{profile?.displayName}</p>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        
        {/* 📊 ANALYTICS SECTION */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={<Eye className="text-blue-600"/>} label="Profile Views" value="1.2k" trend="+12%" />
          <StatCard icon={<MessageCircle className="text-emerald-600"/>} label="Total Leads" value={listings.length * 4} trend="+5%" />
          <StatCard icon={<LayoutGrid className="text-orange-600"/>} label="Ads Slots" value={`${listings.length}/15`} />
          <StatCard icon={<TrendingUp className="text-purple-600"/>} label="Status" value="Active" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 🛠️ LEFT SIDE: IDENTITY & SHARE */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 italic uppercase text-xs tracking-widest">Identity Settings</h3>
                <div className="flex gap-2">
                   <button onClick={handleUpdateProfile} className="text-emerald-600 p-2 hover:bg-emerald-50 rounded-xl transition-all">
                      {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                   </button>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Display Name</label>
                    <input 
                      value={profile?.displayName}
                      onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 ring-orange-500/5 transition-all"
                    />
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Your Public Brand</label>
                    <div className="bg-slate-950 p-5 rounded-3xl text-white relative group overflow-hidden">
                       <p className="text-[11px] font-medium text-slate-400 mb-1">Public Profile Link:</p>
                       <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-black truncate">korbaone.com/p/{profile?.username}</span>
                          <button onClick={handleCopyLink} className="text-orange-500 hover:scale-110 transition-transform">
                             {copied ? <Check size={16}/> : <Copy size={16}/>}
                          </button>
                       </div>
                    </div>
                    <Link href={`/p/${profile?.username}`} target="_blank" className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-orange-600 transition-all py-2">
                       View Live Profile <ExternalLink size={12} />
                    </Link>
                 </div>
              </div>
            </div>

            {/* UPGRADE WIDGET */}
            <div className="bg-orange-600 p-10 rounded-[45px] text-white shadow-2xl shadow-orange-600/20 relative overflow-hidden group">
               <Zap className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform" size={120} />
               <h4 className="text-2xl font-bold italic mb-2 tracking-tighter uppercase">Boost Listing.</h4>
               <p className="text-orange-100 text-[10px] font-bold leading-relaxed mb-6 uppercase tracking-wider">Top 3 spots mein aane ke liye premium plan lein.</p>
               <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Upgrade Account</button>
            </div>
          </div>

          {/* 📋 RIGHT SIDE: AD MANAGEMENT */}
          <div className="lg:col-span-2 space-y-10">
            <header className="flex justify-between items-center px-4">
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900 italic uppercase tracking-tighter">Your <span className="text-orange-600">Inventory.</span></h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{listings.length} / 15 Ads Live</p>
              </div>
              <Link href="/dashboard/new-listing">
                <button className="bg-slate-950 text-white p-5 rounded-[25px] hover:bg-orange-600 transition-all shadow-xl active:scale-95">
                  <Plus size={24} strokeWidth={3} />
                </button>
              </Link>
            </header>

            <div className="grid grid-cols-1 gap-5">
              {listings.map((item) => (
                <div key={item.id} className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-2xl hover:border-orange-500/10 transition-all duration-700">
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-20 h-20 bg-slate-50 rounded-[28px] overflow-hidden border border-slate-100 relative shadow-inner">
                      <img src={item.imageUrl || "https://via.placeholder.com/150"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    </div>
                    <div className="space-y-1 flex-1">
                       <h4 className="text-xl font-bold text-slate-950 tracking-tight leading-none">{item.title || item.shopName}</h4>
                       <div className="flex flex-wrap items-center gap-3 pt-2">
                          <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                          <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-l pl-3"><Clock size={10}/> 28 Days Left</span>
                          <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-l pl-3"><Eye size={10}/> 0 Views</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                      <Edit3 size={14}/> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteListing(item.id)}
                      className="p-4 text-slate-200 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {listings.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[60px] border-2 border-dashed border-slate-50">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <LayoutGrid size={32} className="text-slate-200" />
                   </div>
                   <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Aapki Inventory Khali Hai</p>
                   <Link href="/dashboard/new-listing" className="text-orange-600 font-black text-xs uppercase underline mt-4 inline-block">Post Your First Ad</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- SHARED COMPONENTS ---
function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl transition-all duration-500">
      <div className="flex justify-between items-start">
        <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
        {trend && <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{trend}</div>}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tighter italic">{value}</p>
      </div>
    </div>
  );
}