import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/landing/AnimatedBackground";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Resources from "@/components/landing/Resources";
import CTA from "@/components/landing/CTA";
import CourseBundleBanner from "@/components/landing/CourseBundleBanner";

export default function Home() {
  // Landing page with course bundle banner
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <CourseBundleBanner currentCourse="ts" />
      <main id="main-content" className="flex-1 relative z-10">
        <section id="inicio">
          <Hero />
        </section>
        <section id="caracteristicas">
          <Features />
        </section>
        <section id="recursos">
          <Resources />
        </section>
        <section id="cta">
          <CTA />
        </section>
      </main>
      <Footer />
    </>
  );
}
