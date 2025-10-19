import { supabaseClient } from "@config/supabase";
import { TLoginBody, TSignUpBody, TUserSession } from "@core/entities/user";
import { BaseError } from "@core/errors/BaseError";
import { UserProfileToSupabase } from "./mappers/UserProfileSupabaseMappers";

import { UserRepositorySupabase } from "@adapters/supabase/UserRepositorySupabase";
import { IAuthPort } from "@core/ports/auth.port";

export class AuthRepositorySupabase implements IAuthPort {
  constructor(private userService = new UserRepositorySupabase()) { }

  async login(loginRequestBody: TLoginBody): Promise<TUserSession> {
    const loginUnexpectedError = {
      title: "Falha inesperada ao realizar o login.",
      description: "Ocorreu um erro ao recuperar as informações do usuário."
    };

    await supabaseClient.auth.signOut();
    const { data, error } = await supabaseClient.auth.signInWithPassword(loginRequestBody);
    if (error) {
      const title = error.status === 403
        ? "Usuário ou senha incorretos."
        : "Falha inesperada ao realizar o login."
      throw new BaseError({ ...loginUnexpectedError, title });
    }

    if (!data.session) throw new BaseError(loginUnexpectedError);

    const userProfile = await this.userService.getUserProfile();
    if (!userProfile) throw new BaseError(loginUnexpectedError);

    return {
      user: userProfile,
      session: data.session,
    };
  }

  async signUp({
    email,
    password,
    profile
  }: TSignUpBody): Promise<TUserSession> {
    const profileSupabase = UserProfileToSupabase(profile);
    await supabaseClient.auth.signOut();
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: profileSupabase,
      }
    });

    // TODO: adicionar validacao
    if (error || !data.user || !data.session) {
      throw new BaseError({
        title: "Não foi possível criar a conta.",
        description: "Esse email já está registrado em nosso sistema.",
      });
    }
    const userProfile = await this.userService.getUserProfile();

    return {
      session: data.session,
      user: userProfile
    };
  }
}
