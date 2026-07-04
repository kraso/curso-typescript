import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/perfil", "/progreso", "/auth/"],
      },
    ],
    sitemap: "https://typescript.javascript-learning-app.dev/sitemap.xml",
  };
}
