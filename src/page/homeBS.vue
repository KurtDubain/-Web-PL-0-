<template>
  <div class="workspace">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:"homeBS"
}
</script>

<style>
.workspace {
  flex: 1;
  background-color: #333; /* 设置为暗色背景，可以根据需要调整颜色 */
  color: #fff; /* 设置文本颜色为白色，以适应暗色背景 */
  padding: 10px;
  overflow-y: auto; /* 添加滚动条，以适应内容溢出时的滚动 */
  height: 100vh;
}
</style>