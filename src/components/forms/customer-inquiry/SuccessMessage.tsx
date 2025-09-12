import {
  CheckCircle,
  Rocket,
  Lightbulb,
  Zap,
  Home,
  Briefcase,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const SuccessMessage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get salesperson and service from URL parameters
  const salesperson = searchParams.get('salesperson');
  const service = searchParams.get('service');
  
  // Debug logging
  useEffect(() => {
    console.log("SuccessMessage: URL parameters received:", {
      salesperson,
      service,
      allParams: Object.fromEntries(searchParams.entries())
    });
  }, [salesperson, service, searchParams]);
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 text-center py-16 max-w-4xl mx-auto px-6">
        {/* Success Icon with Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
          <CheckCircle className="h-20 w-20 text-green-400 mx-auto relative animate-scale-in" />
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent animate-fade-in">
          🚀 Your Vision is Our Mission!
        </h2>

        {/* Personalized Message */}
        {salesperson && (
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-xl md:text-2xl text-cyan-300 font-semibold">
              Thank you for reaching out, {salesperson.replace(/\+/g, ' ')}!
            </p>
            {service && (
              <p className="text-lg md:text-xl text-gray-300 mt-2">
                We're excited to help you with your <span className="text-cyan-300 font-bold">{service.replace(/\+/g, ' ')}</span> project.
              </p>
            )}
          </div>
        )}

        {/* Motivational Subheading */}
        <p
          className="text-2xl md:text-3xl text-gray-200 mb-8 font-medium animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Every great app starts with a{" "}
          <span className="text-cyan-300 font-bold">bold idea</span> — and yours
          is next!
        </p>

        {/* Inspirational Quote */}
        <div
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 mb-10 backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-4">
            "The future belongs to those who believe in the beauty of their
            dreams."
          </blockquote>
          <p className="text-cyan-300 font-semibold">— Eleanor Roosevelt</p>
        </div>

        {/* Motivational Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Innovation Awaits
            </h3>
            <p className="text-gray-300">
              Your idea has the power to transform industries, solve real
              problems, and create lasting impact in the digital world.
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <Rocket className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Ready for Liftoff
            </h3>
            <p className="text-gray-300">
              Together, we'll build something extraordinary that users will
              love, businesses will adopt, and the market will celebrate.
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "1.5s" }}
          >
            <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Lightning Speed
            </h3>
            <p className="text-gray-300">
              From concept to creation, we'll move fast and build smart. Your
              vision will become reality faster than you imagined.
            </p>
          </div>
        </div>

        {/* Success Stats */}
        <div
          className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm mb-10 animate-fade-in"
          style={{ animationDelay: "1.8s" }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Join 1,500+ Visionaries Who Transformed Their Ideas Into Reality
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">500M+</div>
              <div className="text-gray-300">Users Reached</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                $2.5B+
              </div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                99.8%
              </div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm mb-10 animate-fade-in"
          style={{ animationDelay: "2.1s" }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            What Happens Next? 🎯
          </h3>
          {salesperson && (
            <p className="text-lg text-gray-300 mb-6 text-center">
              {salesperson.replace(/\+/g, ' ')} will personally review your inquiry and get back to you soon!
            </p>
          )}
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Deep Dive Analysis (24 hours)
                </h4>
                <p className="text-gray-300">
                  Our expert team will analyze your requirements and craft a
                  tailored strategy for your project's success.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Custom Proposal (48 hours)
                </h4>
                <p className="text-gray-300">
                  Receive a detailed roadmap, timeline, and investment plan
                  designed specifically for your vision.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Strategy Call (Within 3 days)
                </h4>
                <p className="text-gray-300">
                  Join a personalized consultation where we'll refine your idea
                  and plan the development journey ahead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "2.7s" }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <span>Go to Back</span>
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
