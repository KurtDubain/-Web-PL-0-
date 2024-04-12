import { createRouter, createWebHistory } from "vue-router";
import HomeRoutes from "./modules/home";
import AboutRoutes from "./modules/about";
// import AdminRoutes from "./adminRoutes";

const routes = [...HomeRoutes, ...AboutRoutes];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
