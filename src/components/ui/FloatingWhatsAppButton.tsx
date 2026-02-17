import { useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { formatPhoneForWhatsApp } from "@/lib/utils";

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const FloatingWhatsAppButton = ({
  phoneNumber,
}: FloatingWhatsAppButtonProps) => {
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);

  // If no phone number provided, don't render the buttons
  if (!phoneNumber) {
    return null;
  }

  // Format phone number for WhatsApp and tel link (strip non-digits for tel)
  const formattedPhone = formatPhoneForWhatsApp(phoneNumber);
  const whatsappUrl = `https://wa.me/${formattedPhone}`;
  const telUrl = `tel:${phoneNumber.replace(/\D/g, "")}`;

  return (
    <>
      {/* Call Now - left bottom */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href={telUrl}
          className="group relative flex items-center"
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          aria-label="Call us now"
        >
          {/* Tooltip */}
          {/* <div
            className={`absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform ${
              isCallHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            Call Now
            <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div> */}

          {/* Button */}
          <div className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 animate-pulse">
            <FaPhone className="h-6 w-6 text-white" />
          </div>

          {/* Pulse animation ring */}
          <div className="absolute inset-0 w-14 h-14 bg-green-600 rounded-full animate-ping opacity-20"></div>
        </a>
      </div>

      {/* WhatsApp - right bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center"
          onMouseEnter={() => setIsWhatsAppHovered(true)}
          onMouseLeave={() => setIsWhatsAppHovered(false)}
          aria-label="Chat with us on WhatsApp"
        >
          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform ${
              isWhatsAppHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            Contact Us
            <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>

          {/* Button */}
          <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 animate-pulse">
            <FaWhatsapp className="h-7 w-7 text-white" />
          </div>

          {/* Pulse animation ring */}
          <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
        </a>
      </div>
    </>
  );
};

export default FloatingWhatsAppButton;
