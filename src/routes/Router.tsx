import { createBrowserRouter } from "react-router-dom";
import CompleteCompnaySignUp from "../pages/Auth/CompleteCompnaySignUp";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { NotFound } from "../pages/Errors/NotFound";
import LandingPage from "../pages/LandingPage";
import { RequireAuth } from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/unautorized",
    element: <div>Unautorized</div>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "",
    element: <RequireAuth allowedRoles={["representante"]} />,
    children: [
      {
        path: "/register-company",
        element: <CompleteCompnaySignUp />
      },
    ]
  }
]);