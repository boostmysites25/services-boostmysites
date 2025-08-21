import React from "react";
import LandingPageContactForm from "@/components/LandingPageContactForm";
import { Link } from "react-scroll";
import ServiceReviewsSection from "@/components/ServiceReviewsSection";
import {
  Phone,
  Bot,
  Users,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

interface AiCallingPageProps {
  salespersonData?: any;
  salesperson?: any;
  service?: any;
  salespersonEmail?: string;
}

const AiCallingPage = ({
  salespersonData,
  salesperson,
  service,
  salespersonEmail,
}: AiCallingPageProps) => {
  const features = [
    {
      icon: Phone,
      title: "AI Voice Calls",
      description:
        "Natural-sounding AI agents that handle customer calls intelligently.",
    },
    {
      icon: Bot,
      title: "Conversational AI",
      description:
        "Advanced natural language processing for human-like conversations.",
    },
    {
      icon: Users,
      title: "Lead Qualification",
      description:
        "Automated lead scoring and qualification through intelligent conversations.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with call recording and compliance features.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Comprehensive call analytics and performance metrics.",
    },
    {
      icon: Zap,
      title: "24/7 Availability",
      description:
        "Round-the-clock calling capabilities without human limitations.",
    },
  ];

  const useCases = [
    {
      name: "Customer Support",
      description: "Automated customer service and support calls",
      features: ["Issue Resolution", "Appointment Booking", "FAQ Handling", "Escalation"],
    },
    {
      name: "Sales & Lead Generation",
      description: "AI-powered sales calls and lead qualification",
      features: ["Lead Qualification", "Appointment Setting", "Follow-up Calls", "Sales Scripts"],
    },
    {
      name: "Appointment Reminders",
      description: "Automated reminder and confirmation calls",
      features: ["Appointment Confirmation", "Reminder Calls", "Rescheduling", "No-show Prevention"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                AI Calling Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Revolutionize your communication with AI-powered calling solutions
              that engage customers and drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <Link
                to="contact"
                smooth
                offset={-100}
                className="cursor-pointer px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:from-orange-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 relative z-50"
              >
                Start Calling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ServiceReviewsSection
        serviceName="AI Calling Agency"
        accentColor="orange"
        reviews={[
          {
            id: 1,
            name: "Shruti M.",
            role: "Head of Ops",
            company: "Rentzy",
            rating: 5,
            review:
              "Automated 90% of outbound calls. Natural language is so good most customers don’t realize it’s AI.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Deepak K.",
            role: "CEO",
            company: "LoanKart365",
            rating: 5,
            review:
              "Cold-call hours dropped by 80%. The voice tech feels incredibly human and handles objections well.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Sophia A.",
            role: "Ops Manager",
            company: "QuickDrop",
            rating: 5,
            review:
              "Call routing is now fully automated. Customers get answers faster, and our agents focus on high-value tasks.",
            image:
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
          },
        ]}
      />

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Calling Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI calling capabilities that transform customer communication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized AI calling solutions for different business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  {useCase.name}
                </h3>
                <p className="text-gray-300 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm mr-2"
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
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-red-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Calling?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's implement AI calling solutions that engage customers and drive business growth.
          </p>
          <Link
            to="contact"
            smooth
            offset={-100}
            className="cursor-pointer inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold hover:from-orange-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 relative z-50"
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

export default AiCallingPage;
