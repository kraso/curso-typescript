-- ============================================
-- MIGRACION: Bucket para avatars de usuario
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- Crear bucket avatars (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Permitir lectura publica
CREATE POLICY "Avatar public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Permitir que los usuarios suban su propio avatar
CREATE POLICY "Avatar upload own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Permitir que los usuarios actualicen su propio avatar
CREATE POLICY "Avatar update own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Permitir que los usuarios eliminen su propio avatar
CREATE POLICY "Avatar delete own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
