import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Copy, Check, MapPin, Phone, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const MOMO_CODE = "1952888";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [showMomoDialog, setShowMomoDialog] = useState(true);
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    additionalNotes: "",
  });

  const formatPrice = (price: number) => {
    const item = items[0];
    const currency = item?.category?.includes("RWF") ? "RWF" : "₦";
    return `${currency}${price.toLocaleString()}`;
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(MOMO_CODE);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "MoMo code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmed = () => {
    setPaymentConfirmed(true);
    setShowMomoDialog(false);
    toast({
      title: "Great!",
      description: "Now fill in your delivery details.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: "Missing details",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const itemsList = items
      .map(
        (item) =>
          `• ${item.name}${item.size ? ` (Size: ${item.size})` : ""} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const message = `
*ORDER FROM TWENTIIES*
━━━━━━━━━━━━━━━━

${itemsList}

━━━━━━━━━━━━━━━━
*Total: ${formatPrice(totalPrice)}*

*DELIVERY DETAILS*
━━━━━━━━━━━━━━━━
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Address:* ${formData.address}
*City:* ${formData.city}
${formData.additionalNotes ? `*Notes:* ${formData.additionalNotes}` : ""}

*Payment made via MoMo (${MOMO_CODE})*
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/250792417246?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp.",
    });
    navigate("/");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-charcoal text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
              Checkout
            </span>
            <h1 className="text-3xl md:text-6xl font-heading font-semibold mt-3 md:mt-4 mb-4 md:mb-6">
              Complete Your Order
            </h1>
          </div>
        </div>
      </section>

      {/* MoMo Payment Dialog */}
      <Dialog open={showMomoDialog} onOpenChange={setShowMomoDialog}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-heading text-center">
              Pay with Mobile Money
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Send your payment to the MoMo code below
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 md:space-y-6 py-2 md:py-4">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-1">Total Amount</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-gold">
                {formatPrice(totalPrice)}
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 md:p-6 text-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">MoMo Code</p>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="text-2xl md:text-4xl font-mono font-bold tracking-wider">
                  {MOMO_CODE}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-md hover:bg-background transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center text-xs md:text-sm text-muted-foreground px-2">
              <p>After sending payment, click the button below to continue</p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handlePaymentConfirmed}
            >
              I've Made Payment
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Details Form */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container max-w-2xl px-4">
          {!paymentConfirmed ? (
            <div className="text-center py-8 animate-fade-up">
              <p className="text-muted-foreground">
                Please complete your MoMo payment first.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowMomoDialog(true)}
              >
                Show Payment Details
              </Button>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-up">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-heading font-semibold mb-2">
                  Delivery Details
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Fill in your delivery information to complete your order
                </p>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 md:p-6 space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address *
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your full delivery address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    placeholder="Any special instructions for delivery"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>

                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmitOrder}
                >
                  <MessageCircle className="w-5 h-5" />
                  Complete Order via WhatsApp
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
