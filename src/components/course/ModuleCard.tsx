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
      className={cn(
        "group block p-6 rounded-2xl border transition-all duration-300",
        locked
          ? "border-zinc-800 bg-dark-800/30 opacity-50 cursor-not-allowed"
          : "border-zinc-700/50 bg-dark-800/50 hover:border-zinc-600/50 hover:bg-dark-700/50 hover:shadow-xl hover:shadow-primary/5",
        completado && "border-success/30 bg-success/5"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
            completado
              ? "bg-success/10 text-success"
              : "bg-dark-700 text-zinc-400 group-hover:text-primary group-hover:bg-primary/10"
          )}
        >
          {locked ? <Lock size={20} /> : <Icon size={20} />}
        </div>
        {completado && (
          <CheckCircle2 size={20} className="text-success" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">
        {modulo.titulo}
      </h3>
      <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
        {modulo.descripcion}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{total} lecciones</span>
        <span>{porcentaje}% completado</span>
      </div>

      {total > 0 && (
        <div className="mt-3 w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
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
