import { container } from "tsyringe";

import { IAdminDashboardPort } from "@core/ports/admin-dashboard.port";
import { IAuthPort } from "@core/ports/auth.port";
import { ICompanyUserPort } from "@core/ports/company-user.port";
import { ICompanyPort } from "@core/ports/company.port";
import { IJobRolePort } from "@core/ports/job-role.port";
import { IPaymentPort } from "@core/ports/payment.port";
import { IPlanPort } from "@core/ports/plan.port";
import { ISubscriptionPort } from "@core/ports/subscription.port";
import { IUserPort } from "@core/ports/user.port";

import { AdminDashboardRepository } from "@adapters/supabase/AdminDashboardRepository";
import { AuthRepositorySupabase } from "@adapters/supabase/AuthRepositorySupabase";
import { CompanyRepositorySupabase } from "@adapters/supabase/CompanyRepositorySupabase";
import { CompanyUserRepositorySupabase } from "@adapters/supabase/CompanyUserRepositorySupabase";
import { JobRoleRepositorySupabase } from "@adapters/supabase/JobRoleRepositorySupabase";
import { PaymentRepositorySupabase } from "@adapters/supabase/PaymentRepositorySupabase";
import { PlanRepositorySupabase } from "@adapters/supabase/PlanRepositorySupabase";
import { SubscriptionRepositorySupabase } from "@adapters/supabase/SubscriptionRepositorySupabase";
import { UserRepositorySupabase } from "@adapters/supabase/UserRepositorySupabase";

// Register repository implementations for the application to resolve via tsyringe
container.registerSingleton<IPlanPort>("PlanRepository", PlanRepositorySupabase);
container.registerSingleton<IPaymentPort>("PaymentRepository", PaymentRepositorySupabase);
container.registerSingleton<IJobRolePort>("JobRoleRepository", JobRoleRepositorySupabase);
container.registerSingleton<ICompanyUserPort>("CompanyUserRepository", CompanyUserRepositorySupabase);
container.registerSingleton<ICompanyPort>("CompanyRepository", CompanyRepositorySupabase);
container.registerSingleton<ISubscriptionPort>("SubscriptionRepository", SubscriptionRepositorySupabase);
container.registerSingleton<IUserPort>("UserRepository", UserRepositorySupabase);
container.registerSingleton<IAuthPort>("AuthRepository", AuthRepositorySupabase);
container.registerSingleton<IAdminDashboardPort>("AdminDashboardRepository", AdminDashboardRepository);
