<template>
    <div class="compiler-styles">
      <h3>编译器样式</h3>
      <div class="compiler-options">
        <label>编译选项：</label>
        <select>
          <option value="option1">选项1</option>
          <option value="option2">选项2</option>
          <option value="option3">选项3</option>
        </select>
      </div>
      <button class="compile-button">编译</button>
      <div class="compiler-output">
        <h4>编译结果：</h4>
        <pre>
          <!-- 这里显示编译结果 -->
        </pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .compiler-styles {
    padding: 15px;
    background-color: #444;
    color: #fff;
    /* width: 100%; */
    height: 50%;
  }
  
  .compiler-options {
    margin-bottom: 10px;

  }
  
  .compiler-options label {
    margin-right: 5px;
  }
  
  .compile-button {
    background-color: #28a745;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .compiler-output {
    margin-top: 10px;
    
  }
  
  .compiler-output pre {
    white-space: pre-wrap;
    background-color: #333;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #555;
    
  }
  </style>
  