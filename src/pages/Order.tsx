import { useState } from "react";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const Order = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    orderType: "",
    description: "",
  });

  const orderTypes = [
    "Agbada",
    "Kaftan",
    "Traditional Wear",
    "Trousers",
    "Full Suit",
    "Grooms-wear Package",
    "Corporate/Group Order",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    const message = `
*NEW ORDER REQUEST*
━━━━━━━━━━━━━━━━

*Personal Details*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

*Order Details*
Type: ${formData.orderType}
Description: ${formData.description}

━━━━━━━━━━━━━━━━
Sent from Twentiies Website
    `.trim();

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.orderType) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and order type.",
        variant: "destructive",
      });
      return;
    }

    const whatsappUrl = `https://wa.me/250792417246?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your order via WhatsApp chat.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Place Your Order
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Custom Order Form
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Fill in your details below. Your order will be sent directly to our WhatsApp for quick processing.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <div className="animate-fade-up">
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold text-accent-foreground flex items-center justify-center text-sm font-bold">1</span>
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6 p-6 rounded-lg bg-card border border-border">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+250 7XX XXX XXX"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="animate-fade-up stagger-2">
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold text-accent-foreground flex items-center justify-center text-sm font-bold">2</span>
                Order Details
              </h2>
              <div className="space-y-6 p-6 rounded-lg bg-card border border-border">
                <div className="space-y-2">
                  <Label htmlFor="orderType">What would you like us to make? *</Label>
                  <select
                    id="orderType"
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select order type</option>
                    {orderTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your design preferences, colors, fabric choices, special requests..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up stagger-3">
              <Button type="submit" variant="whatsapp" size="xl" className="flex-1 group">
                <MessageCircle className="w-5 h-5" />
                Send Order via WhatsApp
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Info Box */}
            <div className="p-6 rounded-lg bg-cream border border-gold/20 animate-fade-up stagger-4">
              <h3 className="font-heading font-semibold mb-3 text-charcoal">What happens next?</h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5" />
                  Your order details will be sent to our WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5" />
                  Our team will review and confirm your requirements
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5" />
                  We'll discuss pricing, timeline, and finalize details
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5" />
                  Production begins after confirmation and deposit
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
