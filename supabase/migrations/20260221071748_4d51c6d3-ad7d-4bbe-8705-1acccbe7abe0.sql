
-- Create categories table for admin-managed categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Categories are publicly viewable"
ON public.categories FOR SELECT
USING (true);

-- Admin manage
CREATE POLICY "Admins can insert categories"
ON public.categories FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update categories"
ON public.categories FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete categories"
ON public.categories FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default categories
INSERT INTO public.categories (name, display_order) VALUES
  ('Agbada', 0),
  ('Kaftan', 1),
  ('Senator', 2),
  ('Fabrics', 3);

-- Create site_sections table for admin to manage images in any section
CREATE TABLE public.site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  title text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.section_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES public.site_sections(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  link_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_images ENABLE ROW LEVEL SECURITY;

-- Public read for both
CREATE POLICY "Site sections are publicly viewable"
ON public.site_sections FOR SELECT USING (true);

CREATE POLICY "Section images are publicly viewable"
ON public.section_images FOR SELECT USING (true);

-- Admin manage site_sections
CREATE POLICY "Admins can insert site sections"
ON public.site_sections FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site sections"
ON public.site_sections FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site sections"
ON public.site_sections FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin manage section_images
CREATE POLICY "Admins can insert section images"
ON public.section_images FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update section images"
ON public.section_images FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete section images"
ON public.section_images FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default sections
INSERT INTO public.site_sections (section_key, title) VALUES
  ('hero_slider', 'Hero Slider'),
  ('editorial_grid', 'Editorial Photo Grid'),
  ('category_tiles', 'Category Tiles'),
  ('banner', 'Full-Width Banner');
