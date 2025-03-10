import {
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import Home from "@/pages/Home";

// Define individual routes
const homeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: Home,
});

// Create router instance
const routeTree = RootRoute.addChildren([homeRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
