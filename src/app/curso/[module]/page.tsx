"use client";

import { use, } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseSidebar from "@/components/course/CourseSidebar";
import LessonCard from "@/components/course/LessonCard";
import { getModuloBySlug, modulos } from "@/data/modules";
import { getLeccionesByModulo } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

export default function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: slug } = use(params);
  const modulo = getModuloBySlug(slug);
  const { user } = useAuth();
  const { progreso } = useProgress(user?.id);

  if (!modulo) return notFound();

  const leccionesModulo = getLeccionesByModulo(modulo.id);
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
            {/* Back to course */}
            <Link
              href="/curso"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Volver al curso
            </Link>

            {/* Header */}
            <div className="mb-8">
              <p className="text-sm text-primary mb-2">
                Modulo {modulo.orden}
              </p>
              <h1 className="text-3xl font-bold text-zinc-100 mb-2">
                {modulo.titulo}
              </h1>
              <p className="text-zinc-500">{modulo.descripcion}</p>
            </div>

            {/* Lessons list */}
            <div className="space-y-3">
              {leccionesModulo.map((leccion) => (
                <LessonCard
                  key={leccion.id}
                  lesson={leccion}
                  completada={completedLessons.includes(leccion.id)}
                  moduloSlug={modulo.slug}
                />
              ))}
            </div>

            {/* Exam link */}
            <Link
              href={`/curso/${modulo.slug}/examen`}
              className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-warning/10 border border-warning/30 text-warning rounded-xl font-medium hover:bg-warning/20 transition-colors"
            >
              Ir al examen del modulo
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
