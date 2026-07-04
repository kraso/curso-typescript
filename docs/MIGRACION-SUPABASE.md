# Guia de Migracion: Supabase Multi-App

## Contexto

Tienes 3 apps que necesitan compartir un proyecto Supabase:
- `javascript-learning-app.dev` (app_id: `js`)
- `react-learning-app.dev` (app_id: `react`)
- `typescript.javascript-learning-app.dev` (app_id: `ts`)

## Esquemas encontrados

| Proyecto | Tabla | Columnas |
|----------|-------|----------|
| curso-js | `progreso_usuario` | `user_id`, `leccion_id`, `insignias`, `puntos`, `tiempo_total`, `creado_en` |
| React | `user_progress` | `user_id`, `completed_items` (JSONB), `updated_at` |

## Paso 1: Exportar datos de curso-js

Ve al SQL Editor de curso-js y ejecuta:

```sql
SELECT 
  id,
  user_id,
  leccion_id,
  insignias,
  puntos,
  tiempo_total,
  creado_en
FROM progreso_usuario
ORDER BY creado_en;
```

Descarga como CSV y guarda como `curso-js-data.csv`.

## Paso 2: Exportar datos de React

Ve al SQL Editor de React y ejecuta:

```sql
SELECT 
  id,
  user_id,
  completed_items,
  updated_at
FROM user_progress
ORDER BY updated_at;
```

Descarga como CSV y guarda como `react-data.csv`.

## Paso 3: Crear proyecto "cursos" en Supabase

1. Ve a https://supabase.com/dashboard
2. Haz clic en "New Project"
3. Nombre: `cursos`
4. Contraseña: (eligela tu)
5. Region: (la mas cercana)
6. Espera a que este listo

## Paso 4: Ejecutar migracion en el nuevo proyecto

1. Ve al SQL Editor del proyecto "cursos"
2. Abre el archivo `supabase/migration-unified.sql`
3. Copia y pega SOLO la parte de crear tabla (sin los INSERT comentados)
4. Ejecuta

## Paso 5: Importar datos de curso-js

1. En el SQL Editor, ejecuta:

```sql
CREATE TABLE temp_import_js (
  id UUID,
  user_id UUID,
  leccion_id TEXT,
  insignias TEXT[],
  puntos INTEGER,
  tiempo_total INTEGER,
  creado_en TIMESTAMPTZ
);
```

2. Ve a **Table Editor** > `temp_import_js`
3. Haz clic en "Insert" > "Import from CSV"
4. Sube `curso-js-data.csv`
5. Vuelve al SQL Editor y ejecuta:

```sql
INSERT INTO progreso_usuario (user_id, app_id, leccion_id, insignias, puntos, tiempo_total, created_at)
SELECT user_id, 'js', leccion_id, insignias, puntos, tiempo_total, creado_en
FROM temp_import_js
ON CONFLICT (user_id, app_id, leccion_id) DO NOTHING;

DROP TABLE IF EXISTS temp_import_js;
```

## Paso 6: Importar datos de React

1. Primero necesitamos entender el formato de `completed_items`. Ejecuta:

```sql
SELECT completed_items FROM temp_import_react LIMIT 5;
```

Esto nos dira como estan guardados los datos.

2. Si el formato es `{"lessons": ["leccion-1", "leccion-2"]}`:

```sql
CREATE TABLE temp_import_react (
  id UUID,
  user_id UUID,
  completed_items JSONB,
  updated_at TIMESTAMPTZ
);

-- Sube el CSV a temp_import_react

INSERT INTO progreso_usuario (user_id, app_id, leccion_id, insignias, puntos, tiempo_total, created_at)
SELECT 
  user_id, 
  'react',
  jsonb_array_elements_text(completed_items -> 'lessons'),
  '{}',
  5,
  0,
  updated_at
FROM temp_import_react
ON CONFLICT (user_id, app_id, leccion_id) DO NOTHING;

DROP TABLE IF NOT EXISTS temp_import_react;
```

3. Si el formato es `{"leccion-id": true, "otra-leccion": true}`:

```sql
INSERT INTO progreso_usuario (user_id, app_id, leccion_id, insignias, puntos, tiempo_total, created_at)
SELECT 
  user_id, 
  'react',
  key,
  '{}',
  5,
  0,
  updated_at
FROM temp_import_react,
LATERAL jsonb_object_keys(completed_items) AS key
ON CONFLICT (user_id, app_id, leccion_id) DO NOTHING;

DROP TABLE IF EXISTS temp_import_react;
```

## Paso 7: Obtener credenciales

En el proyecto "cursos":
1. Ve a **Settings > API**
2. Copia:
   - `Project URL` (algo como `https://cursos.supabase.co`)
   - `anon public` key (empieza con `eyJ...`)

## Paso 8: Actualizar .env.local

```bash
# curso-ts/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://cursos.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

## Paso 9: Eliminar proyectos viejos

Cuando todo funcione:
1. Ve a https://supabase.com/dashboard
2. Selecciona el proyecto a eliminar
3. Settings > General > Delete Project

## Verificacion

Despues de todo, verifica:
1. [ ] Login/registro funciona
2. [ ] El progreso se guarda (DevTools > Application > Local Storage)
3. [ ] Los datos aparecen en Supabase con el `app_id` correcto
