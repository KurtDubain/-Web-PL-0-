<template>
  <div class="flex flex-wrap justify-between">
    <!-- 卡片1 -->
    <div class="w-1/2 p-4 hover:shadow-lg transition-shadow">
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>卡片1</span>
        </div> -->
        <template #header>
          <div class="clearfix"><strong>项目介绍</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh]">
          <strong>项目简介</strong><br>
          本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。具体联系方式，可以点击“更多”来查看。<br><br>

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
    <div class="w-1/2 p-4 hover:shadow-lg transition-shadow">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix"><strong>注意事项</strong></div>
        </template>
        <div class="text-gray-500 h-[30vh]">
          <!-- <strong>项目简介</strong><br> -->
          <!-- 本项目是一个面向Web的PL/0语言集成开发环境，旨在提供便捷的PL/0调试开发工具。我们诚邀社区成员在issue中提出宝贵意见并参与项目改进。<br><br> -->

          <strong>使用上的注意</strong><br>
          - <em>文件管理：</em>支持pl0后缀的文件的读取（本质上可以设置多种后缀），暂不支持重命名。<br>
          - <em>编译器输出：</em>对于一些特殊样式的输出产物，可能有显示不全的问题，可以关闭调试器来完整查看。<br>
          - <em>调试器调试：</em>对于一些断点无法做到反映射（例如begin、end等字段），但是总体不影响调试功能。<br>
          - <em>模式选择：</em>WASM模式存在诸多限制，对于有调试需求、自定义输入需求，推荐使用JS模式。<br>
          - <em>终端查看：</em>终端的“清除”功能只会清除历史执行记录，仍会保留当前代码框内的执行结果。<br><br>
          <strong>其他使用指引</strong>
          <br>
          - <em>对于一些语法规则，可以参考“帮助”下提供的几个简单示例，点击跳转</em><br>
          - <em>如果点击“编译”或者“调试”，没有合理的输出结果，请检查代码是否有编写问题，系统可能在某些情况下无法检测到</em><br>
          - <em>由于PL0语法限制，整个代码只有一个作用域“Global”，没有局部作用域，请注意书写</em>
        </div>
      </el-card>
    </div>
    <!-- 卡片3 -->
    <div @click="showDialog(3)" class="w-full p-4 hover:shadow-lg transition-opactiy cursor-pointer">
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
