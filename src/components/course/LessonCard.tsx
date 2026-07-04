"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";
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
      className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 card-hover"
      style={{
        borderColor: completada ? "rgba(16, 185, 129, 0.3)" : "var(--border-color)",
        background: completada ? "rgba(16, 185, 129, 0.03)" : "var(--bg-surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{
          background: completada ? "rgba(16, 185, 129, 0.1)" : "var(--bg-elevated)",
          color: completada ? "#10b981" : "var(--text-muted)",
        }}
      >
        {completada ? (
          <CheckCircle2 size={20} />
        ) : (
          <Circle size={20} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className="font-medium truncate transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {lesson.titulo}
        </h4>
        <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>{lesson.descripcion}</p>
      </div>

      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
        <Clock size={12} />
        <span>{lesson.duracion}</span>
      </div>
    </Link>
  );
}
