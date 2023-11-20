import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { AdminCompanies } from "../pages/Admin/Company/AdminCompanies";
import { AdminCompanyDetails } from "../pages/Admin/Company/Details/AdminCompanyDetails";
import { CompanyNameBreadcrumb } from "../pages/Admin/Company/components/CompanyNameBreadcrumb";
import { AdminDashboard } from "../pages/Admin/Dashboard/AdminDashboard";
import { AdminPayments } from "../pages/Admin/Payments/AdminPayments";
import { AdminPlansPage } from "../pages/Admin/Plans/AdminPlansPage";
import { PlansForm } from "../pages/Admin/Plans/form/PlansForm";
import { AuthCompanyRegister } from "../pages/Auth/CompanyRegister/AuthCompanyRegister";
import { Login } from "../pages/Auth/Login/AuthLogin";
import { Logout } from "../pages/Auth/Logout/AuthLogout";
import { AuthSignUp } from "../pages/Auth/SignUp/AuthSignUp";
import { CompanyDashboard } from "../pages/Company/Dashboard/CompanyDashboard";
import { CompanyPlans } from "../pages/Company/Plans/CompanyPlans";
import { CompanyUserForm } from "../pages/Company/Users/CompanyUserForm";
import { CompanyUsers } from "../pages/Company/Users/CompanyUsers";
import { NotFound } from "../pages/Errors/NotFound";
import { Unauthorized } from "../pages/Errors/Unauthorized";
import { LandingPage } from "../pages/LandingPage/LandingPage";
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
        <Route path="sign-up" element={<AuthSignUp />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="complete-register" element={<AuthCompanyRegister />} />
        <Route path="company" element={<RequireRole allowedRoles={[EUserType.representante]} />} >
          <Route path="dashboard" element={<Outlet />} handle={{ title: "Dashboard" }} >
            <Route index element={<CompanyDashboard />} />
            <Route path="plan-details" element={<Outlet />} handle={{ title: "Planos" }} >
              <Route index element={<CompanyPlans />} />
            </Route>
            <Route path="users" element={<Outlet />} handle={{ title: "Usuários" }}>
              <Route index element={<CompanyUsers />} />
              <Route path="create" element={<CompanyUserForm />} handle={{ title: "Criar Usuário" }} />
              <Route path="create/:userId" element={<CompanyUserForm />} handle={{ title: "Editar Usuário" }} />
            </Route>
          </Route>
        </Route>
        <Route path="admin" element={<RequireRole allowedRoles={[EUserType.administrador]} />} >
          <Route path="dashboard" element={<Outlet />} handle={{ title: "Dashboard" }} >
            <Route path="companies" element={<Outlet />} handle={{ title: "Empresas" }} >
              <Route index element={<AdminCompanies />} />
              <Route path=":companyId" element={<AdminCompanyDetails />} handle={{ title: "Detalhes", breadcrumb: <CompanyNameBreadcrumb /> }} />
            </Route>
            <Route index element={<AdminDashboard />} />
            <Route path="payments" element={<AdminPayments />} handle={{ title: "Pagamentos" }} />
            <Route path="plans" element={<Outlet />} handle={{ title: "Plano" }} >
              <Route index element={<AdminPlansPage />} />
              <Route path="create" element={<PlansForm />} handle={{ title: "Criar Plano" }} />
              <Route path="create/:idPlan?" element={<PlansForm />} handle={{ title: "Editar Plano" }} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
