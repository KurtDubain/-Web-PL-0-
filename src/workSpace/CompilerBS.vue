<!-- 编译器 -->
<template>
  <div class="compiler-styles">
    <h3>编译器</h3>
    <div class="compiler-options">
      <el-form>
        <el-form-item color="#fff" label="编译选项">
          <el-checkbox v-model="options['LexicalAnalysis']" label="词法分析"></el-checkbox>
          <el-checkbox v-model="options['SyntaxAnalysis']" label="语法分析"></el-checkbox>
          <el-checkbox v-model="options['SemanticAnalysis']" label="语义分析"></el-checkbox>
          <el-checkbox v-model="options['IntermediateCodeGeneration']" label="中间代码生成"></el-checkbox>
          <el-checkbox v-model="options['TargetCodeGeneration']" label="目标代码生成"></el-checkbox>
          <el-button class="compile-button" @click="compileIt" type="primary" size="small">编译</el-button>
          <el-button class="compile-button" @click="runIt" type="success" size="small">运行</el-button>
          <el-button class="compile-button" @click="clearIt" type="success" size="small">清空</el-button>
          <el-switch v-model="isWasm" style="
              margin-left: 10px;
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            " width="60" inline-prompt active-text="Wasm" inactive-text="Js" @change="changeIsWasm" /><el-tooltip
            class="box-item" effect="dark" content="控制编译模式和调试模式，wasm效率更高，js功能更丰富" placement="right-start"><el-icon>
              <Warning />
            </el-icon></el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="compiler-output">
      <div>编译结果：</div>
      <pre>{{ compilerOutput.join() }}</pre>
    </div>
  </div>
  <div v-show="showRun">
    <terminalBS :runResult="runRes" />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { compileCode, runCode } from "../api/modules/compiler";
import terminalBS from "@/components/terminalBS.vue";
import formatAST from "@/utils/astGenerator";
import { ElMessage } from "element-plus";
import eventBus from "@/utils/eventBus";
export default {
  name: "CompilerBS",
  components: {
    terminalBS,
  },
  setup() {
    const store = useStore();
    const options = ref({
      LexicalAnalysis: false,
      SyntaxAnalysis: false,
      SemanticAnalysis: false,
      IntermediateCodeGeneration: false,
      TargetCodeGeneration: false,
    });
    const isWasm = computed(() => {
      return store.getters["global/isWasm"];
    });
    const compilerOutput = ref([""]);
    const showRun = computed(() => {
      return store.getters["global/isShowTerminal"];
    });
    let code = computed(() => store.getters["files/selectedFile"]);
    const runRes = ref("");
    const compileIt = async () => {
      try {
        const res = await compileCode({
          code: code.value.content,
          options: options.value,
          language: isWasm.value ? "wasm" : "js",
        });
        // console.log(res.data)
        // 更新编译结果的显示
        compilerOutput.value.push(`编译结果示例：\n...\n`);
        compilerOutput.value.push(
          `${options.value.LexicalAnalysis
            ? `词法分析结果:\n${JSON.stringify(
              res.result.LexicalAnalysis,
              null,
              2
            )}\n`
            : ''
          }`
        );
        // 语法分析要经过特殊处理
        compilerOutput.value.push(
          `${options.value.SyntaxAnalysis
            ? `语法分析结果:\n${formatAST(res.result.SyntaxAnalysis)}\n`
            : ''
          }`
        );
        compilerOutput.value.push(
          `${options.value.SemanticAnalysis
            ? `语义分析结果:\n${typeof res.result.SemanticAnalysis == "string" ? res.result.SemanticAnalysis : JSON.stringify(res.result.SemanticAnalysis)}\n`
            : ''
          }`
        );
        compilerOutput.value.push(
          `${options.value.IntermediateCodeGeneration
            ? `中间代码生成结果:\n${typeof res.result.IntermediateCodeGeneration == 'string' ? res.result.IntermediateCodeGeneration : res.result.IntermediateCodeGeneration.join(
              "\n"
            )}\n`
            : ''
          }`
        );
        compilerOutput.value.push(
          `${options.value.TargetCodeGeneration
            ? `目标代码生成结果:\n${res.result.TargetCodeGeneration}\n`
            : ''
          }`
        );
        compilerOutput.value.push('\n')
      } catch (error) {
        console.error("编译异常", error);
      }
    };
    // 执行
    const runIt = async () => {

      try {
        const res = await runCode({
          code: code.value.content,
          options: {
            LexicalAnalysis: false,
            SyntaxAnalysis: false,
            SemanticAnalysis: false,
            IntermediateCodeGeneration: false,
            TargetCodeGeneration: true,
          },
          language: isWasm.value ? "wasm" : "js",
        });
        if (res.result.compiledResult.TargetCodeGeneration != '') {
          store.commit("global/changeIsShowTerminal");
          runRes.value = res.result
        } else {
          ElMessage({
            message: "编译异常，请详细编译调试之后重试",
            type: "warning",
          });
        }

      } catch (error) {
        console.error("代码执行失败", error);
      }
    };

    const clearIt = () => {
      compilerOutput.value = [""];
    };
    // 切换模式
    const changeIsWasm = () => {
      store.commit("global/changeIsWasm");
    };
    // 利用正则，获取错误信息中的数据
    const extractLineNumber = (errorString) => {
      const lineMatch = errorString.match(/line is (\d+)/);
      if (lineMatch && lineMatch.length > 1) {
        return parseInt(lineMatch[1], 10); // 将提取的字符串转换为整数
      } else {
        // 如果没有找到匹配，返回null
        return null;
      }
    }
    // 深度监听错误信息
    watch(compilerOutput, (newValue) => {
      // 检查最新的编译输出是否包含 SyntaxAnalysis 的结果
      const syntaxAnalysis = newValue.find(part => part.includes('语法分析结果:'));
      if (syntaxAnalysis && typeof syntaxAnalysis === 'string') {
        let newLine = extractLineNumber(syntaxAnalysis)
        console.log(newLine)
        eventBus.emit("changeLine", typeof newLine == 'number' ? newLine : null);
      }
    }, {
      deep: true
    });
    return {
      isWasm,
      options,
      compilerOutput,
      compileIt,
      runIt,
      clearIt,
      showRun,
      runRes,
      changeIsWasm,
    };
  },
};
</script>

<style>
.compiler-styles {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  background-color: #444;
  color: #fff;
  overflow: visible !important;
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
  height: 100%;
}

.compiler-output pre {
  white-space: pre-wrap;
  background-color: #333;
  height: 60%;
  overflow-y: auto;
  border: 2px solid #555;
  padding: 5px;
}

.el-form-item__label {
  color: aliceblue;
}

.checkbox {
  color: rgba(240, 248, 255, 0.695);
}
</style>
