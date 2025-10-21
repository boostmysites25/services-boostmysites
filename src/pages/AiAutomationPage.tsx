import React from "react";
import LandingPageContactForm from "@/components/LandingPageContactForm";
import { Link } from "react-scroll";
import ServiceReviewsSection from "@/components/ServiceReviewsSection";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import TrustBadges from "@/components/TrustBadges";
import DynamicContactForm from "@/components/DynamicContactForm";
import {
  Bot,
  Zap,
  Brain,
  TrendingUp,
  Shield,
  Cpu,
} from "lucide-react";

interface AiAutomationPageProps {
  salespersonData?: any;
  salesperson?: any;
  service?: any;
  salespersonEmail?: string;
}

const AiAutomationPage = ({
  salespersonData,
  salesperson,
  service,
  salespersonEmail,
}: AiAutomationPageProps) => {
  const features = [
    {
      icon: Bot,
      title: "Intelligent Automation",
      description:
        "AI-powered workflows that learn and adapt to your business processes.",
    },
    {
      icon: Zap,
      title: "Process Optimization",
      description:
        "Streamline operations with smart automation that reduces manual work.",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description:
        "Advanced ML models that improve decision-making and predictions.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with data protection and compliance standards.",
    },
    {
      icon: Cpu,
      title: "Real-time Processing",
      description:
        "Instant data processing and decision-making capabilities.",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Comprehensive insights into automation performance and ROI.",
    },
  ];

  const solutions = [
    {
      name: "Customer Service Automation",
      description: "AI chatbots and automated support systems",
      features: ["24/7 Support", "Multi-language", "Smart Routing", "Sentiment Analysis"],
    },
    {
      name: "Data Processing Automation",
      description: "Automated data extraction, processing, and analysis",
      features: ["OCR Technology", "Data Validation", "Real-time Processing", "Error Handling"],
    },
    {
      name: "Workflow Automation",
      description: "Intelligent business process automation",
      features: ["Process Mapping", "Conditional Logic", "Integration APIs", "Monitoring"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                AI Automation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your business with intelligent automation powered by
              artificial intelligence and machine learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <Link
                to="contact"
                smooth
                offset={-100}
                className="cursor-pointer px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 relative z-50"
              >
                Start Automation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Below Hero */}
      <DynamicContactForm 
        position="below-hero"
        accentColor="green"
        backgroundColor="transparent"
      />

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Automation Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge AI solutions that revolutionize business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-green-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Reviews Section */}
      <ServiceReviewsSection
        serviceName="AI Automation"
        accentColor="green"
        reviews={[
          {
            id: 1,
            name: "Ali R.",
            role: "CTO",
            company: "Medicare Desk",
            rating: 5,
            review:
              "They automated internal workflows end-to-end. Our operations are lightning-fast and error rates have plummeted.",
            image:
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Megha S.",
            role: "Co-founder",
            company: "LearnChamp",
            rating: 5,
            review:
              "Lead qualification went from hours to minutes. The automation stack integrates perfectly with our CRM.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Junaid A.",
            role: "CTO",
            company: "BizPulse",
            rating: 5,
            review:
              "Custom automation engine pulls data, triggers workflows, and sends AI-written emails—total lifesaver.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
        ]}
      />

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Automation Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized AI automation solutions for different business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-green-400">
                  {solution.name}
                </h3>
                <p className="text-gray-300 mb-6">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm mr-2"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's implement AI automation that transforms your operations and drives efficiency.
          </p>
          <Link
            to="contact"
            smooth
            offset={-100}
            className="cursor-pointer inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 relative z-50"
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
      <FloatingWhatsAppButton />
    </div>
  );
};

export default AiAutomationPage;
