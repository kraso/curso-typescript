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

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const handleSessionSet = (e: CustomEvent) => {
      setUser(e.detail?.user ?? null);
      setLoading(false);
    };
    window.addEventListener('supabase:session-set' as any, handleSessionSet);

    return () => {
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
