import { Route, Routes } from "react-router-dom";
import { EUserType } from "../@types/profile";
import CompleteCompnaySignUp from "../pages/Auth/CompleteCompnaySignUp";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { NotFound } from "../pages/Errors/NotFound";
import { Unauthorized } from "../pages/Errors/Unauthorized";
import LandingPage from "../pages/LandingPage";
import { CheckUserOnboarding } from "./CheckUserOnboarding";
import { RequireAuth } from "./RequireAuth";

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route index element={<LandingPage />} />
      <Route path="check" element={<CheckUserOnboarding />} >
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="company" element={<RequireAuth allowedRoles={[EUserType.representante]} />} >
        <Route path="register" element={<CompleteCompnaySignUp />} />
      </Route>
    </Routes>
  );
}
