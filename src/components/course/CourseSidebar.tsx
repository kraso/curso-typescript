"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Code2,
  Layers,
  Zap,
  Database,
  GitBranch,
  Puzzle,
  Rocket,
  Trophy,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODULE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen, Code2, Layers, Zap, Database, GitBranch, Puzzle, Rocket,
};

interface SidebarModule {
  id: number;
  slug: string;
  titulo: string;
  orden: number;
  lecciones: { id: string; titulo: string }[];
}

interface CourseSidebarProps {
  modulos: SidebarModule[];
  completedLessons: string[];
  badges: string[];
  puntos: number;
}

export default function CourseSidebar({ modulos, completedLessons, badges, puntos }: CourseSidebarProps) {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<Set<number>>(() => {
    const current = modulos.find((m) => pathname?.includes(`/curso/${m.slug}`));
    return new Set(current ? [current.id] : []);
  });

  const toggleModule = (id: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalLecciones = modulos.reduce((sum, m) => sum + m.lecciones.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLecciones > 0 ? Math.round((completedCount / totalLecciones) * 100) : 0;

  return (
    <aside className="w-72 h-screen sticky top-16 border-r border-zinc-800 bg-dark-900/80 overflow-y-auto flex-shrink-0 hidden lg:block">
      {/* Progress summary */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-300">Progreso</span>
          <span className="text-sm text-primary font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
          <span>{completedCount}/{totalLecciones} lecciones</span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-warning" />
            <span>{puntos} pts</span>
          </div>
        </div>
      </div>

      {/* Modules navigation */}
      <nav className="p-2">
        {modulos.map((modulo) => {
          const ModIcon = MODULE_ICONS[modulo.orden.toString() === "1" ? "BookOpen" : modulo.orden.toString() === "2" ? "Code2" : modulo.orden.toString() === "3" ? "Layers" : modulo.orden.toString() === "4" ? "Zap" : modulo.orden.toString() === "5" ? "Database" : modulo.orden.toString() === "6" ? "GitBranch" : modulo.orden.toString() === "7" ? "Puzzle" : "Rocket"] || BookOpen;
          const isExpanded = expandedModules.has(modulo.id);
          const moduleCompleted = modulo.lecciones.every((l) => completedLessons.includes(l.id));
          const moduleProgress = modulo.lecciones.filter((l) => completedLessons.includes(l.id)).length;
          const isCurrentModule = pathname?.includes(`/curso/${modulo.slug}`);

          return (
            <div key={modulo.id} className="mb-1">
              <button
                onClick={() => toggleModule(modulo.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  isCurrentModule
                    ? "bg-primary/10 text-primary"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-dark-700/50"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0",
                    moduleCompleted
                      ? "bg-success/10 text-success"
                      : isCurrentModule
                      ? "bg-primary/10 text-primary"
                      : "bg-dark-700 text-zinc-500"
                  )}
                >
                  {moduleCompleted ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <ModIcon size={14} />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="truncate font-medium">{modulo.titulo}</div>
                  <div className="text-xs text-zinc-500">
                    {moduleProgress}/{modulo.lecciones.length}
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className={cn(
                    "flex-shrink-0 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-zinc-800 pl-3">
                  {modulo.lecciones.map((leccion) => {
                    const isCompleted = completedLessons.includes(leccion.id);
                    const isCurrent = pathname?.includes(`/curso/${modulo.slug}/${leccion.id}`);
                    return (
                      <Link
                        key={leccion.id}
                        href={`/curso/${modulo.slug}/${leccion.id}`}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                          isCurrent
                            ? "bg-primary/10 text-primary font-medium"
                            : isCompleted
                            ? "text-zinc-400 hover:text-zinc-200"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-dark-700/30"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={12} className="text-success flex-shrink-0" />
                        ) : (
                          <Circle size={12} className="flex-shrink-0" />
                        )}
                        <span className="truncate">{leccion.titulo}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href={`/curso/${modulo.slug}/examen`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                      pathname?.includes(`/curso/${modulo.slug}/examen`)
                        ? "bg-warning/10 text-warning font-medium"
                        : "text-zinc-500 hover:text-warning hover:bg-warning/5"
                    )}
                  >
                    <Trophy size={12} className="flex-shrink-0" />
                    <span>Examen del modulo</span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="p-4 border-t border-zinc-800">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Insignias
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <div
                key={badge}
                className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
