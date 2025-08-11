-- Add phone field to salesperson_links table
ALTER TABLE public.salesperson_links 
ADD COLUMN phone TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.salesperson_links.phone IS 'Phone number for the salesperson';
