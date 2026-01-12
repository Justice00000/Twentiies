import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, X, Image as ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
}

interface GalleryManagerProps {
  onClose: () => void;
}

const GalleryManager = ({ onClose }: GalleryManagerProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setImages(data);
    }
    setIsLoading(false);
  };

  const handleUpload = async () => {
    if (newImages.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `gallery-${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from("gallery_images")
          .insert({
            image_url: publicUrl,
            title: title || null,
            display_order: images.length + i,
          });

        if (insertError) throw insertError;
      }

      toast({ title: "Images uploaded successfully" });
      setNewImages([]);
      setTitle("");
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Image deleted" });
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-semibold">Gallery Manager</h2>
        <Button type="button" variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gallery-title">Title (Optional)</Label>
            <Input
              id="gallery-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-images">Select Images</Label>
            <Input
              id="gallery-images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setNewImages(Array.from(e.target.files || []))}
            />
            {newImages.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {newImages.length} image(s) selected
              </p>
            )}
          </div>
          <Button onClick={handleUpload} disabled={isUploading} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Images"}
          </Button>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Gallery Images</h3>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : images.length === 0 ? (
          <div className="text-center py-8 border rounded-lg">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No gallery images yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.image_url}
                  alt={image.title || "Gallery image"}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                {image.title && (
                  <p className="text-xs text-center mt-1 truncate">{image.title}</p>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this gallery image? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(image.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
