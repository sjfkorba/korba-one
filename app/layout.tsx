import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://korbaone.com"),
  title: {
    default: "Korba One | The Digital Super App of Korba",
    template: "%s | Korba One",
  },
  description:
    "Korba One is Korba’s premium digital marketplace connecting shops, services, jobs, buy/sell listings and emergency contacts in one powerful platform.",
  keywords: [
    "Korba shops",
    "Korba jobs",
    "Korba buy sell",
    "Korba services",
    "Korba business directory",
    "Korba digital platform",
  ],
  openGraph: {
    title: "Korba One – Korba’s Digital Super App",
    description:
      "Discover shops, services, jobs, buy & sell listings and more in Korba’s most powerful digital ecosystem.",
    url: "https://korbaone.com",
    siteName: "Korba One",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Korba One Branding",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Korba One – Digital Korba",
    description:
      "Korba’s most powerful local digital marketplace.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-slate-950 text-white antialiased min-h-screen flex flex-col">
        
        {/* Global Premium Background Gradient */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
        
        {/* Top Glow Accent */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/20 blur-[120px] rounded-full -z-10" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow relative overflow-x-hidden">
          {children}
        </main>
        <MobileNav />


        {/* Footer */}
        <Footer />

        {/* Vercel Performance */}
        <SpeedInsights />
      </body>
    </html>
  );
}
