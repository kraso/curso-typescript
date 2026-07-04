"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseSidebar from "@/components/course/CourseSidebar";
import LessonContent from "@/components/course/LessonContent";
import LessonNavigation from "@/components/course/LessonNavigation";
import ExerciseEditor from "@/components/course/ExerciseEditor";
import { getModuloBySlug, modulos } from "@/data/modules";
import { getLeccionById, getLeccionesByModulo } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

export default function LessonPage({ params }: { params: Promise<{ module: string; lesson: string }> }) {
  const { module: modSlug, lesson: lesId } = use(params);
  const modulo = getModuloBySlug(modSlug);
  const leccion = getLeccionById(lesId);
  const { user } = useAuth();
  const { progreso, completarLeccion, estaCompletada } = useProgress(user?.id);

  if (!modulo || !leccion) return notFound();

  const leccionesModulo = getLeccionesByModulo(modulo.id);
  const currentIndex = leccionesModulo.findIndex((l) => l.id === lesId);

  const prevLesson = currentIndex > 0
    ? { slug: leccionesModulo[currentIndex - 1].id, titulo: leccionesModulo[currentIndex - 1].titulo }
    : null;

  const nextLesson = currentIndex < leccionesModulo.length - 1
    ? { slug: leccionesModulo[currentIndex + 1].id, titulo: leccionesModulo[currentIndex + 1].titulo }
    : null;

  const isCompleted = estaCompletada(lesId);

  const completedLessons = progreso?.leccionesCompletadas || [];
  const badges = progreso?.insignias || [];
  const puntos = progreso?.puntos || 0;

  return (
    <>
      <Navbar />
      <div className="flex">
        <CourseSidebar
          modulos={modulos.map((m) => ({
            id: m.id,
            slug: m.slug,
            titulo: m.titulo,
            orden: m.orden,
            lecciones: m.lecciones.map((l) => ({ id: l, titulo: l })),
          }))}
          completedLessons={completedLessons}
          badges={badges}
          puntos={puntos}
        />
        <main id="main-content" className="flex-1 pt-20 pb-16 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 flex-wrap">
              <Link href="/curso" className="hover:text-zinc-300 transition-colors">
                Curso
              </Link>
              <span>/</span>
              <Link href={`/curso/${modSlug}`} className="hover:text-zinc-300 transition-colors">
                {modulo.titulo}
              </Link>
              <span>/</span>
              <span className="text-zinc-300">{leccion.titulo}</span>
            </div>

            {/* Back to module */}
            <Link
              href={`/curso/${modSlug}`}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Volver a {modulo.titulo}
            </Link>

            {/* Lesson header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-primary">
                  {leccion.moduloNombre} — Leccion {leccion.orden}
                </p>
                <span className="text-zinc-600">·</span>
                <span className="text-sm text-zinc-500">{leccion.duracion}</span>
              </div>
              <h1 className="text-3xl font-bold text-zinc-100 mb-2">
                {leccion.titulo}
              </h1>
              <p className="text-zinc-500">{leccion.descripcion}</p>
            </div>

            {/* Complete button */}
            <button
              onClick={() => completarLeccion(lesId, leccion.recompensa?.insignia)}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all mb-8 ${
                isCompleted
                  ? "bg-success/10 border border-success/30 text-success"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={18} />
                  Leccion completada
                </>
              ) : (
                "Marcar como completada"
              )}
            </button>

            {/* Lesson content */}
            <LessonContent content={leccion.contenido} />

            {/* Exercise */}
            {leccion.ejercicio && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-zinc-100 mb-4">
                  Ejercicio pratico
                </h2>
                <p className="text-zinc-400 mb-6">{leccion.ejercicio.descripcion}</p>
                <ExerciseEditor
                  exercise={leccion.ejercicio}
                  onComplete={() => completarLeccion(lesId, leccion.recompensa?.insignia)}
                />
              </div>
            )}

            {/* Navigation */}
            <LessonNavigation
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              moduloSlug={modSlug}
            />

            {/* Next module link */}
            {!nextLesson && (
              <Link
                href={`/curso/${modSlug}/examen`}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-warning/10 border border-warning/30 text-warning rounded-xl font-medium hover:bg-warning/20 transition-colors"
              >
                Ir al examen del modulo
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
