import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LessonContent from "@/components/course/LessonContent";
import LessonNavigation from "@/components/course/LessonNavigation";
import { getModuloBySlug } from "@/data/modules";
import { getLeccionById, getLeccionesByModulo } from "@/data/lessons";

interface Props {
  params: Promise<{ module: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: modSlug, lesson: lesId } = await params;
  const leccion = getLeccionById(lesId);
  if (!leccion) return { title: "Leccion no encontrada" };

  return {
    title: `${leccion.titulo} — Curso TypeScript`,
    description: leccion.descripcion,
  };
}

export default async function LessonPage({ params }: Props) {
  const { module: modSlug, lesson: lesId } = await params;
  const modulo = getModuloBySlug(modSlug);
  const leccion = getLeccionById(lesId);

  if (!modulo || !leccion) {
    notFound();
  }

  const leccionesModulo = getLeccionesByModulo(modulo.id);
  const currentIndex = leccionesModulo.findIndex((l) => l.id === lesId);

  const prevLesson = currentIndex > 0
    ? { slug: leccionesModulo[currentIndex - 1].id, titulo: leccionesModulo[currentIndex - 1].titulo }
    : null;

  const nextLesson = currentIndex < leccionesModulo.length - 1
    ? { slug: leccionesModulo[currentIndex + 1].id, titulo: leccionesModulo[currentIndex + 1].titulo }
    : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-zinc-300">{leccion.titulo}</span>
          </div>

          {/* Lesson header */}
          <div className="mb-8">
            <p className="text-sm text-primary mb-2">
              {leccion.moduloNombre} — Leccion {leccion.orden}
            </p>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">
              {leccion.titulo}
            </h1>
            <p className="text-zinc-500">{leccion.descripcion}</p>
          </div>

          {/* Lesson content */}
          <LessonContent content={leccion.contenido} />

          {/* Exercise */}
          {leccion.ejercicio && (
            <div className="mt-12 p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
              <h2 className="text-xl font-bold text-zinc-100 mb-4">
                Ejercicio pratico
              </h2>
              <p className="text-zinc-400 mb-6">{leccion.ejercicio.descripcion}</p>
              <div className="bg-[#0d1117] rounded-xl p-4 border border-zinc-800">
                <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
                  <code>{leccion.ejercicio.codigoInicial}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Navigation */}
          <LessonNavigation
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            moduloSlug={modSlug}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
