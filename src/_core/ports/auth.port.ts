import { TLoginBody, TSignUpBody, TUserSession } from "@core/entities/user";

export interface IAuthPort {
  login(loginRequestBody: TLoginBody): Promise<TUserSession>;
  signUp(signUpBody: TSignUpBody): Promise<TUserSession>;
}