import { Router, Route, RootRoute } from "@tanstack/react-router";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Root from "../App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute]);

export const router = new Router({ routeTree });

export default router;
