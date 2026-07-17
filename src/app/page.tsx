import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyTripCraft from "@/components/home/WhyTripCraft";
import PopularDestinations from "@/components/home/PopularDestinations";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedPackages />
        <WhyTripCraft />
        <PopularDestinations />
        <Statistics />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
