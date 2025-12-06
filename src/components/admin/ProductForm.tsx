import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

const categories = ["Agbada", "Kaftan", "Senator", "Fabrics"];
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string | null;
    in_stock: boolean;
    sizes?: { size: string; in_stock: boolean }[];
  };
}

const ProductForm = ({ onSuccess, onCancel, initialData }: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [inStock, setInStock] = useState(initialData?.in_stock ?? true);
  const [selectedSizes, setSelectedSizes] = useState<{ size: string; in_stock: boolean }[]>(
    initialData?.sizes || []
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) {
        return prev.filter((s) => s.size !== size);
      }
      return [...prev, { size, in_stock: true }];
    });
  };

  const handleSizeStockToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.map((s) =>
        s.size === size ? { ...s, in_stock: !s.in_stock } : s
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !category || !price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = initialData?.image_url || null;

      // Upload image if new one selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      if (initialData?.id) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({
            name,
            category,
            price: parseFloat(price),
            image_url: imageUrl,
            in_stock: inStock,
          })
          .eq("id", initialData.id);

        if (error) throw error;

        // Delete existing sizes and re-add
        await supabase
          .from("product_sizes")
          .delete()
          .eq("product_id", initialData.id);

        if (selectedSizes.length > 0) {
          const { error: sizeError } = await supabase
            .from("product_sizes")
            .insert(
              selectedSizes.map((s) => ({
                product_id: initialData.id,
                size: s.size,
                in_stock: s.in_stock,
              }))
            );

          if (sizeError) throw sizeError;
        }

        toast({ title: "Product updated successfully" });
      } else {
        // Create new product
        const { data: product, error } = await supabase
          .from("products")
          .insert({
            name,
            category,
            price: parseFloat(price),
            image_url: imageUrl,
            in_stock: inStock,
          })
          .select()
          .single();

        if (error) throw error;

        // Add sizes
        if (selectedSizes.length > 0) {
          const { error: sizeError } = await supabase
            .from("product_sizes")
            .insert(
              selectedSizes.map((s) => ({
                product_id: product.id,
                size: s.size,
                in_stock: s.in_stock,
              }))
            );

          if (sizeError) throw sizeError;
        }

        toast({ title: "Product created successfully" });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-semibold">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₦) *</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {initialData?.image_url && !imageFile && (
            <p className="text-sm text-muted-foreground">Current image will be kept</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="in-stock" checked={inStock} onCheckedChange={setInStock} />
          <Label htmlFor="in-stock">In Stock</Label>
        </div>

        <div className="space-y-2">
          <Label>Available Sizes</Label>
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map((size) => {
              const sizeData = selectedSizes.find((s) => s.size === size);
              const isSelected = !!sizeData;

              return (
                <div key={size} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={isSelected}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                  {isSelected && (
                    <div className="flex items-center space-x-1 ml-6">
                      <Switch
                        id={`stock-${size}`}
                        checked={sizeData?.in_stock ?? true}
                        onCheckedChange={() => handleSizeStockToggle(size)}
                        className="scale-75"
                      />
                      <span className="text-xs text-muted-foreground">
                        {sizeData?.in_stock ? "In stock" : "Out"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
