"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseSidebar from "@/components/course/CourseSidebar";
import MobileSidebar from "@/components/course/MobileSidebar";
import Quiz from "@/components/course/Quiz";
import { getModuloBySlug, modulos } from "@/data/modules";
import { getQuizByModulo } from "@/data/quizzes";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

export default function ExamenPage({ params }: { params: Promise<{ module: string }> }) {
  const { module: modSlug } = use(params);
  const { user } = useAuth();
  const { progreso } = useProgress(user?.id);

  const modulo = getModuloBySlug(modSlug);
  const quiz = modulo ? getQuizByModulo(modulo.id) : undefined;

  const completedLessons = progreso?.leccionesCompletadas || [];
  const badges = progreso?.insignias || [];
  const puntos = progreso?.puntos || 0;

  if (!modulo) return notFound();

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
        <MobileSidebar
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
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
              <Link href="/curso" className="hover:text-zinc-300 transition-colors">
                Curso
              </Link>
              <span>/</span>
              <Link href={`/curso/${modSlug}`} className="hover:text-zinc-300 transition-colors">
                {modulo.titulo}
              </Link>
              <span>/</span>
              <span className="text-zinc-300">Examen</span>
            </div>

            <div className="mb-8">
              <p className="text-sm text-warning mb-2">Examen del Modulo {modulo.orden}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
                {quiz ? quiz.titulo : modulo.titulo}
              </h1>
              <p className="text-zinc-500">
                {quiz
                  ? `${quiz.preguntas.length} preguntas de opcion multiple. Necesitas 70% para aprobar.`
                  : "Este modulo aun no tiene examen disponible."}
              </p>
            </div>

            {quiz ? (
              <div className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
                <Quiz
                  preguntas={quiz.preguntas}
                  moduloTitulo={quiz.titulo}
                  moduloSlug={modSlug}
                  onComplete={() => {}}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <Link
                  href={`/curso/${modSlug}`}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Volver al modulo
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
