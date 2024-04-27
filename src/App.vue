<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <navBS></navBS>
      </el-header>
      <el-container>
        <el-aside :width="isShow ? '180px' : '0'">
          <asideBS></asideBS>
        </el-aside>
        <el-container>
          <el-main>
            <!-- <homeBS></homeBS> -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <footerBS></footerBS>
      </el-footer>
    </el-container>
    <blogerBS></blogerBS>
  </div>
</template>

<script>
import { useDark, useToggle } from "@vueuse/core";
import footerBS from "./components/footerBS.vue";
import navBS from "./components/navBS.vue";
import asideBS from "./components/asideBS.vue";
// import blogerBSVue
// import homeBS from "./page/homeBS.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import blogerBS from './components/blogerBS.vue';

export default {
  name: "App",
  components: {
    footerBS,
    navBS,
    asideBS,
    blogerBS
    // homeBS,
  },
  setup() {
    const store = useStore();
    let isShow = computed(() => {
      return store.getters["global/isShowAside"];
    });
    const isDark = useDark();
    onMounted(() => {
      useToggle(isDark);
      localStorage.setItem("vueuse-color-scheme", "dark");
    });
    return {
      isShow,
    };
  },
};
</script>

<style>
.el-main {
  padding: 0;
}

.el-header {
  padding: 0;
}

.el-footer {
  padding: 0;
}

/* .el-aside {
  width: auto;
} */
html.dark {
  /* 多选框边框 */
  --el-border-color: #babdc3 !important;
  /* table的背景颜色 */
  --el-bg-color: #333333 !important;
  /* table的表格线条颜色 */
  --el-border-color-lighter: #444 !important;
}
</style>
