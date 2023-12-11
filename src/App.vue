<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          
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

export default {
  name: 'App',
  components: {
    footerBS
  }
}
</script>

<style>

*{
  transition: 0.5s;
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
