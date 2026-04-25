import Hero from "@/components/Hero";
import Atmosphere from "@/components/Atmosphere";
import Pioneer from "@/components/Pioneer";
import Repertoire from "@/components/Repertoire";
import Application from "@/components/Application";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Atmosphere />
      <Pioneer />
      <Repertoire />
      <Application />
      <Footer />
    </main>
  );
}
