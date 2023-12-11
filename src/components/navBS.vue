<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        background-color="#333" 
        text-color="#fff" 
    >
        <router-link to="/about" style="text-decoration:none">
        <el-menu-item index="0">
            关于
        </el-menu-item>
        </router-link>
        <el-sub-menu index="1">
        <template #title>分类</template>
        <router-link to="/" style="text-decoration:none">
            <el-menu-item index="1-1" >
            首页
            </el-menu-item>
        </router-link>
        <router-link to="/pyhcials" style="text-decoration:none">
            <el-menu-item index="1-2">
            体育
            </el-menu-item>
        </router-link>
        <router-link to="/technology" style="text-decoration:none">
            <el-menu-item index="1-3">
            技术
            </el-menu-item>
        </router-link>
        <router-link to="/community" style="text-decoration:none">
            <el-menu-item index="1-4">
            社区
            </el-menu-item>
        </router-link>
        </el-sub-menu>
        <router-link to="/chatMaker" style="text-decoration:none">
        <el-menu-item index="2">留言板</el-menu-item>
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

        
        <el-sub-menu index="3">
        <template #title>更多</template>
        <router-link to="/write" style="text-decoration:none">
            <el-menu-item index="3-1">嗖</el-menu-item>
        </router-link>
        <router-link to="/subscription" style="text-decoration:none">
            <el-menu-item index="3-2">订阅</el-menu-item>
        </router-link>
        <router-link to="/write" style="text-decoration:none">
            <el-menu-item index="3-3">实验室</el-menu-item>
        </router-link>
        <router-link to="/weather" style="text-decoration:none">
            <el-menu-item index="3-4">天气预报</el-menu-item>
        </router-link>
        <el-menu-item index="3-5" @click="showAnnouncement">公告</el-menu-item>

        </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
    name:"navBS"
}
</script>

<style>
    .flex-grow{
        flex-grow:1
    }
</style>