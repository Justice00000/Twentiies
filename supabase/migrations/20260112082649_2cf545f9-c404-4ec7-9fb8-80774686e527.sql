-- Add currency column to products table
ALTER TABLE public.products ADD COLUMN currency text NOT NULL DEFAULT 'NGN';

-- Create product_images table for multiple product images
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on product_images
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- RLS policies for product_images
CREATE POLICY "Product images are publicly viewable"
  ON public.product_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert product images"
  ON public.product_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update product images"
  ON public.product_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete product images"
  ON public.product_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS policies for gallery_images
CREATE POLICY "Gallery images are publicly viewable"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert gallery images"
  ON public.gallery_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images"
  ON public.gallery_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
  ON public.gallery_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));