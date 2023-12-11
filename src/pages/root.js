import { Router, Route, RootRoute } from "@tanstack/react-router";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Root from "../App";
import Profile from "./Profile";
import AddListing from "./AddListing";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});

const listingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/addlisting",
  component: AddListing,
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

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  profileRoute,
  homeRoute,
  listingRoute,
]);

export const router = new Router({ routeTree });

export default router;
