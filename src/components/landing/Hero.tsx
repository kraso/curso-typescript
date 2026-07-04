"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8 animate-fade-in" style={{ background: "var(--bg-elevated)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <Sparkles size={14} className="text-primary" />
          Curso 100% interactivo y gratuito
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.05] tracking-tight animate-slide-up text-balance">
          <span style={{ color: "var(--text-primary)" }}>TypeScript</span>
          <br />
          <span className="text-gradient">domina el tipado</span>
        </h1>

        {/* Code preview */}
        <div className="max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/5" style={{ border: "1px solid var(--border-color)" }}>
            <div className="p-3 sm:p-6 text-left" style={{ background: "#0d1117" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-zinc-500 font-mono">app.ts</span>
              </div>
              <pre className="text-sm font-mono leading-relaxed">
                <code>
                  <span className="syn-keyword">interface</span>{" "}
                  <span className="syn-type">User</span> {"{"}
                  {"\n"}  <span className="syn-property">name</span>:{" "}
                  <span className="syn-type">string</span>;
                  {"\n"}  <span className="syn-property">age</span>:{" "}
                  <span className="syn-type">number</span>;
                  {"\n"}  <span className="syn-property">email</span>:{" "}
                  <span className="syn-type">string</span>;
                  {"\n}"}
                  {"\n\n"}
                  <span className="syn-keyword">function</span>{" "}
                  <span className="syn-function">greet</span>(
                  <span className="syn-param">user</span>:{" "}
                  <span className="syn-type">User</span>):{" "}
                  <span className="syn-type">string</span> {"{"}
                  {"\n"}  <span className="syn-keyword">return</span>{" "}
                  <span className="syn-string">`Hola, $&#123;user.name&#125;!`</span>;
                  {"\n}"}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up text-balance" style={{ animationDelay: "0.1s", color: "var(--text-secondary)" }}>
          Aprende el lenguaje que potencia JavaScript.
          Escribe codigo seguro, resuelve ejercicios y avanza a tu ritmo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/auth/register">
            <Button size="lg" className="text-base sm:text-lg px-8">
              Empezar ahora
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/curso">
            <Button variant="secondary" size="lg" className="text-base sm:text-lg px-8">
              <Play size={16} />
              Ver lecciones
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>40+</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Lecciones</p>
          </div>
          <div className="w-px h-10" style={{ background: "var(--border-color)" }} />
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>8</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Modulos</p>
          </div>
          <div className="w-px h-10" style={{ background: "var(--border-color)" }} />
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>100%</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Gratis</p>
          </div>
        </div>
      </div>
    </section>
  );
}
