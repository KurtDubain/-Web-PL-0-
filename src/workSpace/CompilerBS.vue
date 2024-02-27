<template>
  <div class="compiler-styles">
    <h3>编译器样式</h3>
    <div class="compiler-options">
      <el-form>
        <el-form-item color="#fff" label="编译选项">
          <el-checkbox v-model="options['LexicalAnalysis']" label="词法分析"></el-checkbox>
          <el-checkbox v-model="options['SyntaxAnalysis']" label="语法分析"></el-checkbox>
          <el-checkbox v-model="options['SemanticAnalysis']" label="语义分析"></el-checkbox>
          <el-checkbox v-model="options['IntermediateCodeGeneration']" label="中间代码生成"></el-checkbox>
          <el-checkbox v-model="options['TargetCodeGeneration']" label="目标代码生成"></el-checkbox>
          <el-button class="compile-button" @click="compileIt" type="primary" size="small">编译</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="compiler-output">
      <div>编译结果：</div>
      <pre>{{ compilerOutput.join() }}</pre>
    </div>
  </div>
</template>
  
<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { compileCode } from '../api/modules/compiler'
export default {
  name: 'CompilerBS',
  setup() {
    const store = useStore()
    const options = ref({
      'LexicalAnalysis': false,
      'SyntaxAnalysis': false,
      'SemanticAnalysis': false,
      'IntermediateCodeGeneration': false,
      'TargetCodeGeneration': false
    });
    // const code = ref('')
    const compilerOutput = ref(['']);

    const compileIt = async () => {
      let code = computed(() => store.getters['files/selectedFile'])
      try {
        const res = await compileCode({ code: code.value.content, options: options.value })
        // console.log(res.data)
        // 更新编译结果的显示
        compilerOutput.value.push(`编译结果示例：\n...\n`);
        compilerOutput.value.push(`${options.value.LexicalAnalysis ? `词法分析结果:\n${JSON.stringify(res.result.LexicalAnalysis)}` : '\n'}`)
        compilerOutput.value.push(`${options.value.SyntaxAnalysis ? `语法分析结果:\n${JSON.stringify(res.result.SyntaxAnalysis)}` : '\n'}`)
        compilerOutput.value.push(`${options.value.SemanticAnalysis ? `语义分析结果:\n${JSON.stringify(res.result.SemanticAnalysis)}` : '\n'}`)
        compilerOutput.value.push(`${options.value.IntermediateCodeGeneration ? `中间代码生成结果:\n${JSON.stringify(res.result.IntermediateCodeGeneration)}` : '\n'}`)
        compilerOutput.value.push(`${options.value.TargetCodeGeneration ? `目标代码生成结果:\n${JSON.stringify(res.result.TargetCodeGeneration)}` : '\n'}`)
      } catch (error) {
        console.error('编译异常', error)
      }
    };

    return {
      options,
      compilerOutput,
      compileIt,
    };
  },
};
</script>
  
<style>
.compiler-styles {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #444;
  color: #fff;
  /* width: 100%; */
  height: 100%;
}

.compiler-options {
  margin-bottom: 10px;
  color: #fff;
}

.compiler-options label {
  margin-right: 5px;
}

.compile-button {
  background-color: #0095f9;
  color: rgb(255, 255, 255);
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.compiler-output {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.compiler-output pre {
  flex: 1;
  white-space: pre-wrap;
  background-color: #333;
  /* padding: 10px; */
  height: 200px;
  overflow-y: auto;
  border: 1px solid #555;

}

.el-form-item__label {
  color: aliceblue;
}

.checkbox {
  color: rgba(240, 248, 255, 0.695);
}
</style>
  