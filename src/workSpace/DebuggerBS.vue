<template>
  <div class="debugger-styles">
    <h3>调试器</h3>
    <div class="debugger-options">
      <el-form :inline="true">
        <el-form-item color="#fff" label="目前所在行">
          <div class="input">
            <el-input v-model.number="currentLine" size="small" disabled />
          </div>
          <el-button class="debug-button" @click="startInit" type="primary" size="small">初始化</el-button>
          <el-button class="debug-button" @click="startByType('nextLine')" type="primary"
            size="small">执行到下一行</el-button>
          <el-button class="debug-button" @click="startByType('nextBreak')" type="primary"
            size="small">执行到下一个断点</el-button>
          <el-button class="debug-button" @click="clearIt" type="primary" size="small">清空</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="debugger-output">
      <div>调试结果：</div>
      <div class="pre">
        <el-table height="100%" :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="变量名" />
          <el-table-column prop="value" label="变量值" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="scope" label="作用域" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import eventBus from '@/utils/eventBus';
import { init, stepInto } from "../api/modules/debugger";
export default {
  name: "DebuggerBS",
  setup() {
    const store = useStore();
    const code = computed(() => store.getters["files/selectedFile"]);
    const debugRowIds = computed(() => store.getters['debug/rowIds'])//断点行号
    let currentLine = ref(0);
    const tableData = ref([]);
    const checkCode = () => {
      let result;
      if (code.value) {
        console.log(debugRowIds.value);
        result = true;
      } else {
        result = false;
        window.alert('没有可执行文件')
      }
      return result;
    };
    const startInit = async () => {
      if (!checkCode()) return
      let data = {
        code: code.value,
      };
      let res = await init(data);
      if (res.success) {
        tableData.value = res.result;
      }
    };
    const startByType = type => {
      if (!checkCode()) return
      let line;
      if (type == 'nextLine') {
        let totalLine = code.value.content.split('\n').length;
        line = currentLine.value + 1;
        if (line > totalLine) {
          window.alert('没有下一行了')
          currentLine.value = 0;
          return
        }
      }
      if (type == 'nextBreak') {
        line = debugRowIds.value.map(item => {
          if (item > currentLine.value) {
            return item
          }
        }).filter(item => item)[0]
        if (!line) {
          window.alert('没有下一个断点')
          currentLine.value = 0;
          return //没有下一个断点        
        }
      }
      stepIntoTheNext(line);
      currentLine.value = line;
    }
    const stepIntoTheNext = async (line) => {
      console.log(line);
      let data = {
        code: code.value,
        line
      };
      let res = await stepInto(data);
      if (res.success) {
        tableData.value = res.result;
      }
    };
    const clearIt = () => {
      tableData.value = [""];
      currentLine.value = 0;
    };
    eventBus.on('changeFile', () => {
      currentLine.value = 0;
      tableData.value = [];
    })
    return {
      currentLine,
      tableData,
      startInit,
      startByType,
      clearIt
    };
  },
};
</script>

<style scoped>
.debugger-styles {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  background-color: #444;
  color: #fff;
  overflow: visible !important;
  height: 100%;
}

.debugger-options {
  margin-bottom: 10px;
}

.debugger-options label {
  margin-right: 10px;
}

.debug-button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.debugger-output {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.debugger-output .pre {
  white-space: pre-wrap;
  background-color: #333;
  height: 60%;
  overflow-y: auto;
  border: 1px solid #555;
}

.input {
  margin-right: 10px;
  width: 50px;
}
</style>
