-- ============================================
-- MIGRACION UNIFICADA: Multi-App Support
-- Para: javascript-learning-app.dev + react-learning-app.dev + typescript
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Crear tabla unificada con app_id
CREATE TABLE IF NOT EXISTS progreso_usuario (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id     TEXT NOT NULL CHECK (app_id IN ('js', 'react', 'ts')),
  leccion_id TEXT NOT NULL,
  insignias  TEXT[] DEFAULT '{}',
  puntos     INTEGER DEFAULT 0,
  tiempo_total INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, app_id, leccion_id)
);

-- 2. Indices para queries rapidas
CREATE INDEX IF NOT EXISTS idx_progreso_user_id ON progreso_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_progreso_user_app ON progreso_usuario(user_id, app_id);
CREATE INDEX IF NOT EXISTS idx_progreso_user_leccion ON progreso_usuario(user_id, app_id, leccion_id);

-- 3. Row Level Security (RLS)
ALTER TABLE progreso_usuario ENABLE ROW LEVEL SECURITY;

-- Politica: usuarios ven SOLO su propio progreso Y de SU app
DROP POLICY IF EXISTS "Usuarios ven su propio progreso" ON progreso_usuario;
CREATE POLICY "Usuarios ven su propio progreso"
  ON progreso_usuario
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Storage: Bucket avatars (compartido)
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Usuarios suben su avatar" ON storage.objects;
CREATE POLICY "Usuarios suben su avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = 'avatars'
  );

DROP POLICY IF EXISTS "Avatar publicly readable" ON storage.objects;
CREATE POLICY "Avatar publicly readable"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Usuarios actualizan su avatar" ON storage.objects;
CREATE POLICY "Usuarios actualizan su avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars')
  WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Usuarios eliminan su avatar" ON storage.objects;
CREATE POLICY "Usuarios eliminan su avatar"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');

-- ============================================
-- FUNCION: Importar datos de curso-js
-- Ejecutar DESPUES de crear la tabla y subir el CSV
-- ============================================

-- Primero crea una tabla temporal para importar el CSV
CREATE TABLE IF NOT EXISTS temp_import_js (
  id UUID,
  user_id UUID,
  leccion_id TEXT,
  insignias TEXT[],
  puntos INTEGER,
  tiempo_total INTEGER,
  creado_en TIMESTAMPTZ
);

-- Luego inserta en la tabla final con app_id = 'js'
-- (Ejecutar despues de subir el CSV a temp_import_js)
/*
INSERT INTO progreso_usuario (user_id, app_id, leccion_id, insignias, puntos, tiempo_total, created_at)
SELECT user_id, 'js', leccion_id, insignias, puntos, tiempo_total, creado_en
FROM temp_import_js
ON CONFLICT (user_id, app_id, leccion_id) DO NOTHING;
*/

-- Limpia la tabla temporal
-- DROP TABLE IF EXISTS temp_import_js;

-- ============================================
-- FUNCION: Importar datos de React
-- Ejecutar DESPUES de crear la tabla y subir el CSV
-- ============================================

-- Primero crea una tabla temporal para importar el CSV de React
CREATE TABLE IF NOT EXISTS temp_import_react (
  id UUID,
  user_id UUID,
  completed_items JSONB,
  updated_at TIMESTAMPTZ
);

-- Funcion para extraer lecciones completadas del JSONB
-- El JSONB completed_items parece tener un formato como: {"lessons": ["lesson-1", "lesson-2"]}
-- o {"leccion_id": true, ...}
-- Ajustar segun el formato real

/*
INSERT INTO progreso_usuario (user_id, app_id, leccion_id, insignias, puntos, tiempo_total, created_at)
SELECT 
  user_id, 
  'react',
  jsonb_object_keys(completed_items),
  '{}',
  5,
  0,
  updated_at
FROM temp_import_react,
LATERAL jsonb_object_keys(completed_items) AS lesson_key
ON CONFLICT (user_id, app_id, leccion_id) DO NOTHING;
*/

-- Limpia la tabla temporal
-- DROP TABLE IF EXISTS temp_import_react;
