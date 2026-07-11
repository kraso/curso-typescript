import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import CrossDomainAuth from "@/components/CrossDomainAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Curso de TypeScript — Aprende desde cero",
  description:
    "Aprende TypeScript de forma interactiva. Lecciones, ejercicios practicos y proyectos reales. Gratis.",
  keywords: ["TypeScript", "curso", "aprender typescript", "programacion", "web", "tutorial typescript", "gratis"],
  openGraph: {
    title: "Curso de TypeScript",
    description: "Aprende TypeScript desde cero de forma interactiva",
    type: "website",
    locale: "es_ES",
    siteName: "Curso TypeScript",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curso de TypeScript",
    description: "Aprende TypeScript desde cero de forma interactiva",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://typescript.javascript-learning-app.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ts-course-theme') || 'dark';
                  if (theme === 'auto') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
        <CrossDomainAuth />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
