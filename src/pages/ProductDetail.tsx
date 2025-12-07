import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProductSize {
  size: string;
  in_stock: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  product_sizes: ProductSize[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_sizes (size, in_stock)
      `)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching product:", error);
    } else if (data) {
      setProduct(data);
    }
    setIsLoading(false);
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const handlePlaceOrder = () => {
    if (!product) return;

    if (product.product_sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before placing your order.",
        variant: "destructive",
      });
      return;
    }

    const message = `Hello! I would like to order:\n\nProduct: ${product.name}\nCategory: ${product.category}\nPrice: ${formatPrice(product.price)}${selectedSize ? `\nSize: ${selectedSize}` : ""}\n\nPlease confirm availability and provide payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/250792417246?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const inStockSizes = product.product_sizes.filter((s) => s.in_stock);
  const outOfStockSizes = product.product_sizes.filter((s) => !s.in_stock);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 bg-cream border-b border-border">
        <div className="container">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-[3/4] bg-muted overflow-hidden relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-semibold mt-2">
                {product.name}
              </h1>
              <p className="text-2xl text-gold font-medium mt-4">
                {formatPrice(product.price)}
              </p>

              {/* Size Selection */}
              {product.product_sizes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.product_sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() =>
                          sizeOption.in_stock && setSelectedSize(sizeOption.size)
                        }
                        disabled={!sizeOption.in_stock}
                        className={`
                          px-4 py-2 border text-sm font-medium transition-all
                          ${
                            selectedSize === sizeOption.size
                              ? "border-gold bg-gold text-charcoal"
                              : sizeOption.in_stock
                              ? "border-border hover:border-gold"
                              : "border-border/50 text-muted-foreground line-through cursor-not-allowed opacity-50"
                          }
                        `}
                      >
                        {sizeOption.size}
                      </button>
                    ))}
                  </div>
                  {outOfStockSizes.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Sizes with strikethrough are currently out of stock
                    </p>
                  )}
                </div>
              )}

              {/* Stock Status */}
              <div className="mt-6">
                {product.in_stock ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              {/* Order Button */}
              <div className="mt-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  onClick={handlePlaceOrder}
                  disabled={!product.in_stock}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Click to open WhatsApp with your order details
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-medium mb-4">How to Order</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Select your preferred size above</li>
                  <li>Click "Order via WhatsApp"</li>
                  <li>Confirm your order details with us</li>
                  <li>Provide your measurements and delivery address</li>
                  <li>Complete payment to confirm your order</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
