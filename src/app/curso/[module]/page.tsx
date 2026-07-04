import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LessonCard from "@/components/course/LessonCard";
import { getModuloBySlug } from "@/data/modules";
import { getLeccionesByModulo } from "@/data/lessons";

interface Props {
  params: Promise<{ module: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const modulo = getModuloBySlug(slug);
  if (!modulo) return { title: "Modulo no encontrado" };

  return {
    title: `${modulo.titulo} — Curso TypeScript`,
    description: modulo.descripcion,
  };
}

export default async function ModulePage({ params }: Props) {
  const { module: slug } = await params;
  const modulo = getModuloBySlug(slug);

  if (!modulo) {
    notFound();
  }

  const leccionesModulo = getLeccionesByModulo(modulo.id);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                completada={false}
                moduloSlug={modulo.slug}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
