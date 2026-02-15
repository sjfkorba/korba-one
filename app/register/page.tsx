"use client";
import { useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Search, MapPin, Camera, Loader2, ChevronDown } from "lucide-react";
import imageCompression from 'browser-image-compression';

// --- MASTER SEO LIBRARY & CATEGORIES ---
const MASTER_SEO_LIBRARY: any = {
  "Plumber": ["Emergency Repair", "Pipe Leakage Korba", "Water Tank Cleaning", "Toilet Fitting", "Best Plumber Raipur", "24/7 Service", "Taps Repair", "Bathroom Renovation", "Industrial Plumbing", "Leakage Detection"],
  "Electrician": ["Wiring", "Fan Repair", "Short Circuit Fix", "AC Installation", "House Wiring", "Electrician Korba", "Inverter Service", "CCTV Setup", "Smart Home", "Panel Board Repair"],
  "Mechanic": ["Car Service", "Bike Repair", "Engine Overhaul", "Tyre Change", "Brake Pad Replacement", "Oil Change Korba", "Roadside Assistance"],
  "Doctor": ["General Physician", "Child Specialist", "Skin Doctor", "Clinic Korba", "Dental Checkup", "Home Visit Doctor"],
  "Restaurant": ["Home Delivery", "Fine Dine", "Pure Veg Restaurant", "Biryani Special", "Family Cafe", "Catering Services"],
  // Nayi categories yahan asani se add kar sakte hain
};

const CATEGORIES = Object.keys(MASTER_SEO_LIBRARY);

export default function RegisterBusiness() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  const [businessData, setBusinessData] = useState({
    shopName: "", 
    category: "Plumber", // Default selection
    phone: "", 
    address: "", 
    lat: null as number | null, 
    lng: null as number | null, 
    imageUrl: ""
  });
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 1. Google Auth Integration
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setStep(2);
    } catch (error) { alert("Login failed. Please try again."); }
  };

  // 2. Location Detection
  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setBusinessData({ ...businessData, lat: pos.coords.latitude, lng: pos.coords.longitude });
        alert("Location captured! Mapping aapke address ke sath link ho gayi hai.");
      });
    }
  };

  // 3. Image Compression (<2MB Logic)
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
    try {
      const compressedFile = await imageCompression(file, options);
      const storageRef = ref(storage, `vendors/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, compressedFile);
      const url = await getDownloadURL(storageRef);
      setBusinessData({ ...businessData, imageUrl: url });
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // 4. Final Firebase Submission
  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const finalProfile = {
        uid: user.uid,
        ...businessData,
        keywords: selectedKeywords,
        isVerified: false,
        ownerEmail: user.email,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "vendors", user.uid), finalProfile);
      setStep(5);
    } catch (err) { alert("Submission failed."); }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Tracker */}
        <div className="flex justify-between mb-12 px-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: AUTHENTICATION */}
          {step === 1 && (
            <StepWrapper>
              <h2 className="text-4xl font-black tracking-tighter mb-4 italic">IDENTIFICATION.</h2>
              <p className="text-slate-500 mb-10 font-medium">Authentication se hamara platform safe rehta hai.</p>
              <button onClick={handleGoogleLogin} className="w-full py-5 bg-white border-2 border-slate-100 rounded-[24px] font-black flex items-center justify-center gap-4 hover:shadow-2xl transition-all group">
                <img src="https://www.google.com/favicon.ico" className="w-6 group-hover:scale-110 transition-transform" alt="G" /> 
                Continue with Google
              </button>
            </StepWrapper>
          )}

          {/* STEP 2: BUSINESS PROFILE (Category Selection Integrated) */}
          {step === 2 && (
            <StepWrapper>
              <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Business Details</h2>
              <div className="space-y-6">
                <InputBox label="Shop Name" placeholder="Korba One Services" onChange={(v: any) => setBusinessData({...businessData, shopName: v})} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Custom Category Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Business Category</label>
                    <div 
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center cursor-pointer font-bold text-slate-900"
                    >
                      {businessData.category} <ChevronDown size={20} className={`transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                    </div>
                    {showCategoryDropdown && (
                      <div className="absolute z-50 mt-2 w-full max-h-60 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden">
                        {CATEGORIES.map((cat) => (
                          <div 
                            key={cat} 
                            onClick={() => {
                              setBusinessData({...businessData, category: cat});
                              setShowCategoryDropdown(false);
                            }}
                            className="p-4 hover:bg-orange-50 hover:text-orange-600 cursor-pointer font-bold text-slate-700 transition-colors"
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <InputBox label="WhatsApp Number" placeholder="7974427353" onChange={(v: any) => setBusinessData({...businessData, phone: v})} />
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-orange-200 transition-colors">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Geo-Location (For Proximity Search)</p>
                  <button onClick={detectLocation} className="flex items-center gap-3 text-orange-600 font-black hover:scale-105 transition-transform">
                    <MapPin size={20} /> {businessData.lat ? "Precise Location Captured" : "Auto-Detect My Location"}
                  </button>
                </div>

                <button onClick={() => setStep(3)} className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:bg-orange-600 transition-all">
                  Next: Shop Photo <ChevronRight />
                </button>
              </div>
            </StepWrapper>
          )}

          {/* STEP 3: MEDIA UPLOAD (Skip Fix) */}
{step === 3 && (
  <StepWrapper>
    <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Profile Media</h2>
    <div className="flex flex-col items-center gap-8">
      {/* Photo Preview Container */}
      <div className="w-48 h-48 bg-slate-50 rounded-[60px] border-4 border-white shadow-2xl overflow-hidden relative">
        {businessData.imageUrl ? (
          <img src={businessData.imageUrl} className="w-full h-full object-cover" alt="Business Preview" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
             <Camera size={40} className="text-slate-300 mb-2" />
             <span className="text-[10px] font-black text-slate-300 uppercase">No Photo</span>
          </div>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imgUp" />
      
      {/* Upload Button */}
      <label htmlFor="imgUp" className="cursor-pointer bg-orange-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:shadow-orange-200 transition-all">
        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Upload Shop Photo"}
      </label>

      {/* Skip Button - Ab Ye Kaam Karega */}
      <button 
        type="button"
        onClick={() => setStep(4)} 
        className="text-slate-400 font-black uppercase text-xs tracking-widest hover:text-orange-600 transition-colors"
      >
        Skip for now
      </button>
    </div>
  </StepWrapper>
)}

          {step === 4 && (
            <StepWrapper>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">SEO Booster</h2>
                <span className="bg-orange-600 text-white px-4 py-1.5 rounded-xl text-xs font-black">{selectedKeywords.length}/50</span>
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase mb-4">Keywords for <span className="text-orange-600 underline">{businessData.category}</span></p>
              <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto p-4 bg-slate-50 rounded-3xl mb-8 custom-scrollbar">
                {MASTER_SEO_LIBRARY[businessData.category]?.map((kw: string) => (
                  <button 
                    key={kw} 
                    onClick={() => setSelectedKeywords(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw])}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all ${selectedKeywords.includes(kw) ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-white text-slate-500 border border-slate-100 hover:border-orange-500/30'}`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
              <button onClick={handleFinalSubmit} className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl hover:bg-green-600 transition-all">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify & Launch"}
              </button>
            </StepWrapper>
          )}

          {step === 5 && (
            <StepWrapper>
              <div className="text-center py-10 space-y-6">
                <CheckCircle2 size={100} className="text-green-500 mx-auto animate-bounce" />
                <h2 className="text-4xl font-black italic tracking-tighter">DATA SYNCED!</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Mubarak ho Shatrughan ji! Vendor ki profile **Firebase** mein secure ho gayi hai. Verification ke baad ye public search mein dikhegi.
                </p>
              </div>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- REUSABLE UI COMPONENTS ---
function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }} 
      className="bg-white p-8 md:p-14 rounded-[50px] shadow-2xl border border-white"
    >
      {children}
    </motion.div>
  );
}

function InputBox({ label, placeholder, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">{label}</label>
      <input 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-orange-500/10 font-bold transition-all text-slate-900" 
      />
    </div>
  );
}