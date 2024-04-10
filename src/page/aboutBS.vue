<template>
  <div class="flex flex-wrap justify-between">
    <!-- 卡片1 -->
    <div
      @click="showDialog(1)"
      class="w-1/2 p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>卡片1</span>
        </div> -->
        <template #header>
          <div class="clearfix">卡片1</div>
        </template>
        <div class="text-gray-700">这是一些关于卡片1的简介信息。</div>
      </el-card>
    </div>
    <!-- 卡片2 -->
    <div
      @click="showDialog(2)"
      class="w-1/2 p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <el-card class="box-card">
        <template #header>
          <div class="clearfix">卡片2</div>
        </template>
        <div class="text-gray-700">这是一些关于卡片2的简介信息。</div>
      </el-card>
    </div>
    <!-- 卡片3 -->
    <div
      @click="showDialog(3)"
      class="w-full p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <el-card class="box-card">
        <template #header>
          <div class="clearfix">卡片3</div>
        </template>
        <div class="text-gray-700">这是一些关于卡片3的简介信息。</div>
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
}
</style>
