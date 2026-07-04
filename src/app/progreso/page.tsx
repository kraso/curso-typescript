"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
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
  CheckCircle2,
} from "lucide-react";
import { modulos } from "@/data/modules";
import { getLeccionesByModulo } from "@/data/lessons";

const MODULE_ICONS = [BookOpen, Code2, Layers, Zap, Database, GitBranch, Puzzle, Rocket];

export default function ProgresoPage() {
  const { user } = useAuth();
  const { progreso } = useProgress(user?.id);

  const completedLessons = progreso?.leccionesCompletadas || [];
  const badges = progreso?.insignias || [];
  const puntos = progreso?.puntos || 0;

  const totalLecciones = modulos.reduce((sum, m) => sum + m.lecciones.length, 0);
  const progressPercent = totalLecciones > 0 ? Math.round((completedLessons.length / totalLecciones) * 100) : 0;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">Mi Progreso</h1>
            <p className="text-zinc-500">Seguimiento de tu avance en el curso de TypeScript</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-100">{completedLessons.length}/{totalLecciones}</p>
                  <p className="text-sm text-zinc-500">Lecciones</p>
                </div>
              </div>
              <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Star size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-100">{puntos}</p>
                  <p className="text-sm text-zinc-500">Puntos</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Trophy size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-100">{badges.length}</p>
                  <p className="text-sm text-zinc-500">Insignias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-8 p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">Insignias obtenidas</h2>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <div
                    key={badge}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modules progress */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Progreso por modulo</h2>
            {modulos.map((modulo) => {
              const Icon = MODULE_ICONS[modulo.orden - 1] || BookOpen;
              const leccionesModulo = getLeccionesByModulo(modulo.id);
              const completadas = leccionesModulo.filter((l) => completedLessons.includes(l.id)).length;
              const total = leccionesModulo.length;
              const percent = total > 0 ? Math.round((completadas / total) * 100) : 0;
              const isComplete = completadas === total;

              return (
                <Link
                  key={modulo.id}
                  href={`/curso/${modulo.slug}`}
                  className="block p-4 rounded-xl border border-zinc-700/30 bg-dark-800/50 hover:border-zinc-600/50 hover:bg-dark-700/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete ? "bg-success/10 text-success" : "bg-dark-700 text-zinc-500"}`}>
                      {isComplete ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-zinc-200">{modulo.titulo}</h3>
                        <span className="text-xs text-zinc-500">Modulo {modulo.orden}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-500">{completadas}/{total}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${isComplete ? "text-success" : "text-zinc-400"}`}>
                      {percent}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
