<!-- 导航组件 -->

<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect" background-color="#333" text-color="#fff">
      <router-link to="/about" style="text-decoration: none">
        <el-menu-item index="0"> 关于 </el-menu-item>
      </router-link>
      <el-sub-menu index="1">
        <template #title>工作台</template>
        <router-link to="/" style="text-decoration: none">
          <el-menu-item index="1-1"> 启动工作台 </el-menu-item>
        </router-link>
        <el-menu-item @click="handleIsShowAside">
          打开/隐藏侧边栏
        </el-menu-item>
        <el-menu-item @click="handleIsShowDebugger">
          打开/隐藏调试器
        </el-menu-item>
      </el-sub-menu>
      <!-- <router-link to="/chatMaker" style="text-decoration: none">
        <el-menu-item index="2">查找</el-menu-item>
      </router-link> -->
      <el-menu-item index="2" @click="handleIsShowAside">侧边栏控制</el-menu-item>
      <el-menu-item index="3" @click="handleIsShowDebugger">调试器控制</el-menu-item>
      <el-menu-item index="4" @click="handleIsShowRun">运行终端</el-menu-item>
      <router-link to="/help" style="text-decoration: none">
        <el-menu-item index="5">帮助</el-menu-item>
      </router-link>
      <div class="flex-grow" />

      <!-- <router-link>
        <el-icon><Sunny /></el-icon>
        </router-link> -->
      <!-- <el-sub-item index="4" id="iconContainer" class="icon-container">
        <div class="centered" @click="theme_change">
            <el-icon v-if="isLight" :color="'#e19127'" :size="'30px'"><Sunny /></el-icon>
            <el-icon v-if="!isLight" :color="'#f1c200'" :size="'30px'"><Moon /></el-icon>
        </div>
        </el-sub-item> -->

      <el-sub-menu index="6">
        <template #title>更多</template>
        <el-menu-item index="6-1"><a href="https://www.dyp02.vip" target="_blank">个人博客</a></el-menu-item>
        <el-menu-item index="6-2" @click="showBlogerMSG">联系博主</el-menu-item>
        <el-menu-item index="6-3"><a href="https://github.com/KurtDubain/-Web-PL-0-"
            target="_blank">前端仓库</a></el-menu-item>
        <el-menu-item index="6-4"><a href="https://github.com/KurtDubain/-Web-PL-0--backend"
            target="_blank">服务端仓库</a></el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "navBS",
  setup() {
    const store = useStore();
    const handleIsShowAside = () => {
      store.commit("global/changeIsShowAside");
    };
    const handleIsShowDebugger = () => {
      store.commit("global/changeIsShowDebugger");
    };
    const handleIsShowRun = () => {
      store.commit("global/changeIsShowTerminal");
    };
    const showBlogerMSG = () => {
      store.commit('global/changeIsShowBlogerMsg')
    }
    return {
      handleIsShowAside,
      handleIsShowDebugger,
      handleIsShowRun,
      showBlogerMSG
    };
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.el-menu--horizontal.el-menu {
  border-bottom: solid 1px #000000;
}
</style>
