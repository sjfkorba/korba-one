"use client";
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 md:px-20 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Korba One
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Sheher ki har zaroorat, ek hi jagah. Korba ka apna digital ecosystem.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={20} />} />
            <SocialIcon icon={<Facebook size={20} />} />
            <SocialIcon icon={<Twitter size={20} />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-orange-500">Platform</h4>
          <ul className="space-y-4 text-slate-300 font-bold">
            <li><FooterLink href="/directory">Directory</FooterLink></li>
            <li><FooterLink href="/register">Register Business</FooterLink></li>
            <li><FooterLink href="/emergency">Emergency</FooterLink></li>
            <li><FooterLink href="/about">About Us</FooterLink></li>
            <li><FooterLink href="/contact">Contact Us</FooterLink></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-orange-500">Legal Center</h4>
          <ul className="space-y-4 text-slate-300 font-bold">
            <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
            <li><FooterLink href="/terms">Terms & Conditions</FooterLink></li>
            <li><FooterLink href="/listing-policy">Listing Policy</FooterLink></li>
            <li><FooterLink href="/ad-policy">Advertisement Policy</FooterLink></li>
            <li><FooterLink href="/refund">Refund Policy</FooterLink></li>
            
            {/* --- ADMIN LOGIN INTEGRATED HERE --- */}
            <li className="pt-4 mt-4 border-t border-white/5">
              <Link 
                href="/admin/login" 
                className="text-slate-600 hover:text-orange-500 transition-all duration-300 flex items-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <Lock size={12} /> Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-widest text-xs mb-2 text-orange-500">Get in Touch</h4>
          <div className="flex items-center gap-3 text-slate-300">
            <MapPin size={18} className="text-orange-500" />
            <span className="text-sm">Korba, Chhattisgarh, India</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Mail size={18} className="text-orange-500" />
            <span className="text-sm font-bold">support@korbaone.com</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
             <ShieldCheck size={24} className="text-green-500" />
             <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
               Verified <br/> Secure Platform
             </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-black tracking-widest uppercase italic">
        <p>© 2026 Korba One. All Rights Reserved.</p>
        <p>Managed by Shatrughan Sharma</p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: any) {
  return (
    <Link href={href} className="hover:text-orange-500 transition-colors duration-300 block">
      {children}
    </Link>
  );
}

function SocialIcon({ icon }: any) {
  return (
    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer border border-white/10">
      {icon}
    </div>
  );
}