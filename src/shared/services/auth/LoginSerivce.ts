import { TUserSession } from "../../../@types/user";
import { supabaseClient } from "../../../config/supabase";
import { BaseError } from "../../errors/BaseError";
import { getUserProfile } from "./utils/supabase";

export interface ILoginAttributes {
  email: string;
  password: string;
}

const loginUnexpectedError = {
  title: "Falha inesperada ao realizar o login.",
  description: "Ocorreu um erro ao recuperar as informações do usuário."
}

export async function Login(loginAttributes: ILoginAttributes): Promise<TUserSession> {
  const { data, error } = await supabaseClient.auth.signInWithPassword(loginAttributes);
  if (error) {
    const title = error.status === 403 
      ? "Usuário ou senha incorretos." 
      : "Falha inesperada ao realizar o login."
    throw new BaseError({ ...loginUnexpectedError, title });
  }

  if (!data.session) throw new BaseError(loginUnexpectedError);

  const userProfile = await getUserProfile();
  if (!userProfile) throw new BaseError(loginUnexpectedError);

  return {
    user: userProfile,
    session: data.session,
  };
}
