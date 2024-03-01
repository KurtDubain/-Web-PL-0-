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
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "terminalBS",
  props: {
    runResult: {
      type: String,
    },
  },
  setup(props) {
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
    const compileAndRunWAT = async () => {
      if (!props.runResult) {
        return;
      }
      try {
        const wasmModule = await WebAssembly.compile(
          new TextEncoder().encode(props.runResult)
        );
        const instance = await WebAssembly.instantiate(wasmModule, {
          js: {
            log: (arg) => {
              terminalOutput.value += `输出了：${arg}\n`;
            },
            read: () => {
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
    watch(() => props.runResult, compileAndRunWAT, { immediate: true });
    return {
      width,
      height,
      x,
      y,
      startDrag,
      startResize,
      handleIsShowTerminal,
      terminalOutput,
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
  background: #ddd;
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
