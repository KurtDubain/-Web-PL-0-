<template>
  <div class="debugger-styles">
    <h3>调试器样式</h3>
    <div class="debugger-options">
      <el-form>
        <el-form-item color="#fff" label="调试选项">
          <el-checkbox v-model="debugOption1">选项1</el-checkbox>
          <el-checkbox v-model="debugOption2">选项2</el-checkbox>
          <el-button class="debug-button" @click="startDebug" type="primary" size="small">开始调试</el-button>
          <!-- 其他调试选项... -->
        </el-form-item>
      </el-form>
    </div>

    <div class="debugger-output">
      <div>调试结果：</div>
      <pre>
        {{ debuggerOutput.join() }}
        <!-- 这里显示调试结果 -->
      </pre>
    </div>
  </div>
</template>
  
<script>
import { ref } from "vue";
export default {
  name: 'DebuggerBS',
  setup() {
    const debuggerOutput = ref(['']);

    return {
      debuggerOutput
    }
  }
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

.debugger-output pre {
  white-space: pre-wrap;
  background-color: #333;
  height: 60%;
  overflow-y: auto;
  border: 1px solid #555;
}
</style>
  