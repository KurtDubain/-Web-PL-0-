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
            <!-- <img src='file-icon.png' alt="file Icon" class="file-icon" /> -->
            <el-icon :size="30"><Document /></el-icon>
            {{ file.name }}
        </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
    name:"asideBS",
    setup(){
        const store = useStore()
        let files = computed(()=>store.getters['files/allFiles'])
        let selectedIndex = computed(()=>store.getters['files/getIndex'])


        const importFile = async ()=>{
          const fileInput = document.createElement('input')
          fileInput.type = 'file'
          // fileInput.accept = ''
          fileInput.click()

          fileInput.addEventListener('change',async(event)=>{
            const selectedFile = event.target.files[0]
            if(selectedFile){
              const fileContent = await readFile(selectedFile)
              // files.value.push({
              //   name:selectedFile.name,
              //   content:fileContent
              // })
              store.commit('files/addFile',{name:selectedFile.name,content:fileContent})
              // selectedIndex.value = files.value.length-1
              // store.commit('files/')
            }
          })
        }

        const exportFile = ()=>{
          const selectedFile = files.value[selectedIndex.value];
            if (selectedFile) {
                // 创建一个Blob对象
                const blob = new Blob([selectedFile.content], { type: 'text/plain' });
                // 创建一个a标签
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = selectedFile.name;
                // 模拟点击a标签进行下载
                a.click();
            }
        }
        const newFile =()=>{

        }
        const deleteFile = ()=>{

        }

        const selectFile = (index)=>{
            // selectedIndex.value = index
            // console.log(selectedIndex.value)
            store.commit('files/selectFile',index)
        }

        const readFile = (file)=>{
          return new Promise((resolve,reject)=>{
            const reader = new FileReader()
            reader.onload = (event)=>{
              resolve(event.target.result)
            }
            reader.onerror = (error)=>{
              reject(error)
            }
            reader.readAsText(file)
          })
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