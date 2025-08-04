import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PortfolioSection from "@/components/PortfolioSection";
import About from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <main className="w-full">
        <div id="hero">
          <Hero />
        </div>
        <div id="services">
          <Services />
        </div>
        <PortfolioSection />
        <div id="about">
          <About />
        </div>
      </main>
    </div>
  );
};

export default Index;
