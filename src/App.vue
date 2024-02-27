<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <navBS></navBS>
      </el-header>
      <el-container>
        <el-aside :width="isShow ? '200px' : '0'">
          <asideBS></asideBS>
        </el-aside>
        <el-container>
          <el-main>
            <homeBS></homeBS>
          </el-main>

        </el-container>
      </el-container>
      <el-footer>
        <footerBS></footerBS>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import footerBS from './components/footerBS.vue'
import navBS from './components/navBS.vue'
import asideBS from './components/asideBS.vue'
import homeBS from './page/homeBS.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'App',
  components: {
    footerBS,
    navBS,
    asideBS,
    homeBS
  },
  setup() {
    const store = useStore()
    let isShow = computed(() => {
      return store.getters['global/isShowAside']
    })
    return {
      isShow
    }
  }
}
</script>

<style>
* {
  transition: 0.5s;
  /* background-color: black; */
}

.el-main {
  padding: 0;
}


.el-header {
  padding: 0;
}


.el-footer {
  padding: 0;
}
</style>
