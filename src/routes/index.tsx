import {
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { useAuthStore } from "@/features/auth/store";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";

// Redirect logic for `/`
const redirectRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      return window.location.replace("/dashboard");
    } else {
      return window.location.replace("/auth/login");
    }
  },
});

// Define protected route guard
const protectedRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/*",
  component: Dashboard,
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      return window.location.replace("/auth/login");
    }
  },
});

// Define individual routes
const loginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/login",
  component: Login,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/forgot-password",
  component: ForgotPassword,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/reset-password",
  component: ResetPassword,
});

// Create router instance
const routeTree = RootRoute.addChildren([
  loginRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  protectedRoute,
  redirectRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
