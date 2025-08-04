import React from "react";
import SalespersonContactForm from "./forms/SalespersonContactForm";

const LandingPageContactForm = ({ salespersonData, salesperson, service, salespersonEmail }) => {
  return (
    <>
      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <SalespersonContactForm
            salespersonName={salespersonData.salesperson.display_name}
            serviceName={salespersonData.service.name}
            sourcePage={`salesperson-${salesperson}-${service}`}
            salespersonEmail={salespersonEmail}
            className="mt-8"
          />
        </div>
      </section>
    </>
  );
};

export default LandingPageContactForm;
