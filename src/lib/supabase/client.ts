import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export interface Database {
  public: {
    Tables: {
      progreso_usuario: {
        Row: {
          user_id: string;
          app_id: string;
          leccion_id: string;
          insignias: string[] | null;
          puntos: number | null;
          tiempo_total: number | null;
        };
        Insert: {
          user_id: string;
          app_id: string;
          leccion_id: string;
          insignias?: string[] | null;
          puntos?: number | null;
          tiempo_total?: number | null;
        };
        Update: {
          user_id?: string;
          app_id?: string;
          leccion_id?: string;
          insignias?: string[] | null;
          puntos?: number | null;
          tiempo_total?: number | null;
        };
      };
    };
  };
}

let client: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function createClient() {
  if (!client) {
    client = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storage: typeof window !== "undefined" ? localStorage : undefined,
      },
    });
  }
  return client;
}

export const supabase = createClient();

export function isSupabaseConfigured() {
  return supabaseUrl !== "" && supabaseAnonKey !== "";
}
