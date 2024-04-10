// 引入Vue 3的defineAsyncComponent用于异步组件加载
import { defineAsyncComponent } from "vue";

export default [
  {
    path: "/",
    name: "Home",
    component: defineAsyncComponent(() => import("@/page/homeBS.vue")),
  },
];
