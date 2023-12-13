<template>
  <div class="common-layout">
    <el-container>
      <el-header><navBS></navBS></el-header>
      <el-container>
        <el-aside width="200px">
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

export default {
  name: 'App',
  components: {
    footerBS,
    navBS,
    asideBS,
    homeBS
  }
}
</script>

<style>

*{
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
