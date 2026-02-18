"use client";
import { useState } from "react";
import { db, auth, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ChevronRight, ChevronLeft, Camera, 
  CheckCircle2, Loader2, MapPin, Search, Star 
} from "lucide-react";
import imageCompression from 'browser-image-compression';

// --- 🎯 MEGA SEO CATEGORY MASTER (Aapki batayi hui saari categories + 25 Keywords Each) ---
const CATEGORY_MASTER: any = {
  "Car dealer": ["Used Cars Korba", "Second Hand Cars", "Car Valuation", "Certified Pre-owned", "Car Finance", "Best Car Dealer", "Buy Sell Cars", "Used SUV", "Budget Cars", "Luxury Cars Korba", "Car Exchange Offer", "Auto Dealers", "Test Drive", "Car Insurance", "Vehicle Inspection", "Trustworthy Dealer", "Low Mileage Cars", "Sedan for Sale", "Commercial Vehicles", "Car Registration", "Hatchback Cars", "Petrol Cars", "Diesel Cars", "Automatic Cars", "Dealer Near Me"],
  "Taxi service": ["One Way Taxi", "Round Trip Korba", "Airport Drop", "Railway Station Pickup", "Luxury Cab", "Cheap Taxi Korba", "24/7 Taxi Service", "Outstation Cabs", "Corporate Car Rental", "Innova on Rent", "Ertiga Taxi", "Swift Dzire Cab", "Taxi for Local", "Safe Travel Korba", "Professional Drivers", "Intercity Taxi", "Monthly Car Rental", "Wedding Car Hire", "Tempo Traveller", "Bus Booking", "Ac Taxi Korba", "Non Ac Cabs", "Instant Booking", "Verified Drivers", "Taxi Near Me"],
  "Hospitals": ["Best Hospital Korba", "Emergency Care", "ICU Facility", "Multi Speciality", "Pediatrician", "Gynecologist", "Orthopedic Surgeon", "Cardiologist Korba", "General Physician", "24/7 Pharmacy", "Diagnostic Center", "Pathology Lab", "X-Ray Facility", "Operation Theater", "Ambulance Service", "Maternity Hospital", "Child Care", "Physiotherapy", "Dialysis Center", "Vaccination Clinic", "Health Checkup", "Patient Care", "ENT Specialist", "Eye Hospital", "Trauma Center"],
  "Spa and saloon": ["Best Hair Salon", "Mens Parlor", "Bridal Makeup Korba", "Spa Therapy", "Body Massage", "Facial Treatment", "Hair Cutting", "Beauty Clinic", "Skin Care", "Keratin Treatment", "Hair Smoothing", "Manicure Pedicure", "Professional Stylist", "Unisex Salon", "Wedding Grooming", "Aromatherapy", "Relaxation Center", "Makeup Artist", "Nail Art", "Hair Coloring", "Glow Facial", "Detan Treatment", "Salon Home Service", "Premium Spa", "Saloon Near Me"],
  "Wedding planners": ["Best Wedding Planner", "Event Decoration", "Catering Service", "Theme Wedding", "Mandap Decor", "Wedding Venue", "Photography Video", "Wedding Invitation", "Bridal Entry", "Stage Decoration", "Flower Decor", "Destination Wedding", "Budget Wedding", "Wedding Coordinator", "Event Management", "Haldi Decor", "Mehendi Planning", "Reception Party", "Luxury Wedding", "Traditional Decor", "Modern Wedding", "Sangeet Night", "Celebration Planner", "Complete Wedding Package", "Wedding Services Korba"],
  "Solar installers": ["Solar Panel Korba", "Solar Subsidy", "On Grid Solar", "Off Grid Solar", "Solar Rooftop", "Solar Energy System", "Solar Maintenance", "Best Solar Company", "Solar Inverter", "Solar Battery", "Solar Installation", "Clean Energy", "Solar Water Heater", "Solar Street Light", "Free Electricity Korba", "Solar Panel Price", "Industrial Solar", "Residential Solar", "Solar Farm", "Solar Consultant", "Renewable Energy", "Solar Pump", "Tata Solar Korba", "Luminous Solar", "Solar Near Me"],
  "Insurance": ["Car Insurance Korba", "Life Insurance", "Health Insurance", "Term Insurance", "Bike Insurance", "Best Insurance Agent", "LIC Korba", "Medical Insurance", "Travel Insurance", "Business Insurance", "Insurance Renewal", "Claim Settlement", "Cheap Insurance", "General Insurance", "HDFC Ergo Korba", "Star Health", "Policy Bazaar Korba", "Accident Cover", "Family Health Plan", "Critical Illness", "Insurance Consultancy", "Top Insurance Company", "Vehicle Policy", "Comprehensive Cover", "Insurance Near Me"],
  "Loans": ["Personal Loan Korba", "Home Loan", "Business Loan", "Car Loan", "Gold Loan", "Loan Against Property", "Instant Loan", "Low Interest Loan", "Education Loan", "Mortgage Loan", "Small Business Loan", "MSME Loan", "Loan Agent Korba", "Fast Approval Loan", "Credit Card Korba", "Banking Service", "Finance Company", "HDFC Loan Korba", "SBI Home Loan", "Private Finance", "Debt Consolidation", "Finance Consultant", "Easy EMI", "Minimum Document Loan", "Loan Near Me"],
  "Jobs": ["Hiring in Korba", "Staff Required", "Sales Job", "Accountant Vacancy", "Data Entry Jobs", "Part Time Work", "Full Time Job", "Driver Vacancy", "Security Guard Job", "Urgent Hiring", "Teacher Job", "Marketing Executive", "Office Assistant", "Receptionist Job", "Delivery Boy", "Warehouse Staff", "Technical Jobs", "Fresher Jobs", "Experience Required", "Work from Home Korba", "Evening Shift", "Night Shift", "Daily Wages", "Manager Vacancy", "Job Consultancy"],
  "Automobile": ["Car Service Korba", "Bike Repair Shop", "Tyre Shop", "Auto Spare Parts", "Wheel Alignment", "Car Wash Korba", "Accessories Shop", "Battery Shop", "Engine Repair", "Tractor Service", "Bike Service Center", "Ceramic Coating", "Detailing Studio", "Old Parts Korba", "Mechanic Near Me", "Auto Electrical", "AC Repair Car", "Oil Change", "Brake Service", "Body Shop", "Clutch Repair", "Two Wheeler Spares", "Heavy Vehicle Parts", "Performance Tuning", "Automobile Shop"],
  "Doctors": ["Top Doctor Korba", "General Physician", "Child Specialist", "Consultation", "Home Visit Doctor", "Private Clinic", "Skin Doctor", "Ear Nose Throat", "Dental Clinic", "Ayurvedic Doctor", "Homeopathy", "Eye Specialist", "Nephrologist", "Neurologist", "Orthopedic", "Surgeon", "Medical Advice", "Expert Doctor", "Physiotherapist", "Diabetes Specialist", "Blood Pressure Clinic", "Senior Doctor", "Lady Doctor", "Nutritionist", "Doctor Near Me"],
  "Gym": ["Best Gym Korba", "Fitness Center", "Personal Trainer", "Yoga Classes", "Bodybuilding", "Weight Loss Korba", "Weight Gain Program", "Crossfit Gym", "Cardio Training", "Gym for Ladies", "Zumba Classes", "Supplements Shop", "Health Club", "Premium Gym", "Budget Gym Korba", "Open Gym", "Gym Equipment", "Boxing Classes", "Aerobics", "Diet Plan", "Modern Gym", "Workout Center", "Hardcore Gym", "24/7 Gym", "Gym Near Me"],
  "Electronics": ["Electronics Shop Korba", "Mobile Shop", "Laptop Repair", "TV Showroom", "AC Dealer", "Refrigerator Shop", "Washing Machine", "CCTV Installation", "Computer Shop", "Smart Home Devices", "Home Theater", "Kitchen Appliances", "Electronics Repair", "Used Mobiles", "iPhone Store Korba", "Samsung Dealer", "Sony Showroom", "Electronic Spares", "Electrician Korba", "Gadget Shop", "Wholesale Electronics", "Retail Electronics", "Best Price Electronics", "Authorized Dealer", "Electronics Near Me"],
  "Travel": ["Travel Agent Korba", "Tour Packages", "Flight Booking", "Train Ticket Booking", "Hotel Reservation", "Honeymoon Packages", "Domestic Tour", "International Travel", "Visa Consultancy", "Passport Service", "Cruise Booking", "Adventure Trip", "Group Tours", "Customized Holiday", "Best Travel Agency", "Religious Tours", "Bus Ticket", "Car Rental Travel", "Holiday Planner", "Wildlife Safari", "Weekend Getaway", "Travel Guide", "Low Cost Travel", "Makemytrip Korba", "Travel Near Me"],
  "Real Estate": ["Flat for Sale", "Plot in Korba", "House for Rent", "Commercial Space", "Shop for Sale", "Agriculture Land", "Property Dealer", "Best Real Estate", "2BHK 3BHK Flat", "Independent House", "Residential Plot", "Industrial Land", "Office on Rent", "Property Investment", "Real Estate Agent", "RERA Approved", "Gated Community", "Construction", "Property Valuation", "Legal Documentation", "Modern Home", "Budget Flat", "Luxury Villa", "Property Management", "Real Estate Korba"],
  "Furniture": ["Furniture Shop Korba", "Wooden Furniture", "Sofa Set", "Dining Table", "Beds and Wardrobe", "Office Furniture", "Modular Kitchen", "Interior Design", "Furniture Manufacturer", "Custom Furniture", "Home Decor Furniture", "Teak Wood Furniture", "Cheap Furniture", "Luxury Furniture", "Furniture Showroom", "Wrought Iron Furniture", "Mattress Shop", "Kids Furniture", "Furniture Repair", "Steel Almirah", "Modern Furniture", "Classic Furniture", "Wholesale Furniture", "Furniture Polish", "Furniture Near Me"],
  "Decoration": ["Event Decorator Korba", "Birthday Decoration", "Flower Decor", "Balloon Decor", "Lighting Decoration", "Party Planner", "Anniversary Decor", "Surprise Decor", "Mandap Decoration", "Stage Decor", "Corporate Event Decor", "Entrance Decoration", "Home Decor Services", "Artificial Flowers", "Light Effects", "Theme Decoration", "Grand Decoration", "Decoration Hire", "Budget Decoration", "Wedding Decor", "Festive Decoration", "Rangoli Art", "Balloon Arch", "Curtain Decor", "Decoration Near Me"],
  "Events": ["Event Management Korba", "Birthday Party Planner", "Corporate Events", "Exhibition Planner", "Concert Management", "Product Launch", "Catering for Events", "DJ Service Korba", "Anchoring Service", "Sound System Hire", "Celebrity Management", "Stage Shows", "Award Functions", "School Events", "College Fest", "Party Organizer", "Complete Event Solution", "Event Photography", "Live Performance", "Security for Events", "Artist Booking", "Roadshows", "Political Events", "Grand Opening", "Events Near Me"],
  "Industrial": ["Coal Transport Korba", "JCB on Rent", "Industrial Hardware", "Safety Gear Shop", "Fabrication Work", "Crane Rental", "Fly Ash Bricks", "Mining Equipment", "Machinery Spares", "Welding Service", "Electrical Panel", "Hydra Crane", "Tractor Service", "Industrial Supplies", "Contractor Korba", "Material Supply", "Pipes and Fittings", "Steel Fabrication", "Civil Contractor", "Maintenance Work", "Heavy Machinery", "Automation", "Tools and Tackles", "Industrial Lab", "Workshop Korba"]
};

const CATEGORIES = Object.keys(CATEGORY_MASTER);

export default function IntelligentListingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    address: "Korba, Chhattisgarh",
    phone: "",
    keywords: [] as string[],
  });

  // 🛠️ CREATE SEO SLUG
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '') 
      .replace(/ +/g, '-');
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    const compressed = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1200 });
    setImageFile(compressed);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      alert("Kripya title aur category bhariye.");
      return;
    }
    setLoading(true);
    try {
      let url = "";
      if (imageFile) {
        const sRef = ref(storage, `listings/${auth.currentUser?.uid}/${Date.now()}.jpg`);
        await uploadBytes(sRef, imageFile);
        url = await getDownloadURL(sRef);
      }

      const slug = `${createSlug(formData.title)}-${Math.floor(1000 + Math.random() * 9000)}`;

      await addDoc(collection(db, "listings"), {
        ...formData,
        slug: slug,
        imageUrl: url,
        ownerEmail: auth.currentUser?.email,
        ownerUid: auth.currentUser?.uid,
        isActive: true,
        isVerified: false,
        views: 0,
        createdAt: serverTimestamp()
      });

      // Update Count in User Doc
      await updateDoc(doc(db, "users", auth.currentUser?.email!), { listingsCount: increment(1) });
      setStep(6);
    } catch (e) { 
        console.error(e);
        alert("Submission Failed!"); 
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-20 font-sans antialiased selection:bg-orange-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-16">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-orange-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
            <StepWrapper key="s1" title="Select Niche" desc="Kripya apne ad ki category chunein.">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setFormData({...formData, category: cat}); handleNext(); }}
                    className={`p-6 border-2 rounded-[30px] font-black text-[10px] uppercase tracking-widest transition-all ${formData.category === cat ? 'border-orange-600 bg-orange-50 text-orange-600' : 'bg-white border-slate-100 text-slate-400 hover:border-orange-200 hover:text-slate-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* STEP 2: CONTENT DETAILS */}
          {step === 2 && (
            <StepWrapper key="s2" title="Ad Details" desc="Title aur Description SEO ke liye sabse zaruri hain.">
              <div className="space-y-6">
                <Input label="Ad Title" value={formData.title} onChange={(v: any) => setFormData({...formData, title: v})} placeholder="e.g. Maruti Suzuki XL6 for Rent Korba" />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Apne business ke bare mein vistaar se likhein (Keywords use karein)..."
                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[30px] h-44 font-medium outline-none focus:ring-4 ring-orange-500/5 transition-all text-slate-900 text-sm"
                  />
                </div>
                <Input label="Price / Starts From (₹)" value={formData.price} onChange={(v: any) => setFormData({...formData, price: v})} placeholder="e.g. 1500" />
                <div className="flex gap-4">
                  <button onClick={handleBack} className="p-6 bg-slate-100 rounded-3xl text-slate-400"><ChevronLeft/></button>
                  <button onClick={handleNext} className="flex-1 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-widest italic text-xs">Continue</button>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* STEP 3: SEO TAGS LIBRARY */}
          {step === 3 && (
            <StepWrapper key="s3" title="SEO Tags" desc={`${formData.category} ke liye high-ranking tags chunein.`}>
              <div className="space-y-8">
                <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto p-4 bg-slate-50 rounded-[40px] border border-slate-100 custom-scrollbar">
                  {CATEGORY_MASTER[formData.category]?.map((kw: string) => (
                    <button 
                      key={kw}
                      onClick={() => setFormData(prev => ({...prev, keywords: prev.keywords.includes(kw) ? prev.keywords.filter(k => k !== kw) : [...prev.keywords, kw]}))}
                      className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.keywords.includes(kw) ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' : 'bg-white border border-slate-100 text-slate-400'}`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="p-6 bg-slate-100 rounded-3xl text-slate-400"><ChevronLeft/></button>
                  <button onClick={handleNext} className="flex-1 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-widest text-xs italic">Next: Media</button>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* STEP 4: MEDIA UPLOAD */}
          {step === 4 && (
            <StepWrapper key="s4" title="Gallery" desc="Real images se 10x zyada leads aati hain.">
               <div className="flex flex-col items-center gap-10">
                  <div className="w-72 h-72 bg-slate-50 rounded-[60px] border-4 border-white shadow-2xl overflow-hidden relative group">
                    {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center h-full text-slate-200"><Camera size={60} /></div>}
                    <input type="file" id="adPhoto" className="hidden" onChange={handleImage} accept="image/*" />
                    <label htmlFor="adPhoto" className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-[10px] uppercase tracking-widest">Change Photo</label>
                  </div>
                  <div className="flex gap-4 w-full">
                    <button onClick={handleBack} className="p-6 bg-slate-100 rounded-3xl text-slate-400"><ChevronLeft/></button>
                    <button onClick={handleNext} className="flex-1 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-widest text-xs italic">Review Ad</button>
                  </div>
               </div>
            </StepWrapper>
          )}

          {/* STEP 5: REVIEW & PUBLISH */}
          {step === 5 && (
            <StepWrapper key="s5" title="Final Review" desc="Ek baar check karlein, fir hum Korba mein dhoom machayenge.">
               <div className="space-y-8">
                  <div className="bg-slate-50 p-10 rounded-[50px] border border-slate-100 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">{formData.title}</h4>
                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{formData.category}</p>
                      </div>
                      <div className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">₹{formData.price}</div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{formData.description}</p>
                    <div className="pt-6 border-t border-slate-200 flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase">
                       <MapPin size={16} className="text-orange-600"/> Korba, Chhattisgarh
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleBack} className="p-6 bg-slate-100 rounded-3xl text-slate-400"><ChevronLeft/></button>
                    <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-emerald-600 text-white rounded-[35px] font-black uppercase italic tracking-widest text-sm shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                      {loading ? <Loader2 className="animate-spin" /> : <>Publish Ad Live <Zap size={18} fill="currentColor" /></>}
                    </button>
                  </div>
               </div>
            </StepWrapper>
          )}

          {/* STEP 6: SUCCESS */}
          {step === 6 && (
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white p-20 rounded-[80px] text-center space-y-10 shadow-2xl border border-white">
               <div className="w-28 h-28 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                 <CheckCircle2 size={56} />
               </div>
               <div className="space-y-3">
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Published!</h2>
                 <p className="text-slate-400 font-medium text-sm">Shatrughan ji, aapka ad ab poore Korba ko dikhayega.</p>
               </div>
               <button onClick={() => router.push('/dashboard/manage')} className="w-full bg-slate-950 text-white py-6 rounded-[30px] font-black uppercase tracking-widest italic text-xs shadow-xl">Back to My Dashboard</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- SHARED UI COMPONENTS ---
function StepWrapper({ children, title, desc }: any) {
  return (
    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-12">
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-950">{title}.</h2>
        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{desc}</p>
      </div>
      <div className="bg-white p-10 md:p-14 rounded-[60px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">{label}</label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[30px] outline-none font-bold text-slate-900 focus:ring-4 ring-orange-500/5 transition-all text-sm" 
      />
    </div>
  );
}