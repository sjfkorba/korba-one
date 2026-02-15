import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import VendorCard from "@/components/VendorCard";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  // Firebase se verified vendors fetch karna
  const q = query(
    collection(db, "vendors"), 
    where("category", "==", category),
    where("isVerified", "==", true)
  );
  
  const querySnapshot = await getDocs(q);
  const vendors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white px-6 py-8 border-b border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black capitalize text-korba-secondary">
          Verified <span className="text-korba-primary">{category}</span>
        </h1>
        <p className="text-gray-500 mt-1">Korba ke sabse bharosemand professionals.</p>
      </div>

      {/* Results Section */}
      <div className="p-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {vendors.length > 0 ? (
          vendors.map((vendor: any) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <p className="text-gray-400 font-medium">Is category mein abhi koi verified vendor nahi hai.</p>
          </div>
        )}
      </div>
    </div>
  );
}