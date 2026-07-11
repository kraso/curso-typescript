"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Process OAuth callback hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data }) => {
        if (data.session) {
          window.history.replaceState({}, "", window.location.pathname);
          router.push("/curso");
        }
      });
      return;
    }

    // Fallback: check if session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/curso");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Iniciando sesion...</p>
      </div>
    </div>
  );
}
