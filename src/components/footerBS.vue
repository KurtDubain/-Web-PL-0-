<!-- 设计的底部栏的组件 -->
<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/" class="footer-link">工作台</router-link>
        <el-divider direction="vertical" />
        <router-link to="/about" class="footer-link">关于</router-link>
        <el-divider direction="vertical" />

        <!-- <router-link to="/subscription" class="footer-link"
          >联系我们</router-link
        > -->
        <div class="footer-link cursor-pointer" @click="showBlogMSG">
          联系我们
        </div>
      </div>
      <div class="footer-info">
        <p>版权所有 &copy; 2023-2024 雪碧</p>
        <!-- <p>地址：xxx市xxx区xxx街道xxx号</p> -->
        <p>
          <a href="https://beian.miit.gov.cn/" target="_blank"
            >冀ICP备2023028175号</a
          >
        </p>
        <p>Email：kurt.du.cobain@gmail.com</p>
        <p>
          特别鸣谢前端代码贡献者：<a
            href="https://github.com/shenzhiyuzhou"
            target="_blank"
            >神之宇宙</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "footBS",
  setup() {
    const store = useStore();
    const showBlogMSG = () => {
      store.commit("global/changeIsShowBlogerMsg");
    };
    return {
      showBlogMSG,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer-container {
  background-color: #373737;
  padding: 20px 0;
  color: rgb(195, 195, 195);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-links {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-link {
  margin: 0 10px;
  text-decoration: none;
  color: #888;
}

.footer-info {
  font-size: 14px;
  text-align: center;
}
</style>
