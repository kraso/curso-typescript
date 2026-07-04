import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curso de TypeScript — Aprende desde cero",
  description:
    "Aprende TypeScript de forma interactiva. Lecciones, ejercicios praticos y proyectos reales. Gratis.",
  keywords: ["TypeScript", "curso", "aprender", "programacion", "web"],
  openGraph: {
    title: "Curso de TypeScript",
    description: "Aprende TypeScript desde cero de forma interactiva",
    type: "website",
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
    >
      <body className="min-h-full flex flex-col bg-dark-900 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
