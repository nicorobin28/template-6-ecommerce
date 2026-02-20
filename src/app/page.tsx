import { HeroSection } from "@/components/home/hero-section";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
    </div>
  );
}
