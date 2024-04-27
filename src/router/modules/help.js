import { defineAsyncComponent } from "vue";

export default [
  {
    path: "/help",
    name: "Help",
    component: defineAsyncComponent(() => import("@/page/helpBS.vue")),
  },
];
