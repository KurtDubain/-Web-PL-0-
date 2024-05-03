// 路由
import { createRouter, createWebHistory } from "vue-router";
import HomeRoutes from "./modules/home";
import AboutRoutes from "./modules/about";
import HelpRoutes from "./modules/help";
// import AdminRoutes from "./adminRoutes";

const routes = [...HomeRoutes, ...AboutRoutes, ...HelpRoutes];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
