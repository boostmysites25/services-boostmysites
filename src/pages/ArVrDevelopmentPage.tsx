import { Glasses, Eye, Gamepad2, Monitor, Smartphone, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';
import DynamicContactForm from '@/components/DynamicContactForm';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';
import TrustBadges from '@/components/TrustBadges';

interface ArVrDevelopmentPageProps {
  salespersonData?: any;
  salesperson?: any;
  service?: any;
  salespersonEmail?: string;
}

const ArVrDevelopmentPage = ({
  salespersonData,
  salesperson,
  service,
  salespersonEmail,
}: ArVrDevelopmentPageProps) => {
  const navigate = useNavigate();

    const handleGetStarted = () => {
    // Scroll to the nearest contact form
    const contactForms = document.querySelectorAll('section');
    let nearestForm = null;
    let minDistance = Infinity;
    
    contactForms.forEach((section) => {
      const hasContactForm = section.querySelector('form') || 
                           section.textContent.includes('Get in Touch') ||
                           section.textContent.includes('Contact');
      
      if (hasContactForm) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestForm = section;
        }
      }
    });
    
    if (nearestForm) {
      nearestForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to bottom where contact form usually is
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Glasses,
      title: 'VR Experiences',
      description: 'Immersive virtual reality applications for training, entertainment, and simulation.'
    },
    {
      icon: Eye,
      title: 'AR Solutions',
      description: 'Augmented reality apps that overlay digital content onto the real world.'
    },
    {
      icon: Gamepad2,
      title: 'Interactive Gaming',
      description: 'Engaging AR/VR games with realistic physics and interactive environments.'
    },
    {
      icon: Monitor,
      title: 'Training Simulations',
      description: 'Virtual training environments for education, healthcare, and industrial purposes.'
    },
    {
      icon: Smartphone,
      title: 'Mobile AR',
      description: 'Mobile AR applications for iOS and Android with advanced tracking capabilities.'
    },
    {
      icon: Zap,
      title: 'Real-time Rendering',
      description: 'High-performance 3D rendering and optimization for smooth user experiences.'
    }
  ];

  const process = [
    { step: '01', title: 'Conceptualization', description: 'Define AR/VR experience goals and user journey' },
    { step: '02', title: '3D Modeling', description: 'Create 3D assets, environments, and animations' },
    { step: '03', title: 'Development', description: 'Build interactive AR/VR applications' },
    { step: '04', title: 'Testing', description: 'User testing across different devices and platforms' },
    { step: '05', title: 'Deployment', description: 'Launch and ongoing performance optimization' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dqogq10ag/image/upload/v1754394533/AdobeStock_576514253-2048x1365_hyjhwi.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-green-300 via-emerald-500 to-emerald-400 bg-clip-text text-transparent inline-block animate-gradient bg-[length:400%_100%] typewriter">
                AR/VR Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Create immersive experiences with cutting-edge augmented and virtual reality technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
              >
                Start VR Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-green-400/30 rounded-xl font-semibold hover:bg-green-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View AR/VR Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection serviceId="ar-vr-development" serviceName="AR/VR Development" accentColor="green" />

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection serviceName="AR/VR Development" caseStudies={[
        {
          client: 'MedTech Training',
          industry: 'Healthcare',
          challenge: 'Need for safe surgical training environment.',
          solution: 'VR surgical simulation with haptic feedback.',
          results: ['90% skill improvement', '80% cost reduction', '95% satisfaction', 'Zero risk training'],
          testimonial: "Revolutionary VR training platform for medical education.",
          clientName: 'Dr. Amanda Foster',
          clientRole: 'Director, MedTech Training',
          clientImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
          duration: '16 weeks',
          teamSize: '6 developers'
        }
      ]} accentColor="text-green-400" />
      
      {/* Dynamic Contact Form - injected after Success Stories if URL parameters exist */}
      <DynamicContactForm 
        position="after-success-stories" 
        accentColor="green"
        backgroundColor="transparent"
      />

      {/* Features Section */}
      <section className="py-20 bg-black/80">
        {/* Green separator line */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent mb-8"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Immersive Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Push the boundaries of reality with our AR/VR development expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-green-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/80">
        {/* Green separator line */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent mb-8"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Our AR/VR Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to immersive reality with proven methodologies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <ServicePricingSection 
        serviceName="AR/VR Development" 
        pricingTiers={[
          { name: 'AR Starter', price: '$12,000', description: 'Mobile AR development', features: ['iOS/Android AR App', 'Basic 3D Tracking', 'Custom Models', 'Store Deployment'], popular: false },
          { name: 'VR Professional', price: '$35,000', description: 'Immersive VR experience', features: ['Multi-Platform VR', 'Advanced Physics', 'Hand Tracking', 'Multiplayer', 'Analytics'], popular: true },
          { name: 'Enterprise XR', price: 'Custom', description: 'Full-scale solution', features: ['Custom Platform', 'Enterprise Integration', 'Advanced Analytics', 'Cloud Infrastructure'], popular: false }
        ]}
        accentColor="text-green-400"
        buttonAccentColor="green"
      />

      {/* Separator after Pricing */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/20 to-green-500/20 relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Ready to Enter the Metaverse?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create immersive AR/VR experiences that captivate and engage your audience.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Dynamic Contact Form - handles both regular and salesperson scenarios */}
      <DynamicContactForm 
        position="bottom" 
        accentColor="green"
        backgroundColor="transparent"
      />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default ArVrDevelopmentPage;