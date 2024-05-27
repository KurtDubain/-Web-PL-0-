<!-- 博主联系方式弹窗组件 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    title="博主信息"
    width="30%"
    :before-close="dialogClose"
  >
    <!-- 博主联系信息内容 -->
    <p>博主：<strong>雪碧</strong></p>
    <p class="cursor-pointer" @click="goToWeb(1)">
      个人博客：<strong>雪碧的小屋</strong>
    </p>
    <p class="cursor-pointer" @click="goToWeb(2)">
      Github：<strong>雪碧的Github</strong>
    </p>
    <p>
      Google Mail：<strong><em>kurt.du.cobain@gmail.com</em></strong>
    </p>
    <p>
      QQ邮箱：<strong><em>kurt.du.cobain@qq.com</em></strong>
    </p>
  </el-dialog>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ElDialog } from "element-plus";

export default {
  name: "blogerBS",
  components: {
    ElDialog,
  },
  setup() {
    const store = useStore();
    // const
    const dialogVisible = computed(() => {
      return store.getters["global/isShowBlogerMsg"];
    });

    const dialogClose = () => {
      store.commit("global/changeIsShowBlogerMsg");
    };
    const goToWeb = (num) => {
      let url;
      if (num == 1) {
        url = "https://www.dyp02.vip";
      } else if (num == 2) {
        url = "https://github.com/KurtDubain";
      }
      window.open(url, "_blank");
    };

    // const showBlogerMSG = () => {
    //     dialogVisible.value = true;
    // };

    return {
      dialogVisible,
      dialogClose,
      goToWeb,
    };
  },
};
</script>
