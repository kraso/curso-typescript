"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu, X, LogOut,
  BookOpen, ChevronDown, Trophy, User, Sparkles, Library, FileText, Sun, Moon, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useTheme } from "@/hooks/useTheme";
import { sincronizarProgresoASupabase, limpiarProgresoLocal } from "@/lib/progress";
import { getAuthRedirectUrl } from "@/lib/auth-bridge";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const { progreso } = useProgress(user?.id);
  const { theme, toggleTheme } = useTheme();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (user?.id) {
      await sincronizarProgresoASupabase(user.id);
    }
    limpiarProgresoLocal();
    await signOut();
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";
  const userInitial = userName.charAt(0).toUpperCase();
  const userAvatar = user?.user_metadata?.avatar_url || null;
  const totalLecciones = progreso?.leccionesCompletadas?.length || 0;

  const landingLinks = [
    { id: "inicio", label: "Inicio", icon: Sparkles },
    { id: "caracteristicas", label: "Caracteristicas", icon: Library },
    { id: "recursos", label: "Recursos", icon: FileText },
  ];

  const navLinks = [
    { href: "/curso", label: "Curso", icon: BookOpen },
  ];

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              TS
            </div>
            <span className="text-zinc-100 font-semibold text-lg hidden sm:block group-hover:text-white transition-colors">
              TypeScript
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHome ? (
              landingLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
                  aria-label={`Ir a ${link.label}`}
                >
                  <link.icon size={16} />
                  {link.label}
                </button>
              ))
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname?.startsWith(link.href)
                      ? "text-zinc-100 bg-dark-700/50"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))
            )}
            {isHome && (
              <Link
                href="/curso"
                className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                <BookOpen size={16} />
                Empezar Curso
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 min-w-[44px] min-h-[44px] rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
              title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
              aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Progress badge */}
            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-700/50 border border-zinc-700/50 text-zinc-400 text-xs">
                <Trophy size={12} className="text-warning" />
                <span>{totalLecciones} lecciones</span>
              </div>
            )}

            {/* Auth */}
            {!loading && (
              <>
                {user ? (
                  <div ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                      aria-label="Menu de usuario"
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                        {userAvatar ? (
                          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                        ) : (
                          userInitial
                        )}
                      </div>
                      <ChevronDown size={14} className="text-zinc-400" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-dark-800 border border-zinc-700/60 rounded-xl shadow-2xl py-2 animate-fade-in">
                        <div className="px-4 py-2 border-b border-zinc-700/60">
                          <p className="text-sm font-medium text-zinc-100">{userName}</p>
                          <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                        <Link
                          href="/perfil"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                        >
                          <User size={14} />
                          Mi Perfil
                        </Link>
                        <Link
                          href="/progreso"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                        >
                          <Trophy size={14} />
                          Mi Progreso
                        </Link>
                        <div className="border-t border-zinc-700/60 my-1">
                          <p className="px-4 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Mis Cursos
                          </p>
                          <button
                            onClick={async () => {
                              const url = await getAuthRedirectUrl(supabase, "https://javascript-learning-app.dev/curso");
                              window.location.href = url;
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                          >
                            <ExternalLink size={14} />
                            JavaScript
                          </button>
                          <button
                            onClick={async () => {
                              const url = await getAuthRedirectUrl(supabase, "https://react-learning-app.dev");
                              window.location.href = url;
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                          >
                            <ExternalLink size={14} />
                            React
                          </button>
                          <button
                            onClick={async () => {
                              const url = await getAuthRedirectUrl(supabase, "https://typescript.javascript-learning-app.dev/curso");
                              window.location.href = url;
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-dark-700/60 transition-colors"
                          >
                            <ExternalLink size={14} />
                            TypeScript
                          </button>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-dark-700/60 transition-colors"
                        >
                          <LogOut size={14} />
                          Cerrar sesion
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      Iniciar sesion
                    </Link>
                    <Link
                      href="/auth/register"
                      className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] text-zinc-400 hover:text-zinc-100"
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800 py-4 animate-fade-in">
            {isHome ? (
              landingLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50 transition-colors"
                  aria-label={`Ir a ${link.label}`}
                >
                  <link.icon size={16} />
                  {link.label}
                </button>
              ))
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname?.startsWith(link.href)
                      ? "text-zinc-100 bg-dark-700/50"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-dark-700/50"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))
            )}
            {isHome && (
              <Link
                href="/curso"
                className="flex items-center gap-2 mx-3 mt-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                <BookOpen size={16} />
                Empezar Curso
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
