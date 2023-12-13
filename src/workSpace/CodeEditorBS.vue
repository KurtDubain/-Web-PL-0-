<template>
    <div class="code-editor">
      <textarea
        v-model="code"
        @input="handleInput"
        @scroll="handleScroll"
      ></textarea>
    </div>
  </template>
  
  <script>

import {ref} from 'vue'

  export default {
    name:"CodeEditorBS",
    setup(){
      let code = ref(`// 输入你要编辑的代码`)

      const handleInput = ()=>{

      }
      const handleScroll = ()=>{

      }
      return {
        code,
        handleInput,
        handleScroll
      }
    },
  
  };
  </script>
  
  <style scoped>
  .code-editor {
    width: 100%;
    height: 100%;
    padding-right: 15px;
    overflow: auto;
  }
  
  .code-editor textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    padding: 10px;
    font-family: "Courier New", monospace;
    font-size: 1rem;
    color: #fff;
    background-color: #1e1e1e;
    outline: none;
  }
  
  /* 行号显示 */
  .code-editor textarea::before {
    content: counter(line-numbering);
    counter-increment: line-numbering;
    display: inline-block;
    padding: 0 10px;
    text-align: right;
    user-select: none;
    opacity: 0.5;
    margin-right: 10px;
  }
  
  /* 滚动条样式 */
  .code-editor textarea::-webkit-scrollbar {
    width: 10px;
  }
  
  .code-editor textarea::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 5px;
  }
  
  .code-editor textarea::-webkit-scrollbar-track {
    background-color: #333;
  }
  </style>
  