import Hero from "@/components/Hero";
import Atmosphere from "@/components/Atmosphere";
import Pioneer from "@/components/Pioneer";
import Repertoire from "@/components/Repertoire";
import PressMarquee from "@/components/PressMarquee";
import Application from "@/components/Application";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import CursorTrail from "@/components/CursorTrail";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <CursorTrail />
      <main className="relative">
        <Hero />
        <Atmosphere />
        <Pioneer />
        <Repertoire />
        <PressMarquee />
        <Application />
        <Footer />
      </main>
      <StickyCTA />
    </>
  );
}
