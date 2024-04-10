import { defineAsyncComponent } from "vue";

export default [
  {
    path: "/about",
    name: "About",
    component: defineAsyncComponent(() => import("@/page/aboutBS.vue")),
  },
];
