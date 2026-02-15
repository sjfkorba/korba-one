import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"; // Performance monitoring
import './globals.css';

// 1. FONT OPTIMIZATION
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 2. GLOBAL SEO METADATA (Brand Strategy)
export const metadata: Metadata = {
  metadataBase: new URL('https://korbaone.com'),
  title: {
    default: "Korba One | Chhattisgarh's Digital Super App",
    template: "%s | Korba One"
  },
  description: "Korba ki har zaroorat—Verified Directory, Emergency Help, aur Daily Mandi Bhav. Chhattisgarh ka sabse bharosemand digital ecosystem.",
  keywords: ["Korba One", "Korba Directory", "Mandi Bhav Chhattisgarh", "Emergency Services Korba", "Shatrughan Sharma"],
  authors: [{ name: "Shatrughan Sharma" }],
  creator: "Shatrughan Sharma",
  publisher: "Korba One Media",
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://korbaone.com",
    siteName: "Korba One",
    title: "Korba One - Sheher ki Har Zaroorat, Ek Hi Jagah",
    description: "Verified businesses aur live market rates ke liye Chhattisgarh ka digital powerhouse.",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists in your public folder
        width: 1200,
        height: 630,
        alt: "Korba One Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Korba One | Digital Chhattisgarh",
    description: "Business directory and live mandi rates.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 3. VIEWPORT CONFIGURATION (Mobile-First)
export const viewport: Viewport = {
  themeColor: '#ea580c', // Orange-600 for mobile browsers
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${inter.className} bg-white antialiased flex flex-col min-h-screen`}>
        {/* 1. Global Navigation */}
        <Navigation />

        {/* 2. Main Content Area 
            - pt-0 md:pt-20: Desktop par top-nav ke liye padding
            - pb-24 md:pb-0: Mobile par bottom-nav ke liye extra space
        */}
        <main className="flex-grow pt-0 md:pt-20 pb-24 md:pb-0 relative overflow-x-hidden">
          {children}
        </main>

        {/* 3. Performance Insights */}
        <SpeedInsights />

        {/* 4. Global Premium Footer */}
        <Footer />
      </body>
    </html>
  );
}