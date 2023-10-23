import { Route, Routes } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { AdminDashboard } from "../pages/Admin/Dashboard/index";
import { CompanyRegister } from "../pages/Auth/CompanyRegister";
import { Login } from "../pages/Auth/Login";
import { Logout } from "../pages/Auth/Logout";
import { SignUp } from "../pages/Auth/SignUp";
import { CompanyPlanDetailsPage } from "../pages/Company/CompanyPlanDetails/CompanyPlanDetails";
import { CompanyDashboard } from "../pages/Company/Dashboard/CompanyDashboard";
import { NotFound } from "../pages/Errors/NotFound";
import { Unauthorized } from "../pages/Errors/Unauthorized";
import { LandingPage } from "../pages/LandingPage";
import { Auth } from "./Auth";
import { RedirectLoginRoute } from "./RedirectLoginRoute";
import { RequireRole } from "./RequireRole";

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route index element={<LandingPage />} />
      <Route path="logout" element={<Logout />} />
      <Route path="check" element={<RedirectLoginRoute />} >
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      <Route path="auth" element={<Auth />}>
        <Route path="complete-register" element={<CompanyRegister />} />
        <Route path="company" element={<RequireRole allowedRoles={[EUserType.representante]} />} >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="company-plan-details" element={<CompanyPlanDetailsPage />} />
        </Route>
        <Route path="admin" element={<RequireRole allowedRoles={[EUserType.administrador]} />} >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
