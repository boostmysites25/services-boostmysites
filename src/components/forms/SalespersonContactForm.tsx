import { useState } from "react";
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
import { customerInquiryService } from "@/services/customerInquiryService";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  Send,
} from "lucide-react";
import axios from "axios";

const salespersonFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SalespersonFormData = z.infer<typeof salespersonFormSchema>;

interface SalespersonContactFormProps {
  salespersonName: string;
  serviceName: string;
  sourcePage?: string;
  salespersonEmail?: string;
  onSuccess?: () => void;
  className?: string;
}

const SalespersonContactForm = ({
  salespersonName,
  serviceName,
  sourcePage = "sales-service",
  salespersonEmail,
  className = "",
}: SalespersonContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SalespersonFormData>({
    resolver: zodResolver(salespersonFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

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
      "\n\n" +
      "Message : " +
      data.message;
    const payload = {
      body,
      name: "Form Submission",
      subject: data.subject,
      to: salespersonEmail,
    };

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

        navigate("/thank-you");
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-lg">
            Ready to start your project? Fill out the form below and{" "}
            {salespersonName} will get back to you within 24 hours.
          </p>
        </div>

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
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
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
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
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
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
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
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center gap-2 font-medium">
                    <MessageSquare className="h-4 w-4" />
                    Message *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project, requirements, or any questions you have..."
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 min-h-[140px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Message to{" "}
                  <span className="capitalize">{salespersonName}</span>
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
