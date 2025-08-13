-- Add tag fields to salesperson_links table
ALTER TABLE public.salesperson_links 
ADD COLUMN conversion_tag TEXT,
ADD COLUMN gtag_script TEXT;
