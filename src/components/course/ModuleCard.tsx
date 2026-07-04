"use client";

import Link from "next/link";
import { BookOpen, Code2, Layers, Zap, Database, GitBranch, Puzzle, Rocket, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Module } from "@/types/course";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  Code2,
  Layers,
  Zap,
  Database,
  GitBranch,
  Puzzle,
  Rocket,
};

interface ModuleCardProps {
  modulo: Module;
  completadas: number;
  total: number;
  locked?: boolean;
}

export default function ModuleCard({ modulo, completadas, total, locked = false }: ModuleCardProps) {
  const Icon = iconMap[modulo.icono] || BookOpen;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const completado = completadas === total && total > 0;

  return (
    <Link
      href={locked ? "#" : `/curso/${modulo.slug}`}
      className="group block p-6 rounded-2xl border transition-all duration-300"
      style={{
        borderColor: completado ? "rgba(16, 185, 129, 0.3)" : "var(--border-color)",
        background: completado ? "rgba(16, 185, 129, 0.03)" : "var(--bg-surface)",
        opacity: locked ? 0.5 : 1,
        cursor: locked ? "not-allowed" : "pointer",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
          style={{
            background: completado ? "rgba(16, 185, 129, 0.1)" : "var(--bg-elevated)",
            color: completado ? "#10b981" : "var(--text-muted)",
          }}
        >
          {locked ? <Lock size={20} /> : <Icon size={20} />}
        </div>
        {completado && (
          <CheckCircle2 size={20} className="text-success" />
        )}
      </div>

      <h3 className="text-lg font-semibold mb-1 transition-colors" style={{ color: "var(--text-primary)" }}>
        {modulo.titulo}
      </h3>
      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-muted)" }}>
        {modulo.descripcion}
      </p>

      <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
        <span>{total} lecciones</span>
        <span>{porcentaje}% completado</span>
      </div>

      {total > 0 && (
        <div className="mt-3 w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              completado ? "bg-success" : "bg-gradient-to-r from-primary to-accent"
            )}
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      )}
    </Link>
  );
}
