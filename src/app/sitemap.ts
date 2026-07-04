import type { MetadataRoute } from "next";
import { modulos } from "@/data/modules";
import { lecciones } from "@/data/lessons";

const baseUrl = "https://typescript.javascript-learning-app.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonEntries = lecciones.flatMap((lesson) => {
    const modulo = modulos.find((m) => m.id === lesson.modulo);
    if (!modulo) return [];
    return [
      {
        url: `${baseUrl}/curso/${modulo.slug}/${lesson.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ];
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/curso`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...modulos.map((m) => ({
      url: `${baseUrl}/curso/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...lessonEntries,
    {
      url: `${baseUrl}/playground`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
