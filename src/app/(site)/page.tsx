import { Hero } from "@/components/home/hero";
import { PartnerMarquee } from "@/components/home/partner-marquee";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsStrip } from "@/components/home/stats-strip";
import { FeaturedJobs } from "@/components/home/featured-jobs";
import { Testimonials } from "@/components/home/testimonials";
import { PortfolioSection } from "@/components/home/portfolio-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <PartnerMarquee />
      <ServicesGrid />
      <PortfolioSection />
      <StatsStrip />
      <FeaturedJobs />
      <Testimonials />
    </main>
  );
}
