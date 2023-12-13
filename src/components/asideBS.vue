<!-- 侧边工具组件 -->
<template>
  <div class="sidebar">
    <div class="toolbar">
        <button @click="importFile">导入</button>
        <button @click="exportFile">导出</button>
        <button @click="newFile">新建</button>
        <button @click="deleteFile">删除</button>
    </div>

    <el-divider />
    
    <div class="file-list">
        <div v-for="(file,index) in files"
            :key="index"
            @click="selectFile(index)"
            :class="{'selected':selectedIndex===index}"
        >
            <img src='file-icon.png' alt="file Icon" class="file-icon" />
            {{ file.name }}
        </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
    name:"asideBS",
    setup(){
        let files = ref([ 
            { name: 'File1'},
            { name: 'File2'},
        ])
        let selectedIndex = ref(null)

        const importFile = ()=>{

        }

        const exportFile = ()=>{

        }
        const newFile =()=>{

        }
        const deleteFile = ()=>{

        }

        const selectFile = (index)=>{
            selectedIndex.value = index
            console.log(selectedIndex.value)
        }

        return {
            files,
            selectedIndex,
            importFile,
            exportFile,
            newFile,
            deleteFile,
            selectFile
        }
    }
}
</script>

<style >
.sidebar {
  width: 180px;
  height: 100vh;
  background-color: #444444e8;
  padding: 10px;
  /* margin-bottom: 1px; */
  display: flex;
  flex-direction: column;
  border-bottom: #444444e8 2px solid;
}

.toolbar {
  margin-bottom: 10px;
}

.file-list {
  overflow-y: auto;
}

.file-list div {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.file-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.selected {
  background-color: rgb(194, 194, 194);
}

.unsaved {
  color: rgba(231, 251, 52, 0.843);
}

.el-divider--horizontal{
  border-top:1px rgba(122, 122, 122, 0.687) solid
}
</style>