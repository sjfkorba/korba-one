
import OfferCarousel from "@/components/landing/OfferCarousel";
import SmartSearch from "@/components/landing/SmartSearch";
import PremiumShops from "@/components/landing/PremiumShops";
import HeroSection from "@/components/landing/HeroBanner";
import JobsGrid from "@/components/landing/JobsGrid";
import BuySellGrid from "@/components/landing/BuySellGrid";
import ServicesGrid from "@/components/landing/ServicesGrid";



export default function Home() {
  return (
    <>
      <HeroSection />
      <OfferCarousel />
      <SmartSearch />
      <PremiumShops />
      <JobsGrid />
      <BuySellGrid />
      <ServicesGrid />


    </>
  );
}
