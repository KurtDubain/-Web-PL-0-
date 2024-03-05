import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
// createApp(App).mount('#app')
app.use(ElementPlus);
app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
