import { TUserSession } from "@adapters/supabase/entities/user";
import { TUserProfile } from "@core/entities/profile";
import { TUser } from "@core/entities/user";

export interface IUserPort {
  getUserSession(): Promise<TUserSession | undefined>;
  getUserProfile(): Promise<TUser | undefined>;
  updateProfileByUserId(profile: Partial<TUserProfile>, userId: string): Promise<void>;
}
