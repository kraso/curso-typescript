"use client";

import { useState, useCallback } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { getAuthRedirectUrl } from "@/lib/auth-bridge";
import { supabase } from "@/lib/supabase/client";

const COURSES = [
  {
    id: "js",
    name: "JavaScript",
    landingUrl: "https://javascript-learning-app.dev",
    courseUrl: "https://javascript-learning-app.dev/curso",
    image: "https://javascript-learning-app.dev/og-image.png",
    color: "from-amber-500 to-yellow-400",
    borderColor: "border-amber-500/30",
    glowColor: "hover:shadow-amber-500/10",
  },
  {
    id: "react",
    name: "React",
    landingUrl: "https://react-learning-app.dev",
    courseUrl: "https://react-learning-app.dev",
    image: "https://react-learning-app.dev/og-image.png",
    color: "from-indigo-500 to-violet-400",
    borderColor: "border-indigo-500/30",
    glowColor: "hover:shadow-indigo-500/10",
  },
  {
    id: "ts",
    name: "TypeScript",
    landingUrl: "https://typescript.javascript-learning-app.dev",
    courseUrl: "https://typescript.javascript-learning-app.dev/curso",
    image: "https://typescript.javascript-learning-app.dev/og-image.png",
    color: "from-sky-500 to-cyan-400",
    borderColor: "border-sky-500/30",
    glowColor: "hover:shadow-sky-500/10",
  },
];

interface Course {
  id: string;
  name: string;
  landingUrl: string;
  courseUrl: string;
  image: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

export default function CourseBundleBanner({ currentCourse = "ts" }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleNavigate = useCallback(async (course: Course) => {
    const { data: { session } } = await supabase.auth.getSession();
    const targetUrl = session ? course.courseUrl : course.landingUrl;
    const redirectUrl = await getAuthRedirectUrl(supabase, targetUrl);
    window.location.href = redirectUrl;
  }, []);

  return (
    <section
      className="w-full border-y pt-16 pb-10 sm:pt-20 sm:pb-12"
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-elevated)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm sm:text-base mb-8 sm:mb-10" style={{ color: "var(--text-muted)" }}>
          <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
            Una sola cuenta.
          </span>{" "}
          Tres cursos gratuitos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COURSES.map((course) => {
            const isActive = course.id === currentCourse;
            return (
              <button
                key={course.id}
                onClick={() => !isActive && handleNavigate(course)}
                onMouseEnter={() => setHovered(course.id)}
                onMouseLeave={() => setHovered(null)}
                disabled={isActive}
                className={`
                  group relative w-full text-left rounded-2xl overflow-hidden
                  border transition-all duration-300
                  ${isActive
                    ? `border-transparent bg-gradient-to-r ${course.color} p-[2px]`
                    : `hover:-translate-y-1 hover:shadow-lg ${course.glowColor}`
                  }
                `}
                style={
                  isActive
                    ? {}
                    : {
                        borderColor: "var(--border-color)",
                        background: "var(--bg-surface)",
                      }
                }
              >
                {isActive ? (
                  <div
                    className="relative rounded-[calc(1rem-2px)] overflow-hidden"
                    style={{ background: "var(--bg-surface)" }}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
                        style={{ background: "rgba(0,0,0,0.7)", borderColor: "var(--border-color)" }}
                      >
                        <CheckCircle2 size={12} className="text-primary" />
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                          Estás aquí
                        </span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {course.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-video">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.1)" }}
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
                        style={{ background: "rgba(0,0,0,0.7)", borderColor: "var(--border-color)" }}
                      >
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                          Gratuito
                        </span>
                      </div>
                      {hovered === course.id && (
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.4)" }}
                        >
                          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium"
                            style={{ background: "rgba(0,0,0,0.8)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                          >
                            <ExternalLink size={14} />
                            Ir al curso
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {course.name}
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
