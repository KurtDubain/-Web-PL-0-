import { defineAsyncComponent } from "vue";

export default [
  {
    path: "/",
    name: "Home",
    component: defineAsyncComponent(() => import("@/page/homeBS.vue")),
  },
];
