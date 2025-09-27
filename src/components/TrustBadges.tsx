import React from 'react';
import { CheckCircle, FileText, CreditCard, Shield, Award } from 'lucide-react';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const TrustBadges: React.FC = () => {
  const badges: TrustBadge[] = [
    {
      icon: <Award className="h-8 w-8 text-green-400" />,
      title: "Certificate of Incorporation",
      subtitle: "Approved"
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-400" />,
      title: "Memorandum of Association",
      subtitle: "Approved"
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      title: "Articles of Association",
      subtitle: "Approved"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-400" />,
      title: "Company PAN",
      subtitle: "Verified"
    },
    {
      icon: <Shield className="h-8 w-8 text-cyan-400" />,
      title: "Company TAN",
      subtitle: "Verified"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-t border-b border-gray-700/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Certified</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are a legally registered and verified company with all necessary certifications and compliance documents.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-full border border-gray-600/50 group-hover:border-cyan-400/50 transition-colors duration-300">
                    {badge.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-white font-semibold text-sm mb-2 leading-tight">
                  {badge.title}
                </h3>
                
                {/* Subtitle */}
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    {badge.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            All documents are verified and up-to-date. We maintain full compliance with Indian business regulations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
