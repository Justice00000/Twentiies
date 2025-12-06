import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import { Plus, LogOut, Package, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  product_sizes: { size: string; in_stock: boolean }[];
}

const Admin = () => {
  const { isAdmin, isLoading, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_sizes (size, in_stock)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoadingProducts(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.in_stock).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-semibold">{totalProducts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Stock
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-semibold text-green-600">
                {inStockProducts}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-semibold text-destructive">
                {totalProducts - inStockProducts}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Products</h2>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>

          {showForm ? (
            <Card>
              <CardContent className="pt-6">
                <ProductForm
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                  initialData={
                    editingProduct
                      ? {
                          id: editingProduct.id,
                          name: editingProduct.name,
                          category: editingProduct.category,
                          price: editingProduct.price,
                          image_url: editingProduct.image_url,
                          in_stock: editingProduct.in_stock,
                          sizes: editingProduct.product_sizes,
                        }
                      : undefined
                  }
                />
              </CardContent>
            </Card>
          ) : loadingProducts ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onRefresh={fetchProducts}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
