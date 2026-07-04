"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  prevLesson?: { slug: string; titulo: string } | null;
  nextLesson?: { slug: string; titulo: string } | null;
  moduloSlug: string;
}

export default function LessonNavigation({
  prevLesson,
  nextLesson,
  moduloSlug,
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-zinc-800">
      {prevLesson ? (
        <Link
          href={`/curso/${moduloSlug}/${prevLesson.slug}`}
          className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <div className="text-right">
            <p className="text-xs text-zinc-500">Anterior</p>
            <p className="text-sm font-medium">{prevLesson.titulo}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Link
          href={`/curso/${moduloSlug}/${nextLesson.slug}`}
          className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <div className="text-right">
            <p className="text-xs text-zinc-500">Siguiente</p>
            <p className="text-sm font-medium">{nextLesson.titulo}</p>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <Link
          href="/curso"
          className="group flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <div className="text-right">
            <p className="text-xs text-zinc-500">Siguiente modulo</p>
            <p className="text-sm font-medium">Ver todos los modulos</p>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
