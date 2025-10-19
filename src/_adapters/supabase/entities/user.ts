import { Session as SupabaseSession } from "@supabase/supabase-js";
import { TUser } from "@core/entities/user";

export type TUserSession = {
  user: TUser | undefined;
  session: SupabaseSession | undefined;
}
