import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customerInquiryService } from "@/services/customerInquiryService";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  Send,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { getBudgetOptions } from "@/lib/budgetOptions";

const salespersonFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  budget: z.string().optional(),
  intent: z.string().min(1, "Please select your intent"),
  purpose: z.string().optional(),
});

type SalespersonFormData = z.infer<typeof salespersonFormSchema>;

interface SalespersonContactFormProps {
  salespersonName: string;
  serviceName: string;
  sourcePage?: string;
  salespersonEmail?: string;
  onSuccess?: () => void;
  className?: string;
  accentColor?: string;
  /** 
   * Custom budget options for the dropdown. If not provided, 
   * service-specific options will be used based on serviceName.
   * If empty array or no options available, budget field will be hidden.
   * @example ["Less than ₹1,00,000", "₹1,00,000 – ₹2,50,000", "Let's discuss"]
   */
  budgetOptions?: string[];
  /** Service-specific intent question */
  intentQuestion?: string;
}

const SalespersonContactForm = ({
  salespersonName,
  serviceName,
  sourcePage = "sales-service",
  salespersonEmail,
  className = "",
  accentColor = "blue",
  budgetOptions = getBudgetOptions(serviceName),
  intentQuestion,
}: SalespersonContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Create dynamic schema based on whether budget options are available
  const dynamicSchema = budgetOptions.length > 0 
    ? salespersonFormSchema.extend({
        budget: z.string().min(1, "Please select a budget range"),
      })
    : salespersonFormSchema;

  const form = useForm<SalespersonFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      budget: "",
      intent: "",
      purpose: "",
    },
  });

  // Watch intent for conditional validation
  const watchedIntent = form.watch("intent");

  // Custom validation for purpose field
  const validatePurpose = (value: string) => {
    if (watchedIntent && watchedIntent !== "") {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      if (words.length < 10) {
        return watchedIntent === "yes" 
          ? "Please provide at least 10 words describing your project purpose"
          : "Please provide at least 10 words explaining your inquiry";
      }
    }
    return true;
  };

  // Get styling based on accent color
  const getAccentStyling = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          focusBorder: "focus:border-yellow-400",
          focusRing: "focus:ring-yellow-400/20",
          buttonGradient: "from-yellow-500 to-orange-600",
          buttonHover: "hover:from-yellow-400 hover:to-orange-500",
        };
      case "blue":
        return {
          focusBorder: "focus:border-cyan-400",
          focusRing: "focus:ring-cyan-400/20",
          buttonGradient: "from-cyan-500 to-blue-600",
          buttonHover: "hover:from-cyan-400 hover:to-blue-500",
        };
      case "green":
        return {
          focusBorder: "focus:border-green-400",
          focusRing: "focus:ring-green-400/20",
          buttonGradient: "bg-green-500",
          buttonHover: "hover:bg-green-600",
        };
      case "purple":
        return {
          focusBorder: "focus:border-purple-400",
          focusRing: "focus:ring-purple-400/20",
          buttonGradient: "bg-purple-500",
          buttonHover: "hover:bg-purple-600",
        };
      case "teal":
        return {
          focusBorder: "focus:border-teal-400",
          focusRing: "focus:ring-teal-400/20",
          buttonGradient: "from-teal-500 to-cyan-600",
          buttonHover: "hover:from-teal-400 hover:to-cyan-500",
        };
      case "pink":
        return {
          focusBorder: "focus:border-pink-400",
          focusRing: "focus:ring-pink-400/20",
          buttonGradient: "bg-pink-500",
          buttonHover: "hover:bg-pink-600",
        };
      case "indigo":
        return {
          focusBorder: "focus:border-indigo-400",
          focusRing: "focus:ring-indigo-400/20",
          buttonGradient: "bg-indigo-500",
          buttonHover: "hover:bg-indigo-600",
        };
      case "orange":
        return {
          focusBorder: "focus:border-orange-400",
          focusRing: "focus:ring-orange-400/20",
          buttonGradient: "bg-orange-500",
          buttonHover: "hover:bg-orange-600",
        };
      case "red":
        return {
          focusBorder: "focus:border-red-400",
          focusRing: "focus:ring-red-400/20",
          buttonGradient: "from-red-500 to-pink-600",
          buttonHover: "hover:from-red-400 hover:to-pink-500",
        };
      default:
        return {
          focusBorder: "focus:border-cyan-400",
          focusRing: "focus:ring-cyan-400/20",
          buttonGradient: "from-cyan-500 to-blue-600",
          buttonHover: "hover:from-cyan-400 hover:to-blue-500",
        };
    }
  };

  const styling = getAccentStyling(accentColor);

  const onSubmit = async (data: SalespersonFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const body =
      "Full Name : " +
      data.fullName +
      "\n\n" +
      "Email : " +
      data.email +
      "\n\n" +
      "Phone : " +
      data.phone +
      "\n\n" +
      "Subject : " +
      data.subject +
      "\n\n" +
      "Service : " +
      serviceName +
      (data.budget ? "\n\nBudget : " + data.budget : "") +
      `\n\nIntent : ${data.intent === "yes" ? "Needs Service" : "Just Exploring/Inquiring"}` +
      (data.purpose ? `\n\n${data.intent === "yes" ? "Project Purpose" : "Inquiry Reason"} : ${data.purpose}` : "");
    const payload = {
      body,
      name: "Form Submission",
      subject: data.subject,
      to: salespersonEmail,
    };

    console.log(salespersonEmail);

    try {
      const res = await axios.post(
        "https://send-mail-redirect-boostmysites.vercel.app/send-email",
        payload
      );

      toast({
        title: "Message Sent Successfully! 🎉",
        description: `The team will get back to you within 24 hours.`,
      });

      if (res.data.success) {
        console.log("SalespersonContactForm: Calling onSuccess callback");
        // Reset form
        form.reset();

        // Pass salesperson information to thank you page
        const params = new URLSearchParams();
        if (salespersonName) params.append("salesperson", salespersonName);
        if (serviceName) params.append("service", serviceName);

        const thankYouUrl = `/thank-you?${params.toString()}`;
        console.log("SalespersonContactForm: Navigating to:", thankYouUrl);
        navigate(thankYouUrl);
      }
    } catch (error) {
      const errorMessage =
        "There was an error sending your message. Please try again.";
      console.log(error);
      setSubmitError(errorMessage);

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log("SalespersonContactForm: Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className={`max-w-2xl mx-auto ${className}`}>
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
              <div className="flex items-center space-x-3 p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{submitError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                      <User className="h-4 w-4" />
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                      <MessageSquare className="h-4 w-4" />
                      Subject *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's this about?"
                        className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Budget field - only show if budget options are available */}
            {budgetOptions.length > 0 && (
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                      <DollarSign className="h-4 w-4" />
                      Budget Range *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={`bg-gray-800/50 border-gray-600 text-white ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {budgetOptions.map((option) => (
                          <SelectItem 
                            key={option} 
                            value={option}
                            className="text-white hover:bg-gray-700 focus:bg-gray-400"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
             )}

             {/* Intent validation fields */}
             {intentQuestion && (
               <>
                 <FormField
                   control={form.control}
                   name="intent"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                         <MessageSquare className="h-4 w-4" />
                         {intentQuestion} *
                       </FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className={`bg-gray-800/50 border-gray-600 text-white ${styling.focusBorder} ${styling.focusRing} transition-all duration-300`}>
                             <SelectValue placeholder="Please select your answer" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent className="bg-gray-800 border-gray-600">
                           <SelectItem value="yes" className="text-white hover:bg-gray-700">
                             Yes, I need this service
                           </SelectItem>
                           <SelectItem value="no" className="text-white hover:bg-gray-700">
                             No, I'm just exploring/inquiring
                           </SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage className="text-red-400" />
                     </FormItem>
                   )}
                 />

                 {/* Purpose field - only show if intent is selected */}
                 {watchedIntent && (
                   <FormField
                     control={form.control}
                     name="purpose"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                           {watchedIntent === "yes" ? (
                             <>
                               <CheckCircle className="h-4 w-4 text-green-400" />
                               Project Purpose *
                             </>
                           ) : (
                             <>
                               <AlertCircle className="h-4 w-4 text-yellow-400" />
                               Reason for Inquiry *
                             </>
                           )}
                         </FormLabel>
                         <FormControl>
                           <Textarea
                             placeholder={
                               watchedIntent === "yes"
                                 ? "Please describe your project requirements, goals, and how this service will help your business. Be as detailed as possible (minimum 10 words)."
                                 : "Please explain why you're contacting us and what information you're looking for. This helps us provide better assistance (minimum 10 words)."
                             }
                             className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 ${styling.focusBorder} ${styling.focusRing} transition-all duration-300 min-h-[120px] resize-none`}
                             {...field}
                             onChange={(e) => {
                               field.onChange(e);
                               // Trigger validation
                               const validation = validatePurpose(e.target.value);
                               if (validation !== true) {
                                 form.setError("purpose", { message: validation });
                               } else {
                                 form.clearErrors("purpose");
                               }
                             }}
                           />
                         </FormControl>
                         <p className="text-sm text-gray-400 mt-1">
                           {field.value?.trim().split(/\s+/).filter(word => word.length > 0).length || 0}/10 words minimum
                         </p>
                         <FormMessage className="text-red-400" />
                       </FormItem>
                     )}
                   />
                 )}
               </>
             )}

             <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${styling.buttonGradient} text-white py-4 text-lg ${styling.buttonHover} transition-all duration-300 font-semibold shadow-lg hover:shadow-${accentColor}-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-xl`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Submit
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SalespersonContactForm;
