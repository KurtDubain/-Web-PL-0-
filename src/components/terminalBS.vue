<template>
    <div
      class="terminal-window"
      :style="{ width: width + 'px', height: height + 'px', transform: `translate(${x}px, ${y}px)` }"
      @mousedown="onMouseDown"
    >
      <div class="terminal-header" @mousedown="startDrag">
        <!-- 可以放置一些控制按钮 -->
        Terminal
      </div>
      <div class="terminal-body">
        <!-- 终端内容 -->
      </div>
      <div class="resize-handle" @mousedown="startResize"></div>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';

export default {
  name: 'terminalBS',
  setup() {
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
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    const doDrag = (event) => {
      x.value = event.clientX - startX;
      y.value = event.clientY - startY;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    const startResize = (event) => {
      event.preventDefault();
      startWidth = width.value;
      startHeight = height.value;
      startX = event.clientX;
      startY = event.clientY;
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    };

    const doResize = (event) => {
      width.value = startWidth + event.clientX - startX;
      height.value = startHeight + event.clientY - startY;
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    return {
      width,
      height,
      x,
      y,
      startDrag,
      startResize
    };
  }
}
</script>

  
  <style scoped>
  .terminal-window {
    position: absolute;
    border: 1px solid #ccc;
    user-select: none;
    display: flex;
    flex-direction: column;
  }
  
  .terminal-header {
    background: #eee;
    padding: 5px;
    cursor: move;
  }
  
  .terminal-body {
    flex-grow: 1;
    background: #fff;
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
  