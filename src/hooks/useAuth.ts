"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    let cancelled = false;

    const tryGetUser = async () => {
      for (let i = 0; i < 10; i++) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (!cancelled) {
            setUser(user);
            setLoading(false);
          }
          return;
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      if (!cancelled) setLoading(false);
    };

    tryGetUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    const handleSessionSet = (e: CustomEvent) => {
      if (!cancelled) {
        setUser(e.detail?.user ?? null);
        setLoading(false);
      }
    };
    window.addEventListener('supabase:session-set' as any, handleSessionSet);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      window.removeEventListener('supabase:session-set' as any, handleSessionSet);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured()) return { error: new Error("Supabase not configured") };
    const supabase = createClient();
    return supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signUp = useCallback(async (email: string, password: string, nombre: string) => {
    if (!isSupabaseConfigured()) return { error: new Error("Supabase not configured") };
    const supabase = createClient();
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: nombre } },
    });
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.auth.signOut();
  }, []);

  const refreshUser = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }, []);

  return { user, loading, signIn, signUp, signOut, refreshUser };
}
