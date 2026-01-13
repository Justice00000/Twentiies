import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
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
    navigate("/checkout");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-charcoal text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
              Your Cart
            </span>
            <h1 className="text-3xl md:text-6xl font-heading font-semibold mt-3 md:mt-4 mb-4 md:mb-6">
              Shopping Cart
            </h1>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container max-w-4xl px-4">
          {items.length === 0 ? (
            <div className="text-center py-12 md:py-16 animate-fade-up">
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl md:text-2xl font-heading font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">Browse our collection and add items to your cart.</p>
              <Link to="/shop">
                <Button variant="hero" size="lg">
                  Browse Shop
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-up">
              {/* Cart Items */}
              <div className="space-y-3 md:space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-lg border border-border"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded overflow-hidden flex-shrink-0">
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
                      <h3 className="font-heading font-semibold text-sm md:text-base truncate">{item.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.category}</p>
                      {item.size && (
                        <p className="text-xs md:text-sm text-muted-foreground">Size: {item.size}</p>
                      )}
                      <p className="text-gold font-medium mt-1 text-sm md:text-base">{formatPrice(item.price)}</p>
                      
                      {/* Mobile quantity controls */}
                      <div className="flex items-center justify-between mt-2 md:hidden">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Desktop quantity controls */}
                    <div className="hidden md:flex flex-col items-end justify-between">
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
              <div className="p-4 md:p-6 bg-card rounded-lg border border-border">
                <div className="flex justify-between items-center text-base md:text-lg mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-heading font-semibold text-gold text-lg md:text-xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                    size="default"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleCheckout}
                    className="w-full group"
                  >
                    Proceed to Checkout
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
