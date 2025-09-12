// Budget options for different services
export const budgetOptions = {
  // Web Applications - Indian Rupee format
  "Web Applications": [
    "Less than ₹1,00,000",
    "₹1,00,000 – ₹2,50,000",
    "₹2,50,000 – ₹5,00,000",
    "Greater than ₹5,00,000"
  ]
};

// Helper function to get budget options for a specific service
export const getBudgetOptions = (serviceName: string): string[] => {
  return budgetOptions[serviceName as keyof typeof budgetOptions] || [];
};
