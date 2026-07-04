import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Resources from "@/components/landing/Resources";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Resources />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
