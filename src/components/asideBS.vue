<!-- 侧边工具组件 -->
<template>
  <div class="sidebar">
    <div class="toolbar">
      <div @click="importFile" class="toolbar-item">
        <el-icon :size="30" :color="'#b3b3b3'">
          <Folder />
        </el-icon>
        导入
      </div>
      <div @click="exportFile" class="toolbar-item">
        <el-icon :size="30" :color="'#b3b3b3'">
          <DocumentChecked />
        </el-icon>
        导出
      </div>
      <div @click="newFile" class="toolbar-item">
        <el-icon :size="30" :color="'#b3b3b3'">
          <DocumentAdd />
        </el-icon>
        新建
      </div>
      <div @click="deleteFile" class="toolbar-item">
        <el-icon :size="30" :color="'#b3b3b3'">
          <DocumentDelete />
        </el-icon>
        删除
      </div>
    </div>

    <el-divider />

    <div class="file-list">
      <div v-for="(file, index) in files" :key="index" @click="selectFile(index)" class="list-item"
        :class="{ 'selected': selectedIndex === index }">
        <!-- <img src='file-icon.png' alt="file Icon" class="file-icon" /> -->
        <el-icon :size="30">
          <Document />
        </el-icon>
        <span>{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import eventBus from '@/utils/eventBus.js'

export default {
  name: "asideBS",
  setup() {
    const store = useStore()
    let files = computed(() => store.getters['files/allFiles'])
    let selectedIndex = computed(() => store.getters['files/getIndex'])


    const importFile = async () => {
      const fileInput = document.createElement('input')
      fileInput.type = 'file'
      // fileInput.accept = ''
      fileInput.click()

      fileInput.addEventListener('change', async (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
          const fileContent = await readFile(selectedFile)
          console.log(selectedFile);
          console.log(files);
          let fileSplits = selectedFile.name.split('.')
          let fSLength = fileSplits.length
          if (fileSplits[fSLength - 1] !== 'pl0') {
            window.alert('文件格式不正确，请导入pl0文件')
            return;
          }
          let index = files.value.findIndex(file => file.name === selectedFile.name)
          if (index !== -1 && files.value[index].content !== fileContent) {
            const confirmCover = window.confirm(`文件${selectedFile.name}已存在，是否覆盖？`)
            if (confirmCover) {
              store.commit('files/updateFileContent', { index, content: fileContent })
            }
          } else if (index !== -1 && files.value[index].content == fileContent) {
            window.alert('文件已存在，且内容一致，无需导入')
            return;
          } else {
            store.commit('files/addFile', { name: selectedFile.name, content: fileContent })
          }
          eventBus.emit('changeFile')
        }
      })
      setTimeout(() => {
        fileInput.remove()
      }, 10000);

    }

    const exportFile = () => {
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
    const newFile = () => {
      let newName = 'newFile.pl0'
      let count = 1
      while (files.value.some(file => file.name === newName)) {
        newName = `newFile(${count}).pl0`
        count++
      }
      store.commit('files/addFile', { name: newName, content: '// 请输入代码' })
      eventBus.emit('changeFile')
    }
    const deleteFile = () => {
      const selectedFile = files.value[selectedIndex.value]
      if (selectedFile) {
        const confirmDelete = window.confirm(`确定要删除文件${selectedFile.name}吗`)
        if (confirmDelete) {
          store.commit('files/deleteFile', selectedIndex.value)
          store.commit('files/selectFile', files.value.length - 1)
          eventBus.emit('changeFile')
        }
      }
    }

    const selectFile = (index) => {
      // selectedIndex.value = index
      // console.log(selectedIndex.value)
      store.commit('files/selectFile', index)
      eventBus.emit('changeFile')
    }

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.onerror = (error) => {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #23272c;
  color: #b3b3b3;
  /* 文本颜色 */
  border-radius: 10px;
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.toolbar-item:hover {
  color: #ffffff;
  /* 悬停时文本颜色 */
  transition: 0.5s;
}

.file-list {
  overflow-y: auto;
}

.list-item {
  cursor: pointer;
}

.list-item span {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  border-radius: 10px;
}

.unsaved {
  color: rgba(231, 251, 52, 0.843);
}

.el-divider--horizontal {
  border-top: 1px rgba(122, 122, 122, 0.687) solid
}

.el-icon:hover {
  color: #ffffff;
  /* transition: 0.5s; */
}

.el-icon {
  transition: 0s;
}
</style>