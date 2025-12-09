import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first.",
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

Please confirm availability and provide payment details.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/250792417246?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your order via WhatsApp.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Your Cart
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Shopping Cart
            </h1>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          {items.length === 0 ? (
            <div className="text-center py-16 animate-fade-up">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-heading font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Browse our collection and add items to your cart.</p>
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Browse Shop
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-up">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      )}
                      <p className="text-gold font-medium mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-6 bg-card rounded-lg border border-border">
                <div className="flex justify-between items-center text-lg mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-heading font-semibold text-gold text-xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="lg"
                    onClick={handleCheckout}
                    className="flex-1 group"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Checkout via WhatsApp
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="text-center">
                <Link to="/shop" className="text-gold hover:underline inline-flex items-center gap-1">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
