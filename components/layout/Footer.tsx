import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div>
          <h2 className="text-2xl font-black">
            Korba<span className="text-orange-500">One</span>
          </h2>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Korba’s premium digital super app connecting shops, jobs,
            services, buy & sell listings, and emergency contacts in one
            powerful ecosystem.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="/shops" className="hover:text-orange-500 transition">Shops</Link></li>
            <li><Link href="/jobs" className="hover:text-orange-500 transition">Jobs</Link></li>
            <li><Link href="/buy-sell" className="hover:text-orange-500 transition">Buy/Sell</Link></li>
            <li><Link href="/services" className="hover:text-orange-500 transition">Services</Link></li>
            <li><Link href="/emergency" className="hover:text-orange-500 transition">Emergency</Link></li>
          </ul>
        </div>

        {/* Company & Policies */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-orange-500 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-500 transition">Terms & Conditions</Link></li>
            <li><Link href="/listing-policy" className="hover:text-orange-500 transition">Listing Policy</Link></li>
            <li><Link href="/advertisement-policy" className="hover:text-orange-500 transition">Advertisement Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-orange-500 transition">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
            Connect
          </h3>
          <div className="flex gap-4">
            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-orange-600/20 transition">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-orange-600/20 transition">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="p-3 rounded-xl bg-white/5 hover:bg-orange-600/20 transition">
              <Linkedin size={18} />
            </Link>
            <Link href="mailto:info@korbaone.com" className="p-3 rounded-xl bg-white/5 hover:bg-orange-600/20 transition">
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Korba One. All rights reserved.
      </div>
    </footer>
  );
}
