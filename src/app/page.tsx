import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustedPartner from "@/components/sections/TrustedPartner";
import Services from "@/components/sections/Services";
import FeaturedTours from "@/components/sections/FeaturedTours";
import EmploymentJapan from "@/components/sections/EmploymentJapan";
import LanguageExchange from "@/components/sections/LanguageExchange";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-ink">
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Who We Are / Trusted Partner */}
        <TrustedPartner />

        {/* Section 3: What We Do / Services */}
        <Services />

        {/* Section 4: Popular Tours */}
        <FeaturedTours />

        {/* Section 5: Employment in Japan */}
        <EmploymentJapan />

        {/* Section 6: Language Exchange */}
        <LanguageExchange />

        {/* Section 7: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 8: Testimonials */}
        <Testimonials />

        {/* Section 9: Frequently Asked Questions */}
        <FAQ />

        {/* Section 10: Call to Action / Contact */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
