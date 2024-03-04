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
      <!-- 可以放置一些控制按钮 -->
      <div>Terminal</div>
      <div class="btn close" @click="handleIsShowTerminal">×</div>
    </div>
    <div class="terminal-body">
      <!-- 终端内容 -->
      {{ terminalOutput }}
      <input
        v-model="userInput"
        @keyup.enter="onEnter"
        placeholder="请输入你要输入的内容"
      />
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
      type: String,
    },
  },
  setup(props) {
    console.log(props.runResult);
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
    const terminalOutput = ref("");
    const userInput = ref("");
    const waitingForInput = ref(false); // 用于标记是否正在等待用户输入
    // const inputPromise = ref(null); // 用于暂存等待输入的Promise
    const inputResolve = ref(null);
    const onEnter = () => {
      if (waitingForInput.value && inputResolve.value) {
        inputResolve.value(userInput.value); // 解决Promise，传递用户输入
        userInput.value = ""; // 清空输入框
        waitingForInput.value = false; // 标记不再等待输入
      }
    };
    const compileAndRunWAT = async () => {
      if (!props.runResult) {
        return;
      }
      try {
        const wasmBytes = Object.values(props.runResult).map((val) => val);
        // 创建Uint8Array
        const wasmArray = new Uint8Array(wasmBytes);
        const wasmModule = await WebAssembly.compile(wasmArray);
        const instance = await WebAssembly.instantiate(wasmModule, {
          js: {
            log: (arg) => {
              console.log(arg);
              terminalOutput.value += `输出了：${arg}\n`;
            },
            read: () => {
              // waitingForInput.value = true; // 标记开始等待输入
              // // 创建一个新的Promise，并保存resolve函数
              // inputPromise.value = new Promise((resolve) => {
              //   inputResolve.value = resolve;
              // });
              // // 返回Promise，这样就可以在Promise解决后继续执行WebAssembly代码
              // return inputPromise.value.then((input) => {
              //   console.log(input);
              //   // 将字符串转换为数字返回给WebAssembly，这里根据实际需要进行调整
              //   return 100;
              // });
              return 6;
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
    watchEffect(() => {
      compileAndRunWAT();
    });
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
}

.terminal-header div {
  padding: 5px 10px;
}

.btn {
  cursor: pointer;
  text-align: center;
}

.terminal-body {
  flex-grow: 1;
  background: #222222;
}

.resize-handle {
  width: 20px;
  height: 20px;
  background: red;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}
</style>
