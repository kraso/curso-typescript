"use client";

import { Code2, Shield, Zap, BookOpen, Terminal, Puzzle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: Code2,
    title: "Tipado Estricto",
    description: "Detecta errores antes de que ocurran. Tu codigo sera mas seguro y confiable.",
  },
  {
    icon: Shield,
    title: "Seguridad en Tiempo de Compilacion",
    description: "Obliga a manejar todos los casos posibles. Sin sorpresas en produccion.",
  },
  {
    icon: Zap,
    title: "Autocompletado Inteligente",
    description: "Tu editor sabra exactamente que tipos esperar. Productividad x10.",
  },
  {
    icon: BookOpen,
    title: "Documentacion Viva",
    description: "Los tipos son documentacion que nunca se desactualiza.",
  },
  {
    icon: Terminal,
    title: "Interoperabilidad Total",
    description: "Trabaja con cualquier libreria JavaScript. Compatibilidad total.",
  },
  {
    icon: Puzzle,
    title: "Escalabilidad",
    description: "Proyectos grandes se mantienen limpios y manejables.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-dark-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Por que aprender TypeScript?
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              El lenguaje que esta transformando la forma en que escribimos JavaScript.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/30 hover:border-zinc-600/50 hover:bg-dark-700/30 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
