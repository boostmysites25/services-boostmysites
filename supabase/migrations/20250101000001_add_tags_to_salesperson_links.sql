-- Add tag fields to salesperson_links table
ALTER TABLE public.salesperson_links 
ADD COLUMN tag1 TEXT,
ADD COLUMN tag2 TEXT,
ADD COLUMN tag3 TEXT;
