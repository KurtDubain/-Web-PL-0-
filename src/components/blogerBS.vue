<template>
    <el-dialog v-model="dialogVisible" title="博主信息" width="30%" :before-close="dialogClose">
        <!-- 博主联系信息内容 -->
        <p>博主代号：<strong>雪碧</strong></p>
        <p>个人博客：<strong><a href="https:www.dyp02.vip" target="_blank">雪碧的小屋</a></strong></p>
        <p>个人仓库：<strong><a href="https://github.com/KurtDubain" target="_blank">雪碧的仓库</a></strong></p>
        <p>Google Mail：<strong><em>kurt.du.cobain@gmail.com</em></strong></p>
        <p>QQ邮箱：<strong><em>kurt.du.cobain@qq.com</em></strong></p>
    </el-dialog>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex"
import { ElDialog } from "element-plus";

export default {
    name: "blogerBS",
    components: {
        ElDialog,
    },
    setup() {
        const store = useStore()
        // const 
        const dialogVisible = computed(() => { return store.getters['global/isShowBlogerMsg'] });

        const dialogClose = () => {
            store.commit('global/changeIsShowBlogerMsg')
        }

        // const showBlogerMSG = () => {
        //     dialogVisible.value = true;
        // };

        return {
            dialogVisible,
            dialogClose,
        };
    },
};
</script>