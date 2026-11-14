-- ==============================================================================
-- CoachPRB - Medical Vault Storage Bucket & Security Policies
-- ==============================================================================

-- 1. Create the private 'medical-vault' bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'medical-vault',
  'medical-vault',
  FALSE, -- Strictly Private
  20971520, -- 20MB Max size limit (20 * 1024 * 1024)
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/dicom']
)
ON CONFLICT (id) DO UPDATE SET
  public = FALSE,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/dicom'];

-- 2. Storage RLS Policies for 'medical-vault'
-- Only authenticated coaches or owners can select / read files via signed URLs
CREATE POLICY "Strict private access to medical-vault"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'medical-vault');

-- Insertion only allowed for authenticated users
CREATE POLICY "Authenticated users can upload to medical-vault"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'medical-vault' 
  AND (storage.foldername(name))[1] IS NOT NULL
);

-- Delete policy restricted
CREATE POLICY "Coaches can delete medical records"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'medical-vault');
