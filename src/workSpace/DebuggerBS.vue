<template>
    <div class="debugger-styles">
      <h3>调试器样式</h3>
      <div class="debugger-options">
        <label>调试选项：</label>
        <input type="checkbox" id="debugOption1" />
        <label for="debugOption1">选项1</label>
        <input type="checkbox" id="debugOption2" />
        <label for="debugOption2">选项2</label>
        <!-- 其他调试选项... -->
      </div>
      <button class="debug-button">开始调试</button>
      <div class="debugger-output">
        <h4>调试结果：</h4>
        <pre>
          <!-- 这里显示调试结果 -->
        </pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .debugger-styles {
    padding: 15px;
    background-color: #333;
    color: #fff;
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
  }
  
  .debugger-output pre {
    white-space: pre-wrap;
    background-color: #222;
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #444;
  }
  </style>
  