// Budget options for different services
export const budgetOptions = {
  // Web Applications
  "Web Applications": [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $30,000",
    "$30,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000+",
    "Let's discuss"
  ],
  
  // Mobile Apps
  "Mobile Apps": [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000 - $500,000",
    "$500,000+",
    "Let's discuss"
  ],
  
  // SaaS Development
  "SaaS": [
    "Under $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "$1,000,000+",
    "Let's discuss"
  ],
  
  // AI Development
  "AI Development": [
    "Under $15,000",
    "$15,000 - $35,000",
    "$35,000 - $75,000",
    "$75,000 - $150,000",
    "$150,000 - $300,000",
    "$300,000 - $600,000",
    "$600,000+",
    "Let's discuss"
  ],
  
  // AI Automation
  "AI Automation": [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000 - $400,000",
    "$400,000+",
    "Let's discuss"
  ],
  
  // AI Calling
  "AI Calling": [
    "Under $8,000",
    "$8,000 - $20,000",
    "$20,000 - $40,000",
    "$40,000 - $80,000",
    "$80,000 - $150,000",
    "$150,000 - $300,000",
    "$300,000+",
    "Let's discuss"
  ],
  
  // Blockchain Development
  "Blockchain Development": [
    "Under $20,000",
    "$20,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "$1,000,000+",
    "Let's discuss"
  ],
  
  // AR/VR Development
  "AR/VR Development": [
    "Under $15,000",
    "$15,000 - $35,000",
    "$35,000 - $75,000",
    "$75,000 - $150,000",
    "$150,000 - $300,000",
    "$300,000 - $600,000",
    "$600,000+",
    "Let's discuss"
  ],
  
  // Chatbot Development
  "Chatbot Development": [
    "Under $5,000",
    "$5,000 - $12,000",
    "$12,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000+",
    "Let's discuss"
  ],
  
  // Cloud Computing
  "Cloud Computing": [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000+",
    "Let's discuss"
  ],
  
  // Data Analytics
  "Data Analytics": [
    "Under $8,000",
    "$8,000 - $20,000",
    "$20,000 - $40,000",
    "$40,000 - $80,000",
    "$80,000 - $150,000",
    "$150,000 - $300,000",
    "$300,000+",
    "Let's discuss"
  ],
  
  // Game Development
  "Game Development": [
    "Under $15,000",
    "$15,000 - $35,000",
    "$35,000 - $75,000",
    "$75,000 - $150,000",
    "$150,000 - $300,000",
    "$300,000 - $600,000",
    "$600,000+",
    "Let's discuss"
  ],
  
  // IoT Development
  "IoT Development": [
    "Under $12,000",
    "$12,000 - $30,000",
    "$30,000 - $60,000",
    "$60,000 - $120,000",
    "$120,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000+",
    "Let's discuss"
  ],
  
  // UX/UI Design
  "UX/UI Design": [
    "Under $5,000",
    "$5,000 - $12,000",
    "$12,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000+",
    "Let's discuss"
  ],
  
  // Default fallback
  "default": [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000+",
    "Let's discuss"
  ]
};

// Helper function to get budget options for a specific service
export const getBudgetOptions = (serviceName: string): string[] => {
  return budgetOptions[serviceName as keyof typeof budgetOptions] || budgetOptions.default;
};
