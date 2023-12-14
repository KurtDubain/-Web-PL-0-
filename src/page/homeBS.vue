<!-- 工作台组件 -->
<template>
  <div class="workheader">
    {{pageTitle}}
  </div>

  <el-divider/>

  <div class="workspace">
    <div class="left-panel">
      <CodeEditorBS></CodeEditorBS>
    </div>
    
    <div class="right-panel">
      <CompilerBS></CompilerBS>
      <DebuggerBS></DebuggerBS>
    </div>
    
  </div>
</template>

<script>
import CodeEditorBS from '@/workSpace/CodeEditorBS.vue'
import CompilerBS from '@/workSpace/CompilerBS.vue'
import DebuggerBS from '@/workSpace/DebuggerBS.vue'
import {useStore} from 'vuex'
import { computed } from 'vue'

export default {
    name:"homeBS",
    components:{
      CodeEditorBS,
      CompilerBS,
      DebuggerBS
    },
    setup(){
      const store = useStore()
      let pageTitle = computed(()=>{
        const selectedFile = store.getters['files/selectedFile']
        return selectedFile? selectedFile.name:'未选中文件'
      })
      return {
        pageTitle
      }
    }
}
</script>

<style scoped>
*{
  overflow: hidden;
}
.workspace {
  flex: 1;
  background-color: #333; /* 设置为暗色背景，可以根据需要调整颜色 */
  color: #fff; /* 设置文本颜色为白色，以适应暗色背景 */
  padding: 10px;
  overflow-y: auto; /* 添加滚动条，以适应内容溢出时的滚动 */
  height: 95vh;
  display: flex;
  
}
.workheader{
  /* padding: 0px; */
  height: 5vh;
  background-color: rgba(51, 51, 51, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  border-bottom: 2px solid #333; /* 添加底部边框 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); 

}
.el-divider--horizontal{
  margin: 0;
  height: 0;
  /* color: rgb(108, 37, 37); */
  border-top:rgba(51, 51, 51, 0.687)
}
.left-panel{
  flex: 1;
}
.right-panel{
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>