import {
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import Login from "@/pages/Auth/login";
import Dashboard from "@/pages/Dashboard";
import { useAuthStore } from "@/features/auth/store";

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

// Create router instance
const routeTree = RootRoute.addChildren([
  loginRoute,
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
