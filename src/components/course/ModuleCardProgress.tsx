"use client";

import ModuleCard from "./ModuleCard";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { lecciones } from "@/data/lessons";
import type { Module } from "@/types/course";

interface ModuleCardProgressProps {
  modulo: Module;
  locked?: boolean;
}

export default function ModuleCardProgress({ modulo, locked }: ModuleCardProgressProps) {
  const { user } = useAuth();
  const { progreso, estaCompletada } = useProgress(user?.id);
  const leccionesModulo = lecciones.filter((l) => l.modulo === modulo.id);
  const completadas = leccionesModulo.filter((l) => estaCompletada(l.id)).length;
  const total = leccionesModulo.length || modulo.lecciones.length;

  return <ModuleCard modulo={modulo} completadas={completadas} total={total} locked={locked} />;
}
