"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { 
  collection, query, onSnapshot, orderBy, limit,
  doc, updateDoc, deleteDoc, addDoc, serverTimestamp 
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, TrendingUp, LayoutDashboard, Store, Sprout, 
  Megaphone, LogOut, Loader2, Search, Trash2, Plus, 
  ArrowUpRight, Tag, MapPin, Edit3, X, Save, 
  PhoneCall, MessageSquare, MousePointer2, Globe
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // --- STATE REPOSITORY ---
  const [vendors, setVendors] = useState<any[]>([]);
  const [mandiRates, setMandiRates] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [searchLogs, setSearchLogs] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, liveMandi: 0, totalLeads: 0 });

  // --- REAL-TIME ENGINE ---
  useEffect(() => {
    setLoading(true);
    
    // 1. Vendors & Stats Sync
    const unsubVendors = onSnapshot(query(collection(db, "vendors"), orderBy("createdAt", "desc")), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setVendors(data);
      setStats(s => ({ ...s, total: data.length, pending: data.filter((v:any) => !v.isVerified).length }));
    });

    // 2. Mandi Rates (CRUD Enabled)
    const unsubMandi = onSnapshot(query(collection(db, "mandi_rates"), orderBy("updatedAt", "desc")), (snap) => {
      setMandiRates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setStats(s => ({ ...s, liveMandi: snap.docs.length }));
    });

    // 3. Ad Manager Sync
    const unsubAds = onSnapshot(query(collection(db, "advertisements"), orderBy("createdAt", "desc")), (snap) => {
      setAds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 4. Intelligence & Leads (Search Console Integration)
    const unsubSearch = onSnapshot(query(collection(db, "search_logs"), orderBy("timestamp", "desc"), limit(30)), (snap) => {
      setSearchLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubLeads = onSnapshot(query(collection(db, "leads"), orderBy("timestamp", "desc"), limit(30)), (snap) => {
      const leadData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLeads(leadData);
      setStats(s => ({ ...s, totalLeads: leadData.length }));
      setLoading(false);
    });

    return () => { unsubVendors(); unsubMandi(); unsubAds(); unsubSearch(); unsubLeads(); };
  }, []);

  const handleLogout = async () => { await signOut(auth); router.push("/admin/login"); };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white font-sans">
      <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
      <p className="font-black tracking-[0.3em] uppercase text-[10px]">Korba One Command Center Loading...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-80 bg-slate-950 text-white p-10 flex-col hidden lg:flex sticky top-0 h-screen shadow-2xl">
        <div className="mb-16">
           <h2 className="text-3xl font-black tracking-tighter italic text-orange-500">K1 PANEL</h2>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 italic">Admin: Shatrughan Sharma</p>
        </div>
        <nav className="grow space-y-3">
          <NavItem icon={<LayoutDashboard />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <NavItem icon={<Store />} label="Vendors" active={activeTab === "vendors"} onClick={() => setActiveTab("vendors")} />
          <NavItem icon={<TrendingUp />} label="Intelligence" active={activeTab === "intelligence"} onClick={() => setActiveTab("intelligence")} />
          <NavItem icon={<Sprout />} label="Mandi Rates" active={activeTab === "mandi"} onClick={() => setActiveTab("mandi")} />
          <NavItem icon={<Megaphone />} label="Ad Manager" active={activeTab === "ads"} onClick={() => setActiveTab("ads")} />
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-red-500 transition-all border-t border-white/5 pt-8">
          <LogOut size={18} /> Exit System
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <section className="grow p-8 md:p-16 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
           <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">{activeTab}</h1>
           <div className="bg-white p-4 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-4 px-6">
              <span className="text-[10px] font-black uppercase text-slate-400 italic">SJF Korba</span>
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-600/30 text-xl italic">S</div>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewTab stats={stats} vendors={vendors} leads={leads} setTab={setActiveTab} />}
          {activeTab === "intelligence" && <IntelligenceTab logs={searchLogs} />}
          {activeTab === "vendors" && <VendorsTab vendors={vendors} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {activeTab === "mandi" && <MandiManager rates={mandiRates} />}
          {activeTab === "ads" && <AdsManager ads={ads} />}
        </AnimatePresence>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS (THE WORKHORSE) ---

// 1. MANDI MANAGER: Full CRUD Active
function MandiManager({ rates }: { rates: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ itemName: '', price: '', unit: 'kg', district: 'Korba', trend: 'stable' });

  const saveRate = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "mandi_rates", editingId), { ...formData, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, "mandi_rates"), { ...formData, updatedAt: serverTimestamp() });
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ itemName: '', price: '', unit: 'kg', district: 'Korba', trend: 'stable' });
    } catch (err) { alert("Rate update fail! Check Permissions."); }
  };

  const edit = (rate: any) => {
    setEditingId(rate.id);
    setFormData({ itemName: rate.itemName, price: rate.price, unit: rate.unit, district: rate.district, trend: rate.trend });
    setShowForm(true);
  };

  return (
    <div className="space-y-10">
      <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="bg-orange-600 text-white px-10 py-6 rounded-[30px] font-black text-xs uppercase shadow-xl flex items-center gap-3">
        {showForm ? <X /> : <Plus />} {showForm ? "Close Editor" : "Add Mandi Rate"}
      </button>

      {showForm && (
        <form onSubmit={saveRate} className="bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-8">
           <AdminInput label="Item Name" value={formData.itemName} onChange={(v:any)=>setFormData({...formData, itemName:v})} />
           <AdminInput label="Price (₹)" value={formData.price} onChange={(v:any)=>setFormData({...formData, price:v})} />
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Trend</label>
              <select value={formData.trend} onChange={(e)=>setFormData({...formData, trend: e.target.value})} className="w-full p-6 bg-slate-50 rounded-[25px] font-bold border border-slate-100 outline-none">
                <option value="stable">Stable</option>
                <option value="up">Rising (Tezi)</option>
                <option value="down">Falling (Manda)</option>
              </select>
           </div>
           <button type="submit" className="bg-slate-900 text-white rounded-[25px] font-black uppercase text-xs mt-6 shadow-xl">
             {editingId ? "Update Bhav" : "Publish Bhav"}
           </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {rates.map(r => (
           <div key={r.id} className="bg-white p-10 rounded-[50px] border border-slate-100 relative group shadow-sm hover:shadow-xl transition-all">
              <div className="absolute top-6 right-6 flex gap-2">
                 <button onClick={() => edit(r)} className="text-slate-300 hover:text-blue-600"><Edit3 size={18}/></button>
                 <button onClick={async() => { if(confirm("Delete Bhav?")) await deleteDoc(doc(db,"mandi_rates",r.id)); }} className="text-slate-300 hover:text-red-600"><Trash2 size={18}/></button>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">{r.district}</p>
              <h4 className="text-2xl font-black text-slate-900 uppercase italic leading-none">{r.itemName}</h4>
              <p className="text-4xl font-black text-orange-600 mt-4 tracking-tighter">₹{r.price}<span className="text-xs text-slate-400">/{r.unit}</span></p>
              <div className={`mt-4 inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase ${r.trend === 'up' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {r.trend === 'up' ? '▲ Tezi' : r.trend === 'down' ? '▼ Manda' : 'Stable'}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// 2. AD MANAGER: Blast Campaigns
function AdsManager({ ads }: { ads: any[] }) {
  const [showAdForm, setShowAdForm] = useState(false);
  const [adData, setAdData] = useState({ title: '', imageUrl: '', link: '' });

  const publishAd = async (e: any) => {
    e.preventDefault();
    if(!adData.imageUrl) return alert("Image URL missing!");
    await addDoc(collection(db, "advertisements"), { ...adData, createdAt: serverTimestamp() });
    setShowAdForm(false);
    setAdData({ title: '', imageUrl: '', link: '' });
  };

  return (
    <div className="space-y-12">
      <button onClick={() => setShowAdForm(!showAdForm)} className="bg-slate-950 text-white px-10 py-6 rounded-[30px] font-black text-xs uppercase shadow-2xl flex items-center gap-3">
         <Megaphone size={18}/> {showAdForm ? "Cancel" : "Launch New Campaign"}
      </button>

      {showAdForm && (
        <form onSubmit={publishAd} className="bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
           <AdminInput label="Ad Title" placeholder="Diwali Sale Korba" onChange={(v:any)=>setAdData({...adData, title:v})} />
           <AdminInput label="Image URL" placeholder="https://..." onChange={(v:any)=>setAdData({...adData, imageUrl:v})} />
           <AdminInput label="Redirect Link" placeholder="/directory/xyz" onChange={(v:any)=>setAdData({...adData, link:v})} />
           <button className="md:col-span-3 bg-orange-600 text-white py-6 rounded-[30px] font-black uppercase tracking-[0.4em] mt-4 shadow-xl">Push Live Now</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         {ads.map(ad => (
           <div key={ad.id} className="bg-white rounded-[60px] overflow-hidden border border-slate-100 group relative hover:shadow-2xl transition-all">
              <button onClick={async() => { if(confirm("Stop Ad?")) await deleteDoc(doc(db, "advertisements", ad.id)); }} className="absolute top-6 right-6 z-20 bg-white/90 p-4 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                 <Trash2 size={20}/>
              </button>
              <div className="h-72 w-full bg-slate-100 overflow-hidden relative">
                 <img src={ad.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                 <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-10 left-10">
                    <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg italic">Active</span>
                 </div>
              </div>
              <div className="p-10">
                 <h4 className="font-black text-slate-900 uppercase italic tracking-tighter truncate text-2xl mb-2">{ad.title}</h4>
                 <p className="text-slate-400 font-bold text-xs truncate italic">{ad.link}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// 3. INTELLIGENCE: Search Console & Leads
function IntelligenceTab({ logs }: any) {
  const counts = logs.reduce((acc: any, curr: any) => {
    acc[curr.keyword] = (acc[curr.keyword] || 0) + 1;
    return acc;
  }, {});
  const topKeywords = Object.entries(counts).sort(([, a]: any, [, b]: any) => b - a).slice(0, 10);

  return (
    <div className="bg-white p-12 rounded-[60px] border border-slate-100 shadow-sm">
      <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Search <span className="text-orange-600">Intelligence.</span></h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          {topKeywords.map(([word, count]: any, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[35px] hover:bg-orange-50 transition-colors group">
               <span className="font-black text-xl italic uppercase text-slate-900 group-hover:text-orange-600">#{word}</span>
               <span className="bg-white px-5 py-2 rounded-full text-[10px] font-black text-slate-400 shadow-sm">{count} Hits</span>
            </div>
          ))}
          {topKeywords.length === 0 && <p className="text-slate-400 italic">No search intent recorded yet...</p>}
        </div>
        <div className="bg-slate-950 rounded-[50px] p-12 text-white flex flex-col justify-center items-center text-center">
           <TrendingUp size={80} className="text-orange-600 mb-8" />
           <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Market Intent.</h4>
           <p className="text-slate-500 font-medium">Ye data aapko bata raha hai ki Korba mein log kya dhoond rahe hain.</p>
        </div>
      </div>
    </div>
  );
}

// 4. VENDORS TAB: Fixed Keyword Logic
function VendorsTab({ vendors, searchTerm, setSearchTerm }: any) {
  const [showForm, setShowForm] = useState(false);
  const [newVendor, setNewVendor] = useState({ shopName: '', phone: '', address: '', category: 'Grocery', keywords: '' });

  const filtered = vendors.filter((v: any) => 
    (v.shopName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (String(v.keywords || "")?.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  const register = async (e: any) => {
    e.preventDefault();
    if(!newVendor.shopName || !newVendor.phone) return alert("Shatrughan Ji, basic details bhariye!");
    // FIXED: Save keywords as Array to prevent dashboard crash
    const keywordArray = newVendor.keywords.split(',').map(k => k.trim());
    await addDoc(collection(db, "vendors"), { ...newVendor, keywords: keywordArray, isVerified: true, createdAt: serverTimestamp() });
    setShowForm(false);
    setNewVendor({ shopName: '', phone: '', address: '', category: 'Grocery', keywords: '' });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center gap-6">
        <button onClick={() => setShowForm(!showForm)} className="bg-orange-600 text-white px-10 py-6 rounded-[30px] font-black text-xs uppercase shadow-xl flex items-center gap-3">
           {showForm ? <X /> : <Plus />} {showForm ? "Cancel" : "Add Vendor"}
        </button>
        <div className="relative grow max-w-2xl">
           <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
           <input type="text" placeholder="Search Shop/Category..." className="w-full h-20 bg-white border border-slate-100 rounded-[35px] pl-20 pr-10 font-bold outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} onSubmit={register} className="bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden mb-10">
             <AdminInput label="Shop Name" placeholder="SPR MOTORS" onChange={(v:any)=>setNewVendor({...newVendor, shopName:v})} />
             <AdminInput label="Phone" placeholder="79744XXXXX" onChange={(v:any)=>setNewVendor({...newVendor, phone:v})} />
             <AdminInput label="Keywords (SEO)" placeholder="truck, repair, heavy" onChange={(v:any)=>setNewVendor({...newVendor, keywords:v})} />
             <button className="md:col-span-3 bg-slate-900 text-white py-6 rounded-[30px] font-black uppercase tracking-[0.4em]">Onboard Vendor</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         {filtered.map((v: any) => (
           <div key={v.id} className="bg-white p-10 rounded-[55px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between">
              <div>
                 <div className="flex justify-between items-start mb-6">
                    <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{v.category}</span>
                    <div className={`w-3 h-3 rounded-full ${v.isVerified ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 italic uppercase mb-4">{v.shopName}</h4>
                 <div className="flex flex-wrap gap-1">
                    <Tag size={12} className="text-orange-500" />
                    {/* CRASH FIX: Handling Array & String keywords */}
                    {(Array.isArray(v.keywords) ? v.keywords : String(v.keywords || "").split(',')).slice(0, 3).map((k: string, i: number) => (
                      <span key={i} className="text-[9px] text-slate-400 font-black bg-slate-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">#{String(k).trim()}</span>
                    ))}
                 </div>
              </div>
              <div className="flex gap-4 pt-8 border-t border-slate-50 mt-8">
                 <button onClick={async () => await updateDoc(doc(db,"vendors",v.id), {isVerified: !v.isVerified})} className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase transition-all ${v.isVerified ? 'bg-emerald-600 text-white shadow-xl' : 'bg-slate-100 text-slate-400'}`}>
                   {v.isVerified ? 'Live' : 'Approve'}
                 </button>
                 <button onClick={async () => { if(confirm("Delete Shop?")) await deleteDoc(doc(db, "vendors", v.id)); }} className="p-5 text-slate-200 hover:text-red-600"><Trash2 size={22}/></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// 5. OVERVIEW: Dashboard Central
function OverviewTab({ stats, vendors, leads, setTab }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <StatItem label="Verified Shops" value={stats.total - stats.pending} color="text-blue-600" />
         <StatItem label="Lead Actions" value={stats.totalLeads} color="text-emerald-600" />
         <StatItem label="Pending Approval" value={stats.pending} color="text-orange-600" />
         <StatItem label="Mandi Active" value={stats.liveMandi} color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[60px] p-12 border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black mb-10 italic uppercase tracking-tighter">New Registrations</h3>
           <div className="space-y-4">
             {vendors.slice(0, 5).map((v: any) => (
               <div key={v.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[35px] hover:bg-white border border-slate-50 transition-all group">
                  <div>
                     <span className="font-black text-xl text-slate-900 uppercase italic group-hover:text-orange-600 transition-colors">{v.shopName}</span>
                     <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{v.category} • {v.phone}</p>
                  </div>
                  <button onClick={() => setTab("vendors")} className="bg-white p-4 rounded-2xl text-orange-600 shadow-sm hover:scale-110 transition-transform"><ArrowUpRight size={24}/></button>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-slate-950 text-white rounded-[60px] p-12 shadow-3xl overflow-hidden relative">
           <div className="absolute top-0 right-0 p-10 opacity-5"><MousePointer2 size={120} /></div>
           <h3 className="text-2xl font-black mb-10 italic uppercase tracking-tighter text-orange-500">Live Lead Pulse</h3>
           <div className="space-y-6">
             {leads.slice(0, 5).map((l: any) => (
               <div key={l.id} className="flex items-center gap-5 p-6 bg-white/5 rounded-[30px] border border-white/5 group hover:bg-white/10 transition-all">
                  <div className={`p-4 rounded-2xl ${l.action === 'call' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    {l.action === 'call' ? <PhoneCall size={18} /> : <MessageSquare size={18} />}
                  </div>
                  <div>
                    <span className="font-black text-sm uppercase italic block">{l.vendorName || "Unknown"}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{l.action} Triggered • Korba</span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- GLOBAL HELPERS ---
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-5 p-5 rounded-3xl font-black uppercase text-[11px] tracking-widest transition-all ${active ? 'bg-orange-600 text-white shadow-2xl translate-x-2' : 'text-slate-500 hover:text-slate-300'}`}>
      {icon} {label}
    </button>
  );
}

function StatItem({ label, value, color }: any) {
  return (
    <div className="bg-white p-12 rounded-[55px] border border-slate-100 shadow-sm flex flex-col items-center hover:scale-105 transition-all">
       <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-3">{label}</span>
       <h4 className={`text-6xl font-black ${color} tracking-tighter italic`}>{value}</h4>
    </div>
  );
}

function AdminInput({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full p-6 bg-slate-50 rounded-[25px] outline-none border border-slate-100 font-bold focus:ring-8 ring-orange-500/5 transition-all" />
    </div>
  );
}