import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import useReveal from "./hooks/useReveal";

export default function App() {
  useReveal();

  return (
    <div style={{ minHeight: "100%", background: "var(--background)" }}>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
