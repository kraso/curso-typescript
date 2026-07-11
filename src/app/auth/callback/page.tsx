"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // Exchange the code for a session
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || session) {
        router.push("/curso");
      }
    });

    // Also check for existing session
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
