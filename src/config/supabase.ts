import { createClient } from "@supabase/supabase-js";
import { Database } from "../@types/database.types";

const environment = {
  SUPABASE_PROJECT_URL: "https://kssukrxppllwblifylcw.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzc3VrcnhwcGxsd2JsaWZ5bGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NTAwMzgsImV4cCI6MjAwOTUyNjAzOH0.tz5Q2J58EsXHfU_e1H-0Gq5hxbxosBakTzDqxm1fqgE"
} as const

export const supabaseClient = createClient<Database>(
  environment.SUPABASE_PROJECT_URL,
  environment.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
