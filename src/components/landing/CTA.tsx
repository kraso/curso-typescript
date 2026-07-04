"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
  return (
    <section className="py-24 relative" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="relative p-12 rounded-3xl overflow-hidden" style={{ border: "1px solid var(--border-color)", background: "var(--bg-surface)" }}>
            {/* Background glow */}
            <div className="absolute inset-0 gradient-bg opacity-50" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                ¿Listo para empezar?
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                Unete a miles de desarrolladores que ya estan aprendiendo TypeScript
                de forma interactiva.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="text-base px-8">
                  Empezar gratis
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
