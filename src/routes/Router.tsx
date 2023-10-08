import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { NotFound } from "../pages/Errors/NotFound";
import LandingPage from "../pages/LandingPage";

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
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
]);