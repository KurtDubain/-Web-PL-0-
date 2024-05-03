import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./tailwnd.css";
const app = createApp(App);
// createApp(App).mount('#app')
app.use(ElementPlus);
app.use(store);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
// 优化Resize事件，避免在改变了窗口大小的情况下造成高频事件触发
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
};
