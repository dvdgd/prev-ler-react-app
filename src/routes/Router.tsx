import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { AdminDashboard } from "../pages/Admin/Dashboard/index";
import { AdminPlans } from "../pages/Admin/Plans";
import { PlansForm } from "../pages/Admin/Plans/form/PlansForm";
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

export const routesCreateBrowserRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="logout" element={<Logout />} />
      <Route path="check" element={<RedirectLoginRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="complete-register" element={<CompanyRegister />} />
        <Route path="company" element={<RequireRole allowedRoles={[EUserType.representante]} />} >
          <Route path="dashboard" element={<Outlet />} handle={{ title: "Dashboard" }} >
            <Route index element={<CompanyDashboard />} />
            <Route path="plan-details" element={<Outlet />} handle={{ title: "Planos" }} >
              <Route index element={<CompanyPlanDetailsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="admin" element={<RequireRole allowedRoles={[EUserType.administrador]} />} >
          <Route path="dashboard" element={<Outlet />} handle={{ title: "Dashboard" }} >
            <Route index element={<AdminDashboard />} />
            <Route path="plans" element={<Outlet />} handle={{ title: "Plano" }} >
              <Route index element={<AdminPlans />} />
              <Route path="create/:idPlan?" element={<PlansForm />} handle={{ title: "Criar Plano" }} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
