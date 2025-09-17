import Contact from '@/components/Contact';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <main className="pt-16">
        <Contact />
      </main>
      <FloatingWhatsAppButton />
    </div>
  );
};

export default ContactPage;
