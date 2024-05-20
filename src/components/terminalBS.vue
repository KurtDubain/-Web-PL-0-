<!-- 终端组件 -->
<template>
  <div
    class="terminal-window"
    :style="{
      width: width + 'px',
      height: height + 'px',
      transform: `translate(${x}px, ${y}px)`,
    }"
    @mousedown="onMouseDown"
  >
    <div class="terminal-header" @mousedown="startDrag">
      <div class="title">终端</div>
      <div class="btn clear" @click="clearTerminal">清空历史</div>
      <div class="btn close" @click="handleIsShowTerminal">×</div>
    </div>
    <div class="terminal-body">
      <!-- 终端内容 -->
      <div v-for="(line, index) in terminalOutput" :key="index">
        {{ line }}
      </div>
      <!-- {{ terminalOutput }} -->
      <div v-show="waitingForInput">
        请输入一个值:<input
          v-model="userInput"
          @keyup.enter="onEnter"
          placeholder="请输入你要输入的内容"
        />（必须是数字）
      </div>
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "terminalBS",
  props: {
    runResult: {
      type: Object,
    },
  },
  setup(props) {
    // console.log(props.runResult);
    // 拖拽和缩放功能
    const width = ref(600);
    const height = ref(400);
    const x = ref(0);
    const y = ref(0);
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const startDrag = (event) => {
      event.preventDefault();
      startX = event.clientX - x.value;
      startY = event.clientY - y.value;
      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    };

    const doDrag = (event) => {
      x.value = event.clientX - startX;
      y.value = event.clientY - startY;
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    const startResize = (event) => {
      event.preventDefault();
      startWidth = width.value;
      startHeight = height.value;
      startX = event.clientX;
      startY = event.clientY;
      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    };

    const doResize = (event) => {
      width.value = startWidth + event.clientX - startX;
      height.value = startHeight + event.clientY - startY;
    };

    const stopResize = () => {
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };
    //
    const store = useStore();
    const handleIsShowTerminal = () => {
      store.commit("global/changeIsShowTerminal");
    };
    // 终端输出控制
    const terminalOutput = ref([]); //输出内容
    const userInput = ref(""); //输入内容
    const waitingForInput = ref(false); // 用于标记是否正在等待用户输入
    let resolveInput; //resolve暂存
    // 回车触发事件
    const onEnter = () => {
      if (waitingForInput.value && resolveInput) {
        resolveInput(Number(userInput.value));
        userInput.value = "";
        waitingForInput.value = false;
      }
    };
    // 读取操作
    const read = () => {
      waitingForInput.value = true;
      return new Promise((resolve) => {
        resolveInput = resolve;
      });
    };
    const write = (output) => {
      terminalOutput.value.push(`输出了：${output}`);
    };
    // JS模式
    const executeJS = async () => {
      if (!props.runResult) {
        return;
      }
      try {
        // 定义自定义函数并执行JS代码
        const func = new Function(
          "read",
          "write",
          `return (async()=>{${props.runResult.compiledResult.TargetCodeGeneration}})()`
        );
        await func(read, write);
      } catch (error) {
        console.error("执行输出异常", error);
        terminalOutput.value.push(`Error: ${error.message}`);
      }
    };
    // wasm模式
    const compileAndRunWAT = async () => {
      if (!props.runResult.runResult) {
        return;
      }
      try {
        const wasmBytes = Object.values(props.runResult.runResult).map(
          (val) => val
        );
        // 创建Uint8Array
        const wasmArray = new Uint8Array(wasmBytes);
        const wasmModule = await WebAssembly.compile(wasmArray);
        const instance = await WebAssembly.instantiate(wasmModule, {
          js: {
            log: (arg) => {
              terminalOutput.value.push(`输出了：${arg}`);
            },
            read: () => {
              terminalOutput.value.push(`wasm模式下，read自动赋值为2`);
              return 2;
            },
          },
        });
        if (instance.exports.main) {
          instance.exports.main();
        }
      } catch (error) {
        console.error("执行输出异常", error);
      }
    };
    // 监听控制模式
    watchEffect(() => {
      if (props.runResult.language == "js") {
        executeJS();
      } else if (props.runResult.language == "wasm") {
        compileAndRunWAT();
      }
    });
    // watch(
    //   () => props.runResult.language,
    //   (newValue, oldValue) => {
    //     if (newValue === "js") {
    //       executeJS();
    //     } else if (newValue === "wasm") {
    //       compileAndRunWAT();
    //     }
    //   }
    // );
    const clearTerminal = () => {
      terminalOutput.value = [];
    };
    return {
      width,
      height,
      x,
      y,
      startDrag,
      startResize,
      handleIsShowTerminal,
      terminalOutput,
      onEnter,
      waitingForInput,
      userInput,
      clearTerminal,
    };
  },
};
</script>

<style scoped>
.terminal-window {
  position: absolute;
  top: 20vh;
  left: 34vw;
  border: 1px solid #ccc;
  user-select: none;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f9f9f9;
  /* 更改背景颜色 */
  border-radius: 8px;
}

.terminal-header {
  background: #bbb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  color: black;
  font-weight: bold;
  border-bottom: 1px solid #333;
  border-top-left-radius: 8px;
  /* 标题栏左上角圆角 */
  border-top-right-radius: 8px;
  /* 标题栏右上角圆角 */
  /* padding: 8px; */
  /* 调整内边距 */
}

.terminal-header div {
  padding: 5px 10px;
}

.title {
  font-size: 18px;
}

.btn {
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  text-align: center;
}

.terminal-body {
  flex-grow: 1;
  background: #222222;
}

.resize-handle {
  width: 20px;
  height: 20px;
  background: rgb(65, 148, 134);
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}

.clear {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #727272;
  /* 清除按钮的红色背景 */
  border: none;
  color: white;
  margin-right: 5px;
  /* 添加一些间距以分隔按钮 */
}

.clear:hover {
  background-color: #3f3f3f;
  /* 鼠标悬停时的深红色背景 */
}
</style>
