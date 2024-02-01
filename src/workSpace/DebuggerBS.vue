<template>
  <div class="debugger-styles">
    <h3>调试器样式</h3>
    <div class="debugger-options">
      <el-checkbox v-model="debugOption1">选项1</el-checkbox>
      <el-checkbox v-model="debugOption2">选项2</el-checkbox>
      <el-button class="debug-button" @click="startDebug" type="primary">开始调试</el-button>
      <!-- 其他调试选项... -->
    </div>
    
    <div class="debugger-output">
      <h4>调试结果：</h4>
      <pre>
        <!-- 这里显示调试结果 -->
      </pre>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name:'DebuggerBS',
    
  };
  </script>
  
  <style scoped>
  .debugger-styles {
    padding: 15px;
    background-color: #333;
    color: #fff;
    /* width: 100%; */
    height: 50%;
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
    margin-top: 10px;
    /* width: 100%; */
  }
  
  .debugger-output pre {
    white-space: pre-wrap;
    background-color: #222;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #444;
  }
  </style>
  