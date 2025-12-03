import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "250792417246";
  const message = encodeURIComponent(
    "Hello Twentiies! I'm interested in your tailoring services."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-gold"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-background" fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;
