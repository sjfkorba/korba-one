import { Phone, CheckCircle, MapPin, Star } from "lucide-react";

export default function VendorCard({ vendor }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {vendor.name}
            {vendor.isVerified && <CheckCircle size={16} className="text-blue-500" />}
          </h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
            <MapPin size={14} /> {vendor.location}
          </p>
        </div>
        <div className="bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={14} className="text-green-600 fill-green-600" />
          <span className="text-green-700 text-xs font-bold">{vendor.rating}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {/* Primary Action: Call */}
        <a 
          href={`tel:${vendor.phone}`}
          className="flex-1 bg-orange-600 text-white h-11 rounded-xl flex items-center justify-center gap-2 font-semibold active:scale-95 transition-transform"
        >
          <Phone size={18} /> Call Now
        </a>
        
        {/* Secondary Action: WhatsApp */}
        <button className="w-12 h-11 border border-gray-200 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-50">
          <img src="/whatsapp-icon.svg" className="w-6 h-6" alt="WA" />
        </button>
      </div>
    </div>
  );
}