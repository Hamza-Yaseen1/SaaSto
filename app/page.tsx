import CTA from "./Components/CTA";
import Features from "./Components/Features";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import Stats from "./Components/Stats";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
    <>
     <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
      
    </>
  );
}
