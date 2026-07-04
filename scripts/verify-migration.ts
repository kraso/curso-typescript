/**
 * Script para verificar la migracion de Supabase
 * Ejecutar con: npx tsx scripts/verify-migration.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Error: Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifyMigration() {
  console.log("=== Verificando Migracion Multi-App ===\n");

  // 1. Verificar que la tabla existe con app_id
  console.log("1. Verificando estructura de tabla...");
  const { data: columns, error: colError } = await supabase
    .from("progreso_usuario")
    .select("*")
    .limit(1);

  if (colError) {
    if (colError.message.includes("does not exist")) {
      console.error("   ❌ La tabla progreso_usuario no existe");
      console.log("   -> Ejecuta migration-unified.sql en Supabase SQL Editor");
    } else if (colError.message.includes("app_id")) {
      console.error("   ❌ La tabla no tiene la columna app_id");
      console.log("   -> Ejecuta migration-unified.sql en Supabase SQL Editor");
    } else {
      console.error("   ❌ Error:", colError.message);
    }
    return false;
  }
  console.log("   ✅ Tabla existe\n");

  // 2. Verificar que no hay datos sin app_id
  console.log("2. Verificando datos sin app_id...");
  const { data: noAppId, error: noAppError } = await supabase
    .from("progreso_usuario")
    .select("id")
    .is("app_id", null)
    .limit(1);

  if (!noAppError && noAppId && noAppId.length > 0) {
    console.warn("   ⚠️  Hay datos sin app_id");
    console.log("   -> Actualiza los registros con el app_id correcto");
  } else {
    console.log("   ✅ Todos los datos tienen app_id\n");
  }

  // 3. Contar registros por app_id
  console.log("3. Registros por app_id:");
  const { data: jsData } = await supabase
    .from("progreso_usuario")
    .select("id", { count: "exact", head: true })
    .eq("app_id", "js");

  const { data: reactData } = await supabase
    .from("progreso_usuario")
    .select("id", { count: "exact", head: true })
    .eq("app_id", "react");

  const { data: tsData } = await supabase
    .from("progreso_usuario")
    .select("id", { count: "exact", head: true })
    .eq("app_id", "ts");

  console.log(`   - js: ${jsData?.length || 0} registros`);
  console.log(`   - react: ${reactData?.length || 0} registros`);
  console.log(`   - ts: ${tsData?.length || 0} registros\n`);

  console.log("=== Verificacion Completa ===");
  return true;
}

verifyMigration().catch(console.error);
