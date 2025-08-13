import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  salespersonLinkService,
  AVAILABLE_SERVICES,
} from "@/services/salespersonLinkService";
import { Loader2 } from "lucide-react";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import { GoogleTagInjector } from "@/components/GoogleTagInjector";

// Import service page components
import WebAppsPage from "./WebAppsPage";
import MobileAppsPage from "./MobileAppsPage";
import SaasPage from "./SaasPage";
import AiAutomationPage from "./AiAutomationPage";
import AiCallingPage from "./AiCallingPage";
import AiDevelopmentPage from "./AiDevelopmentPage";
import BlockchainDevelopmentPage from "./BlockchainDevelopmentPage";
import ArVrDevelopmentPage from "./ArVrDevelopmentPage";
import ChatbotDevelopmentPage from "./ChatbotDevelopmentPage";
import CloudComputingPage from "./CloudComputingPage";
import DataAnalyticsPage from "./DataAnalyticsPage";
import GameDevelopmentPage from "./GameDevelopmentPage";
import IotDevelopmentPage from "./IotDevelopmentPage";
import UxuiDesignPage from "./UxuiDesignPage";

const SalespersonServicePage = () => {
  const { salesperson, service } = useParams<{
    salesperson: string;
    service: string;
  }>();

  // Query to validate salesperson and service combination
  const {
    data: salespersonData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["salesperson-validation", salesperson, service],
    queryFn: async () => {
      if (!salesperson || !service) {
        throw new Error("Missing parameters");
      }

      const salespersons = await salespersonLinkService.getSalespersonLinks();
      const foundSalesperson = salespersons.find(
        (sp) => sp.salesperson_name === salesperson && sp.is_active
      );

      if (!foundSalesperson) {
        throw new Error("Salesperson not found or inactive");
      }

      if (!foundSalesperson.services.includes(service)) {
        throw new Error("Service not authorized for this salesperson");
      }

      const serviceInfo = AVAILABLE_SERVICES.find((s) => s.id === service);
      if (!serviceInfo) {
        throw new Error("Invalid service");
      }

      return {
        salesperson: foundSalesperson,
        service: serviceInfo,
      };
    },
    retry: false,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-white">Validating salesperson link...</p>
        </div>
      </div>
    );
  }

  // Error state - redirect to 404
  if (error || !salespersonData) {
    return <Navigate to="/404" replace />;
  }

  // Render the appropriate service page component
  const renderServicePage = () => {
    switch (service) {
      case "web-apps":
        return (
          <WebAppsPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "mobile-apps":
        return (
          <MobileAppsPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "saas":
        return (
          <SaasPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "ai-automation":
        return (
          <AiAutomationPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "ai-calling":
        return (
          <AiCallingPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "ai-development":
        return (
          <AiDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "blockchain-development":
        return (
          <BlockchainDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "ar-vr-development":
        return (
          <ArVrDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "chatbot-development":
        return (
          <ChatbotDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "cloud-computing":
        return (
          <CloudComputingPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "data-analytics":
        return (
          <DataAnalyticsPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "game-development":
        return (
          <GameDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "iot-development":
        return (
          <IotDevelopmentPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      case "ux-ui-design":
        return (
          <UxuiDesignPage
            salespersonData={salespersonData}
            salesperson={salesperson}
            service={service}
            salespersonEmail={salespersonData.salesperson.email}
          />
        );
      default:
        return <Navigate to="/404" replace />;
    }
  };

  return (
    <div className="relative">
      {/* Inject Google Tags from salesperson data */}
      <GoogleTagInjector salespersonData={salespersonData.salesperson} />
      
      {/* Salesperson Banner */}
      <div className="fixed top-0 left-0 right-0 z-[999] bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center text-center">
            <div className="text-white">
              <p className="text-sm font-medium">
                You're working with{" "}
                <span className="font-bold capitalize">
                  {salespersonData.salesperson.display_name}
                </span>
              </p>
              <p className="text-xs opacity-90">
                Mail to:{" "}
                <a
                  href={`mailto:${salespersonData.salesperson.email}`}
                  className="underline hover:no-underline"
                >
                  {salespersonData.salesperson.email}
                </a>
                {salespersonData.salesperson.phone && (
                  <>
                    {" • "}
                    <a
                      href={`tel:${salespersonData.salesperson.phone}`}
                      className="underline hover:no-underline"
                    >
                      Call: {salespersonData.salesperson.phone}
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add top padding to account for the fixed banner */}
      <div className="pt-16">{renderServicePage()}</div>

      {/* WhatsApp Button - only show if salesperson has a phone number */}
      <FloatingWhatsAppButton phoneNumber={salespersonData.salesperson.phone} />
    </div>
  );
};

export default SalespersonServicePage;
