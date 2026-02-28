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
  "Find latest jobs in Korba, local shops, services, buy & sell listings and emergency contacts. Korba One helps you discover verified businesses and job opportunities in Korba, Chhattisgarh.",
  keywords: [

  // BRAND
  "Korba One",
  "Korba One website",
  "Korba digital platform",

  // JOBS
  "Jobs in Korba",
  "Latest jobs in Korba",
  "Private jobs in Korba",
  "Part time jobs in Korba",
  "Full time jobs in Korba",
  "Job vacancy in Korba district",
  "Jobs in Katghora",
  "Jobs in Dipka",
  "Jobs in Urga",
  "Jobs in Podi Uproda",
  "Jobs in Niharika Korba",

  // SALON & SPA
  "Best salon in Korba",
  "Best spa in Korba",
  "Beauty parlour in Korba",
  "Salon in Niharika Korba",
  "Salon in Katghora",
  "Spa service in Korba district",

  // VEHICLE BUY SELL
  "Bolero for sale in Korba",
  "Used car in Korba",
  "Second hand car Korba",
  "Bike for sale in Korba",
  "Vehicle marketplace Korba",
  "Used vehicle in Katghora",
  "Car sale Dipka Korba",

  // FURNITURE
  "Furniture shop in Korba",
  "Furniture store Korba",
  "Wood furniture Korba",
  "Furniture shop Katghora",
  "Home furniture Dipka",
  "Office furniture Korba",

  // TAXI & TRANSPORT
  "Taxi service in Korba",
  "Cab booking Korba",
  "Car rental Korba",
  "Taxi in Katghora",
  "Taxi service Dipka",
  "Local transport Korba",

  // HOSPITALS & HEALTH
  "Hospitals in Korba",
  "Best hospital in Korba",
  "Clinic in Korba",
  "Doctor in Korba",
  "Hospital in Katghora",
  "Medical store Korba",
  "Emergency hospital Korba",

  // ELECTRONICS
  "Electronic shop in Korba",
  "Mobile shop Korba",
  "Laptop shop Korba",
  "TV repair Korba",
  "Electronics store Katghora",
  "Mobile repair Dipka",

  // LOCAL BUSINESS DIRECTORY
  "Shops in Korba",
  "Businesses in Korba",
  "Korba marketplace",
  "Korba business directory",
  "Local services in Korba district",

  // LOCATION COVERAGE (VERY IMPORTANT)
  "Katghora Korba services",
  "Dipka Korba businesses",
  "Urga Korba shops",
  "Niharika Korba market",
  "Podi Uproda services",
  "Korba district local marketplace",

  // DISCOVERY SEARCHES
  "Best services in Korba",
  "Near me services Korba",
  "Local shops near Korba",
  "Korba online directory",
  "Korba city services platform"
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
