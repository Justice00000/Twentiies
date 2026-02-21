import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

interface SiteSection {
  id: string;
  section_key: string;
  title: string;
}

interface SectionImage {
  id: string;
  section_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

const SectionImageManager = () => {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [sectionImages, setSectionImages] = useState<Record<string, SectionImage[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);
  const [newFiles, setNewFiles] = useState<Record<string, File[]>>({});
  const [altTexts, setAltTexts] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    const [{ data: secs }, { data: imgs }] = await Promise.all([
      supabase.from("site_sections").select("*").order("created_at"),
      supabase.from("section_images").select("*").order("display_order"),
    ]);

    if (secs) setSections(secs);
    if (imgs) {
      const grouped: Record<string, SectionImage[]> = {};
      imgs.forEach((img) => {
        if (!grouped[img.section_id]) grouped[img.section_id] = [];
        grouped[img.section_id].push(img);
      });
      setSectionImages(grouped);
    }
    setIsLoading(false);
  };

  const handleUpload = async (sectionId: string) => {
    const files = newFiles[sectionId];
    if (!files || files.length === 0) return;

    setUploadingSection(sectionId);
    try {
      const existing = sectionImages[sectionId] || [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const fileName = `section-${sectionId}-${Date.now()}-${i}.${ext}`;

        const { error: upErr } = await supabase.storage.from("product-images").upload(fileName, file);
        if (upErr) throw upErr;

        const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);

        const { error: insErr } = await supabase.from("section_images").insert({
          section_id: sectionId,
          image_url: publicUrl,
          alt_text: altTexts[sectionId] || null,
          display_order: existing.length + i,
        });
        if (insErr) throw insErr;
      }

      toast({ title: "Images uploaded" });
      setNewFiles((prev) => ({ ...prev, [sectionId]: [] }));
      setAltTexts((prev) => ({ ...prev, [sectionId]: "" }));
      fetchAll();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploadingSection(null);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    const { error } = await supabase.from("section_images").delete().eq("id", imageId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Image deleted" });
      fetchAll();
    }
  };

  if (isLoading) return <p className="text-muted-foreground text-center py-8">Loading sections...</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold">Site Section Images</h3>
      <p className="text-sm text-muted-foreground">
        Manage images for each section of the website. Upload, reorder, and delete images per section.
      </p>

      <Accordion type="single" collapsible className="space-y-2">
        {sections.map((section) => {
          const images = sectionImages[section.id] || [];
          return (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{section.title}</span>
                  <span className="text-xs text-muted-foreground">({images.length} images)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {/* Upload */}
                <div className="space-y-2 p-3 bg-muted/50 rounded-md">
                  <div className="space-y-1">
                    <Label className="text-xs">Alt Text (optional)</Label>
                    <Input
                      value={altTexts[section.id] || ""}
                      onChange={(e) => setAltTexts((prev) => ({ ...prev, [section.id]: e.target.value }))}
                      placeholder="Describe the image"
                      className="h-8 text-sm"
                    />
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setNewFiles((prev) => ({ ...prev, [section.id]: Array.from(e.target.files || []) }))}
                    className="h-8 text-sm"
                  />
                  {(newFiles[section.id]?.length || 0) > 0 && (
                    <p className="text-xs text-muted-foreground">{newFiles[section.id].length} file(s) selected</p>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleUpload(section.id)}
                    disabled={uploadingSection === section.id || !(newFiles[section.id]?.length)}
                    className="w-full"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {uploadingSection === section.id ? "Uploading..." : "Upload"}
                  </Button>
                </div>

                {/* Image grid */}
                {images.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No images in this section</p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {images.map((img) => (
                      <div key={img.id} className="relative group aspect-square">
                        <img
                          src={img.image_url}
                          alt={img.alt_text || "Section image"}
                          className="w-full h-full object-cover rounded"
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete image?</AlertDialogTitle>
                              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteImage(img.id)} className="bg-destructive text-destructive-foreground">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionImageManager;
