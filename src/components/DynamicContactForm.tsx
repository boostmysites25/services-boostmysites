import React from "react";
import { useUrlParams } from "@/hooks/useUrlParams";
import SalespersonContactForm from "./forms/SalespersonContactForm";
import { Loader2 } from "lucide-react";

interface DynamicContactFormProps {
  className?: string;
  position?: "bottom" | "after-success-stories";
  demoMode?: boolean;
  accentColor?: string; // e.g., 'yellow', 'blue', 'green', etc.
  backgroundColor?: string; // e.g., 'transparent', 'black', etc.
}

const DynamicContactForm: React.FC<DynamicContactFormProps> = ({
  className = "",
  position = "bottom",
  demoMode = false,
  accentColor = "blue",
  backgroundColor = "black",
}) => {
  const {
    salesperson,
    service,
    ref,
    isValid,
    salespersonData,
    serviceData,
    isLoading,
  } = useUrlParams();

  // Use demo data if in demo mode, otherwise use URL params
  const finalData = {
    salespersonData,
    serviceData,
    ref,
  };

  // Don't render if no URL parameters or invalid (unless in demo mode)
  if (isLoading && !demoMode) {
    return (
      <div className={`flex items-center justify-center py-20 ${className}`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-400">Loading contact form...</p>
        </div>
      </div>
    );
  }

  if (!isValid && !demoMode) {
    return null;
  }

  if (!finalData?.salespersonData || !finalData?.serviceData) {
    return null;
  }

  // Get styling based on accent color
  const getAccentStyling = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          textGradient: "from-yellow-300 to-orange-400",
          buttonGradient: "from-yellow-500 to-orange-600",
          buttonHover: "hover:from-yellow-400 hover:to-orange-500",
          focusBorder: "focus:border-yellow-400",
          focusRing: "focus:ring-yellow-400/20",
        };
      case "blue":
        return {
          textGradient: "from-cyan-400 to-blue-500",
          buttonGradient: "from-cyan-500 to-blue-600",
          buttonHover: "hover:from-cyan-400 hover:to-blue-500",
          focusBorder: "focus:border-cyan-400",
          focusRing: "focus:ring-cyan-400/20",
        };
      case "green":
        return {
          textGradient: "from-green-400 to-emerald-500",
          buttonGradient: "from-green-500 to-emerald-600",
          buttonHover: "hover:from-green-400 hover:to-emerald-500",
          focusBorder: "focus:border-green-400",
          focusRing: "focus:ring-green-400/20",
        };
      case "purple":
        return {
          textGradient:
            "from-indigo-300 via-purple-500 via-indigo-400 to-purple-400",
          buttonGradient: "bg-purple-500",
          buttonHover: "hover:bg-purple-600",
          focusBorder: "focus:border-purple-400",
          focusRing: "focus:ring-purple-400/20",
        };
      case "teal":
        return {
          textGradient: "from-teal-400 to-cyan-500",
          buttonGradient: "from-teal-500 to-cyan-600",
          buttonHover: "hover:from-teal-400 hover:to-cyan-500",
          focusBorder: "focus:border-teal-400",
          focusRing: "focus:ring-teal-400/20",
        };
      case "pink":
        return {
          textGradient: "from-pink-300 to-pink-400",
          buttonGradient: "bg-pink-500",
          buttonHover: "hover:bg-pink-600",
          focusBorder: "focus:border-pink-400",
          focusRing: "focus:ring-pink-400/20",
        };
      case "indigo":
        return {
          textGradient: "from-indigo-300 to-indigo-400",
          buttonGradient: "bg-indigo-500",
          buttonHover: "hover:bg-indigo-600",
          focusBorder: "focus:border-indigo-400",
          focusRing: "focus:ring-indigo-400/20",
        };
      case "teal":
        return {
          textGradient: "from-teal-300 to-teal-400",
          buttonGradient: "bg-teal-500",
          buttonHover: "hover:bg-teal-600",
          focusBorder: "focus:border-teal-400",
          focusRing: "focus:ring-teal-400/20",
        };
      case "orange":
        return {
          textGradient: "from-orange-300 to-orange-400",
          buttonGradient: "bg-orange-500",
          buttonHover: "hover:bg-orange-600",
          focusBorder: "focus:border-orange-400",
          focusRing: "focus:ring-orange-400/20",
        };
      case "red":
        return {
          textGradient: "from-red-400 to-pink-500",
          buttonGradient: "from-red-500 to-pink-600",
          buttonHover: "hover:from-red-400 hover:to-pink-500",
          focusBorder: "focus:border-red-400",
          focusRing: "focus:ring-red-400/20",
        };
      default:
        return {
          textGradient: "from-cyan-400 to-blue-500",
          buttonGradient: "from-cyan-500 to-blue-600",
          buttonHover: "hover:from-cyan-400 hover:to-blue-500",
          focusBorder: "focus:border-cyan-400",
          focusRing: "focus:ring-cyan-400/20",
        };
    }
  };

  const styling = getAccentStyling(accentColor);

  return (
    <section
      className={`py-20 ${
        backgroundColor === "transparent"
          ? "bg-black/80"
          : "bg-gradient-to-b from-black to-gray-900"
      } ${className}`}
    >
      {/* Dynamic separator line */}
      <div
        className={`w-full h-0.5 bg-gradient-to-r from-transparent ${
          accentColor === "yellow"
            ? "via-yellow-300"
            : accentColor === "pink"
            ? "via-pink-300"
            : accentColor === "blue"
            ? "via-blue-300"
            : accentColor === "indigo"
            ? "via-indigo-300"
            : accentColor === "red"
            ? "via-red-300"
            : accentColor === "green"
            ? "via-green-300"
            : accentColor === "purple"
            ? "via-purple-300"
            : accentColor === "teal"
            ? "via-teal-300"
            : accentColor === "orange"
            ? "via-orange-300"
            : "via-cyan-300"
        } to-transparent mb-8`}
      ></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${styling.textGradient} bg-clip-text text-transparent mb-4`}
          >
            Get in Touch with {finalData.salespersonData.display_name}
          </h2>
          <p className="text-gray-300 text-lg">
            Ready to start your {finalData.serviceData.name} project? Fill out
            the form below and {finalData.salespersonData.display_name} will get
            back to you within 24 hours.
          </p>
          {finalData.ref && (
            <p className="text-sm text-gray-400 mt-2">
              Referred by: {finalData.ref}
            </p>
          )}
          {demoMode && (
            <p className={`text-xs text-${accentColor}-400 mt-2`}>
              🧪 Demo Mode - This form demonstrates the dynamic contact form
              functionality
            </p>
          )}
        </div>

        <SalespersonContactForm
          salespersonName={finalData.salespersonData.display_name}
          serviceName={finalData.serviceData.name}
          sourcePage={
            demoMode
              ? "demo-mode"
              : `${salesperson}-${service}-${ref || "direct"}`
          }
          salespersonEmail={finalData.salespersonData.email}
          className="mt-8"
          accentColor={accentColor}
        />
      </div>
    </section>
  );
};

export default DynamicContactForm;
