<template>
  <div class="flex flex-wrap justify-between">
    <!-- 卡片1 -->
    <div @click="showDialog(1)" class="w-1/2 p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>卡片1</span>
        </div> -->
        <template #header>
          <div class="clearfix"><strong>项目介绍</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh]">
          <strong>项目简介</strong><br>
          本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。<br><br>

          <strong>主要功能</strong><br>
          - <em>代码编写：</em>直观的代码编辑器支持PL/0代码编写。<br>
          - <em>编译与执行：</em>一键编译执行，查看代码执行结果和状态。<br>
          - <em>调试工具：</em>集成调试工具，简化错误诊断和问题解决过程。<br>
          - <em>UI控制：</em>通过导航栏轻松访问各种工具和功能。<br>
          - <em>文件管理：</em>侧边栏支持文件的增删查改及导入导出管理。<br><br>
        </div>

      </el-card>
    </div>
    <!-- 卡片2 -->
    <div @click="showDialog(2)" class="w-1/2 p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix"><strong>注意事项</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh]"><strong>项目简介</strong><br>
          本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。<br><br>

          <strong>主要功能</strong><br>
          - <em>代码编写：</em>直观的代码编辑器支持PL/0代码编写。<br>
          - <em>编译与执行：</em>一键编译执行，查看代码执行结果和状态。<br>
          - <em>调试工具：</em>集成调试工具，简化错误诊断和问题解决过程。<br>
          - <em>UI控制：</em>通过导航栏轻松访问各种工具和功能。<br>
          - <em>文件管理：</em>侧边栏支持文件的增删查改及导入导出管理。<br><br>
        </div>
      </el-card>
    </div>
    <!-- 卡片3 -->
    <div @click="showDialog(3)" class="w-full p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix"><strong>语法规则</strong></div>
        </template>
        <div class="text-gray-500 h-[40vh]"><strong>项目简介</strong><br>
          本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。<br><br>

          <strong>主要功能</strong><br>
          - <em>代码编写：</em>直观的代码编辑器支持PL/0代码编写。<br>
          - <em>编译与执行：</em>一键编译执行，查看代码执行结果和状态。<br>
          - <em>调试工具：</em>集成调试工具，简化错误诊断和问题解决过程。<br>
          - <em>UI控制：</em>通过导航栏轻松访问各种工具和功能。<br>
          - <em>文件管理：</em>侧边栏支持文件的增删查改及导入导出管理。<br><br>
        </div>
      </el-card>
    </div>
  </div>

  <!-- 详细信息对话框 -->
  <el-dialog v-model="dialogVisible" :title="`卡片${activeCard}详细信息`">
    <div>这里展示卡片的详细信息...</div>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import { ElCard, ElDialog } from "element-plus";

export default {
  name: "AboutPage",
  components: {
    ElCard,
    ElDialog,
  },
  setup() {
    const dialogVisible = ref(false);
    const activeCard = ref(0);

    const showDialog = (cardNumber) => {
      activeCard.value = cardNumber;
      dialogVisible.value = true;
    };

    return {
      dialogVisible,
      activeCard,
      showDialog,
    };
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
  /* height: 50%; */
}
</style>
