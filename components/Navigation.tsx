"use client"; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PhoneCall, ShieldCheck, User, Store, LayoutGrid, ShieldAlert, Sprout } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  // Helper function check karne ke liye ki link active hai ya nahi
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* --- DESKTOP TOP NAV --- */}
      <nav className="hidden md:flex fixed top-0 w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-10 items-center justify-between">
        <Link href="/" className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
          Korba One
        </Link>

        <div className="flex gap-10 font-bold text-gray-600">
          <NavLink href="/" label="Home" active={isActive('/')} />
          <NavLink href="/directory" label="Directory" active={pathname.startsWith('/directory') || pathname.startsWith('/services')} />
          <NavLink href="/emergency" label="Emergency" active={isActive('/emergency')} isUrgent />
        </div>

        <div className="flex items-center gap-4">
          {/* Integration: Admin Dashboard Icon (Desktop) */}
        
<Link href="/mandi" className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs tracking-widest hover:text-orange-600 transition-all">
  <Sprout size={16} className="text-orange-600" /> Mandi Bhav
</Link>

          <Link href="/register">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 hover:shadow-lg transition-all active:scale-95">
              Login/Signup
            </button>
          </Link>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 w-full h-20 bg-white/90 backdrop-blur-2xl border-t border-gray-200 z-50 flex justify-around items-center pt-2 pb-5 px-2">
        <MobileNavItem 
          href="/" 
          icon={<Home size={24} />} 
          label="Home" 
          active={isActive('/')} 
        />
        <MobileNavItem 
          href="/directory" 
          icon={<LayoutGrid size={24} />} 
          label="Directory" 
          active={pathname.startsWith('/directory')} 
        />
        <MobileNavItem 
          href="/register" 
          icon={<Store size={24} />} 
          label="Register" 
          active={isActive('/register')} 
        />
        {/* Mobile Integration: Profile/Admin Tab */}
        <MobileNavItem 
          href="/admin/dashboard" 
          icon={<User size={24} />} 
          label="Admin" 
          active={pathname.startsWith('/admin')} 
        />
        <MobileNavItem 
          href="/emergency" 
          icon={<PhoneCall size={24} />} 
          label="Urgent" 
          active={isActive('/emergency')} 
          isUrgent
        />
      </nav>
    </>
  );
}

// --- DESKTOP NAV LINK COMPONENT ---
function NavLink({ href, label, active, isUrgent = false }: any) {
  return (
    <Link 
      href={href} 
      className={`relative transition-colors hover:text-orange-600 ${
        active ? 'text-orange-600' : isUrgent ? 'text-red-600' : 'text-gray-600'
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
      )}
    </Link>
  );
}

// --- MOBILE NAV ITEM COMPONENT ---
function MobileNavItem({ href, icon, label, active, isUrgent = false }: any) {
  return (
    <Link href={href} className="flex-1">
      <div className={`flex flex-col items-center gap-1 transition-all ${
        active 
          ? 'text-orange-600 scale-110' 
          : isUrgent ? 'text-red-500 font-bold' : 'text-gray-400'
      }`}>
        <div className={`transition-all duration-300 ${active ? 'bg-orange-50 p-2 rounded-xl shadow-sm' : 'p-2'}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-60'}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}