import React from "react";
import LandingPageContactForm from "@/components/LandingPageContactForm";
import { Link } from "react-scroll";
import ServiceReviewsSection from "@/components/ServiceReviewsSection";
import {
  Cloud,
  Zap,
  Users,
  Shield,
  BarChart3,
  CreditCard,
} from "lucide-react";

interface SaasPageProps {
  salespersonData?: any;
  salesperson?: any;
  service?: any;
  salespersonEmail?: string;
}

const SaasPage = ({
  salespersonData,
  salesperson,
  service,
  salespersonEmail,
}: SaasPageProps) => {
  const features = [
    {
      icon: Cloud,
      title: "Multi-Tenant Architecture",
      description:
        "Scalable infrastructure that serves multiple customers efficiently.",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description:
        "Live dashboards and insights to track user behavior and business metrics.",
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Comprehensive user authentication, authorization, and role management.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with encryption, compliance, and audit trails.",
    },
    {
      icon: BarChart3,
      title: "Subscription Management",
      description:
        "Flexible billing and subscription handling with multiple payment options.",
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description:
        "Seamless integration with major payment processors and gateways.",
    },
  ];

  const modules = [
    {
      name: "User Dashboard",
      description: "Personalized user interface with role-based access",
      features: ["Customizable Widgets", "Real-time Notifications", "Data Export"],
    },
    {
      name: "Admin Panel",
      description: "Comprehensive administration and management tools",
      features: ["User Management", "Analytics Dashboard", "System Settings"],
    },
    {
      name: "API Gateway",
      description: "Secure API management with rate limiting and monitoring",
      features: ["Authentication", "Rate Limiting", "API Documentation"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                SAAS Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Build scalable software-as-a-service platforms that drive recurring
              revenue and user engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <Link
                to="contact"
                smooth
                offset={-100}
                className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 relative z-50"
              >
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SAAS Platform Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade features designed for scalability and user satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Platform Modules</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Essential modules that power your SAAS platform and user experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-400">
                  {module.name}
                </h3>
                <p className="text-gray-300 mb-6">{module.description}</p>
                <div className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm mr-2"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ServiceReviewsSection
        serviceName="SaaS Solutions"
        accentColor="blue"
        reviews={[
          {
            id: 1,
            name: "Aparna R.",
            role: "Founder",
            company: "EduFlex LMS",
            rating: 5,
            review:
              "From ideation to launch, they built a robust multi-tenant SaaS with subscriptions, analytics, and zero-downtime releases.",
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Taran V.",
            role: "Founder",
            company: "InvoicePro",
            rating: 5,
            review:
              "Billing, roles, audit logs—everything just works. Our MRR is growing steadily since launch.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Linda S.",
            role: "CMO",
            company: "HostEase",
            rating: 5,
            review:
              "The architecture is clean and scalable. Feature shipping is fast thanks to their developer tooling.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Launch Your SAAS Platform?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build a scalable SAAS solution that drives growth and user satisfaction.
          </p>
          <Link
            to="contact"
            smooth
            offset={-100}
            className="cursor-pointer inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 relative z-50"
          >
            Get Started
          </Link>
        </div>
      </section>

      {salespersonData && (
        <LandingPageContactForm
          salespersonData={salespersonData}
          salesperson={salesperson}
          service={service}
          salespersonEmail={salespersonEmail}
        />
      )}
    </div>
  );
};

export default SaasPage;
