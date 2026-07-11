import { createClient, isSupabaseConfigured } from "./supabase/client";
import { APP_ID, LOCAL_STORAGE_KEY, POINTS_PER_LESSON } from "./constants";
import type { UserProgress } from "@/types/course";

const defaultProgress: UserProgress = {
  leccionesCompletadas: [],
  insignias: [],
  puntos: 0,
  tiempoTotal: 0,
};

// ===== LOCAL STORAGE =====

export function getProgresoLocal(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;

  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error al leer progreso:", error);
  }

  return defaultProgress;
}

export function saveProgresoLocal(progreso: UserProgress): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progreso));
  } catch (error) {
    console.error("Error al guardar progreso:", error);
  }
}

// ===== SUPABASE SYNC =====

export async function syncProgresoFromSupabase(userId: string): Promise<UserProgress | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("progreso_usuario")
      .select("leccion_id, insignias, puntos, tiempo_total")
      .eq("user_id", userId)
      .eq("app_id", APP_ID);

    if (error) throw error;
    if (!data) return null;

    const rows = data as Array<{
      leccion_id: string;
      insignias: string[] | null;
      puntos: number | null;
      tiempo_total: number | null;
    }>;

    const leccionesCompletadas = rows.map((r) => r.leccion_id);
    const insignias = [...new Set(rows.flatMap((r) => r.insignias || []))];
    const puntos = rows.reduce((sum, r) => sum + (r.puntos || 0), 0);
    const tiempoTotal = rows.reduce((sum, r) => sum + (r.tiempo_total || 0), 0);

    const progreso: UserProgress = { leccionesCompletadas, insignias, puntos, tiempoTotal };
    saveProgresoLocal(progreso);
    return progreso;
  } catch (error) {
    console.error("Error sync Supabase:", error);
    return null;
  }
}

export async function syncLeccionToSupabase(
  userId: string,
  leccionId: string,
  insignia?: string
): Promise<void> {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    const supabase = createClient();
    const { error } = await supabase.from("progreso_usuario").upsert(
      [
        {
          user_id: userId,
          app_id: APP_ID,
          leccion_id: leccionId,
          insignias: insignia ? [insignia] : [],
          puntos: insignia ? POINTS_PER_LESSON : POINTS_PER_LESSON / 2,
        } as Record<string, unknown>,
      ],
      { onConflict: "user_id,app_id,leccion_id" }
    );

    if (error) throw error;
  } catch (error) {
    console.error("Error guardando en Supabase:", error);
  }
}

// ===== MIGRATION: localStorage → Supabase =====

export async function migrarProgresoLocalASupabase(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  try {
    const local = getProgresoLocal();
    if (!local.leccionesCompletadas.length) return false;

    const supabase = createClient();
    const { data: existing, error: checkErr } = await supabase
      .from("progreso_usuario")
      .select("leccion_id")
      .eq("user_id", userId)
      .eq("app_id", APP_ID);

    if (checkErr) throw checkErr;

    const existingIds = new Set(existing.map((r) => r.leccion_id));
    const toMigrate = local.leccionesCompletadas.filter((id) => !existingIds.has(id));

    if (!toMigrate.length) return false;

    const rows = toMigrate.map((leccionId) => ({
      user_id: userId,
      app_id: APP_ID,
      leccion_id: leccionId,
      insignias: local.insignias.includes(leccionId) ? [leccionId] : [],
      puntos: local.insignias.includes(leccionId) ? POINTS_PER_LESSON : POINTS_PER_LESSON / 2,
      tiempo_total: Math.floor(local.tiempoTotal / local.leccionesCompletadas.length),
    }));

    const { error: insertErr } = await supabase
      .from("progreso_usuario")
      .upsert(rows as Record<string, unknown>[], { onConflict: "user_id,app_id,leccion_id" });

    if (insertErr) throw insertErr;

    console.log(`Migradas ${rows.length} lecciones a Supabase`);
    return true;
  } catch (error) {
    console.error("Error migrando progreso:", error);
    return false;
  }
}

// ===== MAIN FUNCTIONS =====

export function marcarLeccionCompletada(
  leccionId: string,
  insignia?: string,
  userId?: string
): UserProgress {
  const progreso = getProgresoLocal();

  if (!progreso.leccionesCompletadas.includes(leccionId)) {
    progreso.leccionesCompletadas.push(leccionId);
  }

  if (insignia && !progreso.insignias.includes(insignia)) {
    progreso.insignias.push(insignia);
  }

  progreso.puntos += POINTS_PER_LESSON;
  saveProgresoLocal(progreso);

  if (userId) {
    syncLeccionToSupabase(userId, leccionId, insignia);
  }

  return progreso;
}

export function estaLeccionCompletada(leccionId: string): boolean {
  const progreso = getProgresoLocal();
  return progreso.leccionesCompletadas.includes(leccionId);
}

export function getInsignias(): string[] {
  const progreso = getProgresoLocal();
  return progreso.insignias;
}

export function getTiempoTotal(): number {
  const progreso = getProgresoLocal();
  return progreso.tiempoTotal;
}

export function actualizarTiempo(segundos: number): number {
  const progreso = getProgresoLocal();
  progreso.tiempoTotal += segundos;
  saveProgresoLocal(progreso);
  return progreso.tiempoTotal;
}

export function reiniciarProgreso(): void {
  saveProgresoLocal(defaultProgress);
}

// ===== SYNC ON LOGOUT =====

export async function sincronizarProgresoASupabase(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  try {
    const local = getProgresoLocal();
    if (!local.leccionesCompletadas.length) return true;

    const supabase = createClient();
    const rows = local.leccionesCompletadas.map((leccionId) => ({
      user_id: userId,
      app_id: APP_ID,
      leccion_id: leccionId,
      insignias: local.insignias.includes(leccionId) ? [leccionId] : [],
      puntos: local.insignias.includes(leccionId) ? POINTS_PER_LESSON : POINTS_PER_LESSON / 2,
      tiempo_total: Math.floor(local.tiempoTotal / local.leccionesCompletadas.length),
    }));

    const { error } = await supabase
      .from("progreso_usuario")
      .upsert(rows, { onConflict: "user_id,app_id,leccion_id" });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error sincronizando progreso:", error);
    return false;
  }
}

export function limpiarProgresoLocal(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error limpiando progreso local:", error);
  }
}
