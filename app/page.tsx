import Hero from "@/components/Hero";
import Atmosphere from "@/components/Atmosphere";
import Pioneer from "@/components/Pioneer";
import InternationalVision from "@/components/InternationalVision";
import PressMarquee from "@/components/PressMarquee";
import Repertoire from "@/components/Repertoire";
import BoutiqueExperiences from "@/components/BoutiqueExperiences";
import Partnership from "@/components/Partnership";
import Application from "@/components/Application";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import CursorTrail from "@/components/CursorTrail";
import StickyCTA from "@/components/StickyCTA";
import PageProgress from "@/components/PageProgress";

export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <CursorTrail />
      <main className="relative">
        <Hero />
        <Atmosphere />
        <Pioneer />
        <InternationalVision />
        <PressMarquee />
        <Repertoire />
        <BoutiqueExperiences />
        <Partnership />
        <Application />
        <Footer />
      </main>
      <StickyCTA />
      <PageProgress />
    </>
  );
}
