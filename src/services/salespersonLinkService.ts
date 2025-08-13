import { supabase } from "@/integrations/supabase/client";

export interface SalespersonLink {
  id?: string;
  salesperson_name: string;
  display_name: string;
  email: string;
  phone?: string | null;
  services: string[];
  is_active: boolean;
  conversion_tag?: string | null;
  gtag_script?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const AVAILABLE_SERVICES = [
  { id: "web-apps", name: "Web Applications" },
  { id: "saas", name: "SAAS Solutions" },
  { id: "mobile-apps", name: "Mobile Applications" },
  { id: "ai-automation", name: "AI Automation" },
  { id: "ai-calling", name: "AI Calling" },
  { id: "ai-development", name: "AI Development" },
  { id: "blockchain-development", name: "Blockchain Development" },
  { id: "ar-vr-development", name: "AR/VR Development" },
  { id: "chatbot-development", name: "Chatbot Development" },
  { id: "cloud-computing", name: "Cloud Computing" },
  { id: "data-analytics", name: "Data Analytics" },
  { id: "game-development", name: "Game Development" },
  { id: "iot-development", name: "IoT Development" },
  { id: "ux-ui-design", name: "UX/UI Design" },
];

export const salespersonLinkService = {
  async getSalespersonLinks(): Promise<SalespersonLink[]> {
    const { data, error } = await supabase
      .from("salesperson_links")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching salesperson links:", error);
      throw error;
    }

    return data || [];
  },

  async createSalespersonLink(
    salesperson: Omit<SalespersonLink, "id" | "created_at" | "updated_at">
  ): Promise<SalespersonLink> {
    // Sanitize salesperson name for URL
    const sanitizedName = salesperson.salesperson_name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const { data, error } = await supabase
      .from("salesperson_links")
      .insert({
        ...salesperson,
        salesperson_name: sanitizedName,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating salesperson link:", error);
      throw error;
    }

    return data;
  },

  async updateSalespersonLink(
    id: string,
    updates: Partial<SalespersonLink>
  ): Promise<SalespersonLink> {
    if (updates.salesperson_name) {
      updates.salesperson_name = updates.salesperson_name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const { data, error } = await supabase
      .from("salesperson_links")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating salesperson link:", error);
      throw error;
    }

    return data;
  },

  async deleteSalespersonLink(id: string): Promise<void> {
    const { error } = await supabase
      .from("salesperson_links")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting salesperson link:", error);
      throw error;
    }
  },

  generateLinks(
    salesperson: SalespersonLink
  ): Array<{
    service: string;
    url: string;
    serviceName: string;
    refUrl: string;
  }> {
    // Long-term solution: Environment-aware URL generation
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("localhost");

    // Use environment variable if available, otherwise use defaults
    const productionUrl =
      import.meta.env.VITE_PRODUCTION_URL || "https://services.boostmysites.in";

    const baseUrl = isDevelopment
      ? `${window.location.protocol}//${window.location.host}` // http://localhost:8080
      : productionUrl; // Production URL from env var or default

    console.log("🔍 DEBUG: generateLinks called");
    console.log("🔍 DEBUG: isDevelopment =", isDevelopment);
    console.log(
      "🔍 DEBUG: window.location.hostname =",
      window.location.hostname
    );
    console.log("🔍 DEBUG: productionUrl =", productionUrl);
    console.log("🔍 DEBUG: baseUrl =", baseUrl);
    console.log("🔍 DEBUG: salesperson =", salesperson);

    return salesperson.services.map((serviceId) => {
      const service = AVAILABLE_SERVICES.find((s) => s.id === serviceId);

      const url = `${baseUrl}/${salesperson.salesperson_name}/${serviceId}`;

      console.log("🔍 DEBUG: Generated URL =", url);

      return {
        service: serviceId,
        url: url,
        refUrl: url, // Same as url since we're not using redundant ref parameter
        serviceName: service?.name || serviceId,
      };
    });
  },

  // New method to parse URL parameters and extract salesperson info
  parseUrlParams(url: string): {
    salesperson?: string;
    service?: string;
    ref?: string;
  } {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/").filter(Boolean);
      const ref = urlObj.searchParams.get("ref");

      if (pathParts.length >= 2) {
        return {
          salesperson: pathParts[0],
          service: pathParts[1],
          ref: ref || undefined,
        };
      }

      return {};
    } catch (error) {
      console.error("Error parsing URL params:", error);
      return {};
    }
  },

  // New method to validate if a salesperson-service combination is valid
  async validateSalespersonService(
    salesperson: string,
    service: string
  ): Promise<{ valid: boolean; salespersonData?: any; serviceData?: any }> {
    try {
      const salespersons = await this.getSalespersonLinks();
      const foundSalesperson = salespersons.find(
        (sp) => sp.salesperson_name === salesperson && sp.is_active
      );

      if (!foundSalesperson) {
        return { valid: false };
      }

      if (!foundSalesperson.services.includes(service)) {
        return { valid: false };
      }

      const serviceInfo = AVAILABLE_SERVICES.find((s) => s.id === service);
      if (!serviceInfo) {
        return { valid: false };
      }

      return {
        valid: true,
        salespersonData: foundSalesperson,
        serviceData: serviceInfo,
      };
    } catch (error) {
      console.error("Error validating salesperson service:", error);
      return { valid: false };
    }
  },
};
