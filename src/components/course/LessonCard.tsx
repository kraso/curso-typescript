"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types/course";

interface LessonCardProps {
  lesson: Lesson;
  completada: boolean;
  moduloSlug: string;
}

export default function LessonCard({ lesson, completada, moduloSlug }: LessonCardProps) {
  return (
    <Link
      href={`/curso/${moduloSlug}/${lesson.id}`}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
        completada
          ? "border-success/30 bg-success/5 hover:bg-success/10"
          : "border-zinc-700/30 bg-dark-800/30 hover:border-zinc-600/50 hover:bg-dark-700/30"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
          completada
            ? "bg-success/10 text-success"
            : "bg-dark-700 text-zinc-500 group-hover:text-primary group-hover:bg-primary/10"
        )}
      >
        {completada ? (
          <CheckCircle2 size={20} />
        ) : (
          <Circle size={20} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={cn(
            "font-medium truncate transition-colors",
            completada ? "text-zinc-200" : "text-zinc-300 group-hover:text-zinc-100"
          )}
        >
          {lesson.titulo}
        </h4>
        <p className="text-sm text-zinc-500 truncate">{lesson.descripcion}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Clock size={12} />
        <span>{lesson.duracion}</span>
      </div>
    </Link>
  );
}
