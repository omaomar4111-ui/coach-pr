-- ==============================================================================
-- CoachPR Phase 5: Tenant Branding Storage Bucket & Policies
-- ==============================================================================

-- 1. Create dedicated branding storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tenant-branding',
  'tenant-branding',
  true, -- public assets (logos, avatars, icons) so athletes can load them securely
  5242880, -- 5 MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

-- 2. Storage RLS Policies
-- Tenant assets must be scoped by coach_id in folder path: tenant-branding/{coach_id}/*
CREATE POLICY "Public can view tenant branding assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'tenant-branding');

CREATE POLICY "Coaches can upload their own brand assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tenant-branding'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Coaches can update their own brand assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'tenant-branding'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Coaches can delete their own brand assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'tenant-branding'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
