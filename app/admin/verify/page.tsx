"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { CheckCircle, XCircle, Clock, ShieldCheck } from 'lucide-react';

export default function AdminVerifyPage() {
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    setLoading(true);
    const q = query(collection(db, "vendors"), where("isVerified", "==", false));
    const snapshot = await getDocs(q);
    setPendingVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleVerify = async (vendorId: string) => {
    const vendorRef = doc(db, "vendors", vendorId);
    await updateDoc(vendorRef, { isVerified: true });
    alert("Business Verified Successfully!");
    fetchPending(); // List refresh karein
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-slate-900 p-3 rounded-2xl text-white">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Admin Control</h1>
            <p className="text-slate-500 font-medium">Verify New Businesses in Korba</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading applications...</p>
        ) : pendingVendors.length > 0 ? (
          <div className="space-y-4">
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      {vendor.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{vendor.name}</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">{vendor.address}</p>
                  <p className="text-slate-400 text-xs mt-1">Phone: {vendor.phone}</p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => handleVerify(vendor.id)}
                    className="flex-1 md:flex-none bg-green-600 text-white px-6 h-12 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button className="bg-slate-100 text-slate-400 px-4 h-12 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all">
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <Clock size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No Pending Requests</h3>
            <p className="text-slate-400">Sab kuch up-to-date hai, Shatrughan ji!</p>
          </div>
        )}
      </div>
    </main>
  );
}