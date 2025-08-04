import React from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import WebAppsHero from "@/components/webapps/WebAppsHero";
import WebAppsPortfolio from "@/components/webapps/WebAppsPortfolio";
import WebAppsCaseStudies from "@/components/webapps/WebAppsCaseStudies";
import WebAppsFeatures from "@/components/webapps/WebAppsFeatures";
import WebAppsProcess from "@/components/webapps/WebAppsProcess";
import WebAppsCTA from "@/components/webapps/WebAppsCTA";
import LandingPageContactForm from "@/components/LandingPageContactForm";
import { Link } from "react-scroll";

interface WebAppsPageProps {
  salespersonData?: any;
  salesperson?: any;
  service?: any;
  salespersonEmail?: string;
}

const WebAppsPage = ({
  salespersonData,
  salesperson,
  service,
  salespersonEmail,
}: WebAppsPageProps) => {

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dknafpppp/image/upload/v1748810561/2150323552_rl9lps.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* <Header /> */}
      <WebAppsHero />
      <WebAppsPortfolio />
      <WebAppsCTA />
      <WebAppsCaseStudies />
      <WebAppsFeatures />
      <WebAppsProcess />
      {salespersonData && (
        <LandingPageContactForm
          salespersonData={salespersonData}
          salesperson={salesperson}
          service={service}
          salespersonEmail={salespersonEmail}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default WebAppsPage;
