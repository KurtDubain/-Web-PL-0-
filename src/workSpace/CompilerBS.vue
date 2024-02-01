<template>
  <div class="compiler-styles">
    <h3>编译器样式</h3>
    <div class="compiler-options">
      <el-form>
        <el-form-item label="编译选项">
          <el-select v-model="selectedOption" placeholder="请选择">
            <el-option label="选项1" value="option1"></el-option>
            <el-option label="选项2" value="option2"></el-option>
            <el-option label="选项3" value="option3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button class="compile-button" @click="compileCode" type="primary">编译</el-button>
    <div class="compiler-output">
      <h4>编译结果：</h4>
      <pre>{{ compilerOutput }}</pre>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'CompilerBS',
  setup() {
    const selectedOption = ref('option1');
    const compilerOutput = ref('');

    const compileCode = async () => {
      // 获取选中的编译选项
      console.log('Selected Option:', selectedOption.value);

      // 执行编译逻辑，可以调用编译器相关方法，或者将代码发送到后端进行编译
      // 模拟异步编译
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新编译结果的显示
      compilerOutput.value = '编译结果示例：\n...';
    };

    return {
      selectedOption,
      compilerOutput,
      compileCode,
    };
  },
};
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
    /* padding: 10px; */
    height: 200px;
    overflow-y: auto;
    border: 1px solid #555;
    
  }
  </style>
  