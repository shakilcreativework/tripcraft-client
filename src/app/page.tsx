import Hero from "@/components/home/Hero";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyTripCraft from "@/components/home/WhyTripCraft";
import PopularDestinations from "@/components/home/PopularDestinations";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <WhyTripCraft />
      <PopularDestinations />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </>
  );
}
