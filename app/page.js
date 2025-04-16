import Header from "../components/header.js";
import Hero from "../components/hero.js";
import Features from "../components/features.js";
import HowItWorks from "../components/howItWorks.js";
import Testimonials from "../components/testimonials.js";
import Pricing from "../components/pricing.js";
import FAQ from "../components/faq.js";
import Footer from "../components/footer.js";

export default function Page() {
  return (
    <div className="">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 pt-[100vh]">
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}
