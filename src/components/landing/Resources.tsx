"use client";

import { ExternalLink, BookOpen, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const documentos = [
  {
    title: "TypeScript Official Docs",
    description: "La documentacion oficial de TypeScript. Referencia completa de tipos, configuracion y guias.",
    href: "https://www.typescriptlang.org/docs/",
    color: "text-blue-400",
  },
  {
    title: "TypeScript Handbook",
    description: "El handbook oficial paso a paso. Ideal para aprender desde cero hasta avanzado.",
    href: "https://www.typescriptlang.org/docs/handbook/",
    color: "text-sky-400",
  },
  {
    title: "TypeScript Deep Dive",
    description: "Libro gratuito y completo por Basarat. Explicaciones detalladas con ejemplos reales.",
    href: "https://basarat.gitbook.io/typescript/",
    color: "text-violet-400",
  },
  {
    title: "Total TypeScript",
    description: "Ejercicios interactivos para dominar TypeScript. De Matt Pocock, experto en la comunidad.",
    href: "https://www.totaltypescript.com/",
    color: "text-emerald-400",
  },
  {
    title: "Type Challenges",
    description: "Desafios de tipos para practicar TypeScript avanzado. Desde basico hasta experto.",
    href: "https://github.com/type-challenges/type-challenges",
    color: "text-amber-400",
  },
  {
    title: "TypeScript Exercises",
    description: "Ejercicios praticos para aprender TypeScript haciendo. Progresivo y interactivo.",
    href: "https://typescript-exercises.github.io/",
    color: "text-rose-400",
  },
];

const cursos = [
  {
    title: "FreeCodeCamp — TypeScript",
    description: "Curso completo y gratuito de TypeScript con certificacion. Proyectos praticos incluidos.",
    href: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
    color: "text-emerald-400",
  },
  {
    title: "Matt Pocock — Total TypeScript",
    description: "El curso mas completo de TypeScript. Desde basico hasta patronoes de diseño avanzados.",
    href: "https://www.totaltypescript.com/tutorials",
    color: "text-sky-400",
  },
  {
    title: "Fireship — TypeScript",
    description: "Video tutorial rapido y efectivo. Aprende TypeScript en 100 segundos y mas alla.",
    href: "https://youtu.be/BwuLxPH8IDs",
    color: "text-amber-400",
  },
  {
    title: "Academind — TypeScript",
    description: "Curso completo de TypeScript con Node.js y React. Explicaciones claras y projetos reales.",
    href: "https://academind.com/learn/typescript",
    color: "text-violet-400",
  },
  {
    title: "Platzi — TypeScript",
    description: "Cursos gratuitos de TypeScript moderno y programacion tipada en espanol.",
    href: "https://platzi.com/clases-de-typescript/",
    color: "text-rose-400",
  },
  {
    title: "Midudev — TypeScript",
    description: "Contenido en espanol sobre TypeScript moderno, utilidades y mejores practicas.",
    href: "https://midu.dev/",
    color: "text-cyan-400",
  },
];

function ResourceCard({ resource }: { resource: typeof documentos[0] }) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-5 rounded-xl bg-dark-800/60 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 hover:bg-dark-800/80 flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`text-sm font-semibold ${resource.color} group-hover:underline leading-snug`}>
          {resource.title}
        </h3>
        <ExternalLink size={14} className="text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-0.5 transition-colors" />
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed flex-1">
        {resource.description}
      </p>
    </a>
  );
}

export default function Resources() {
  return (
    <section className="relative py-24 sm:py-32 bg-dark-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Documentacion y Recursos */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
              <BookOpen size={14} className="text-primary" />
              Documentacion y recursos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
              Documentacion oficial
              <br />
              <span className="text-gradient">y recursos esenciales</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Las mejores referencias para consultar, profundizar y resolver dudas
              mientras aprendes TypeScript.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {documentos.map((doc, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <ResourceCard resource={doc} />
            </ScrollReveal>
          ))}
        </div>

        {/* Cursos Gratuitos */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-sm font-medium mb-6">
              <GraduationCap size={14} className="text-primary" />
              Aprendizaje complementario
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">
              Cursos gratuitos
              <br />
              <span className="text-gradient">recomendados</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Complementa este curso con otros recursos gratuitos de la comunidad.
              Todo lo que necesitas para seguir creciendo.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursos.map((curso, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <ResourceCard resource={curso} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
