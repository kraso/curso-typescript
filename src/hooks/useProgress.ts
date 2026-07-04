"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProgresoLocal,
  saveProgresoLocal,
  marcarLeccionCompletada,
  actualizarTiempo,
  syncProgresoFromSupabase,
  migrarProgresoLocalASupabase,
} from "@/lib/progress";
import { lecciones, getProgresoTotal } from "@/data/lessons";
import type { UserProgress } from "@/types/course";

export function useProgress(userId?: string) {
  const [progreso, setProgreso] = useState<UserProgress>({
    leccionesCompletadas: [],
    insignias: [],
    puntos: 0,
    tiempoTotal: 0,
  });

  useEffect(() => {
    setProgreso(getProgresoLocal());
  }, []);

  // Sync from Supabase when userId changes — merge with localStorage
  useEffect(() => {
    if (userId) {
      syncProgresoFromSupabase(userId).then((supabaseData) => {
        if (!supabaseData) return;

        if (supabaseData.leccionesCompletadas.length === 0) {
          migrarProgresoLocalASupabase(userId);
          return;
        }

        setProgreso((local) => {
          const merged: UserProgress = {
            leccionesCompletadas: [
              ...new Set([
                ...local.leccionesCompletadas,
                ...supabaseData.leccionesCompletadas,
              ]),
            ],
            insignias: [
              ...new Set([...local.insignias, ...supabaseData.insignias]),
            ],
            puntos: Math.max(local.puntos, supabaseData.puntos),
            tiempoTotal: Math.max(local.tiempoTotal, supabaseData.tiempoTotal),
          };
          saveProgresoLocal(merged);
          return merged;
        });
      });
    }
  }, [userId]);

  const completarLeccion = useCallback(
    (leccionId: string, insignia?: string) => {
      const nuevoProgreso = marcarLeccionCompletada(leccionId, insignia, userId);
      setProgreso({ ...nuevoProgreso });
      return nuevoProgreso;
    },
    [userId]
  );

  const estaCompletada = useCallback(
    (leccionId: string) => {
      return progreso.leccionesCompletadas.includes(leccionId);
    },
    [progreso.leccionesCompletadas]
  );

  const porcentajeProgreso = useCallback(() => {
    return getProgresoTotal(progreso.leccionesCompletadas);
  }, [progreso.leccionesCompletadas]);

  const tieneInsignia = useCallback(
    (insignia: string) => {
      return progreso.insignias.includes(insignia);
    },
    [progreso.insignias]
  );

  const registrarTiempo = useCallback((segundos: number) => {
    const nuevoTiempo = actualizarTiempo(segundos);
    setProgreso((prev) => ({ ...prev, tiempoTotal: nuevoTiempo }));
  }, []);

  return {
    progreso,
    completarLeccion,
    estaCompletada,
    porcentajeProgreso,
    tieneInsignia,
    registrarTiempo,
    totalLecciones: lecciones.length,
  };
}
