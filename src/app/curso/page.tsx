import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModuleCardProgress from "@/components/course/ModuleCardProgress";
import { modulos } from "@/data/modules";
import { lecciones } from "@/data/lessons";

export const metadata: Metadata = {
  title: "Curso de TypeScript — Modulos",
  description: "Explora todos los modulos del curso de TypeScript",
};

export default function CursoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Curso de TypeScript
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              8 modulos, 40+ lecciones. Aprende desde los fundamentos hasta patrones avanzados.
            </p>
          </div>

          {/* Modules grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map((modulo) => (
              <ModuleCardProgress key={modulo.id} modulo={modulo} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
