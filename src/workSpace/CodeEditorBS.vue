<template>
    <div class="code-editor">
      <codemirror
        v-model="editorCode"
        @input="handleInput"
        @scroll="handleScroll"
        :options="editorOptions"
      ></codemirror>
    </div>
  </template>
  
  <script>

import {ref, computed, watch} from 'vue'
import { useStore } from 'vuex'
import eventBus from '@/utils/eventBus';
import VueCodemirror from 'vue-codemirror'
// import { EditorState } from '@codemirror/state';
import {setupPL0Language} from "@/utils/Pascal"
// import { basicSetup } from '@codemirror/basic-setup';
// import { EditorView } from '@codemirror/view';
// import {setupPascalLanguage} from "codemirror"
  export default {
    name:"CodeEditorBS",
    components:{
      codemirror:VueCodemirror.Codemirror
    },
    setup(){
      const store = useStore()
      const pascalLanguage = setupPL0Language();
      let editorCode = ref('')
      
      let code = computed(()=>store.getters['files/selectedFile'])

      // editorCode.value = code.value

      eventBus.on('changeFile',()=>{
        editorCode.value = code.value.content
      })

      const handleInput = ()=>{
        const selectedFile = store.getters['files/selectedFile']
        if(selectedFile&&editorCode.value !== selectedFile.content){
          store.commit('files/updateFileContent',{
            index:store.state.files.selectedFileIndex,
            content:editorCode.value
          })
        }
      }
      const handleScroll = ()=>{

      }
      // const editorOptions = {
      //   state: EditorState.create({
      //     doc: editorCode.value,
      //     extensions: [
      //       // basicSetup,
      //       pascalLanguage.language,
      //     ],
      //   }),
      // };
      const editorOptions = {
      mode: {
        name: 'pl0', // 设置语言模式为 'pl0'
        ...pascalLanguage.language,
      },
      theme: 'base16-light',
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
    };



      watch(code, (newValue) => {
        editorCode.value = newValue.content;
      });

      return {
        editorCode,
        handleInput,
        handleScroll,
        editorOptions
      }
    },
  
  };
  </script>
  
  <style>
  .code-editor {
    width: 100%;
    height: 100%;
    padding-right: 15px;
    overflow: auto;
    display:flex;
    flex-direction: column;
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

  .keyword{
    color:aqua;
    font-weight: bold;
  }

  .code-editor{
    transition: none;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .codemirror{
    /* height: 100%; */
    flex: 1;
  }
  .CodeMirror::-webkit-scrollbar {
    width: 10px;
  }

  .CodeMirror::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 5px;
  }

  .CodeMirror::-webkit-scrollbar-track {
    background-color: #333;
  }
  .cm-s-barf .cm-keyword {
    color: rgb(202, 132, 41);
    font-weight: bold;
  }
  .ͼ2 .cm-activeLineGutter{
    background-color: #878787;
  }
  .ͼ2 .cm-gutters{
    background-color: #bbbbbb;
  }
  .ͼ1 .cm-scroller{
    height: 95vh;
  }
  /* Pascal 关键字样式 */
.CodeMirror .cm-s-barf .cm-keyword {
  color: #569cd6; /* Pascal 关键字颜色 */
  font-weight: bold;
}

/* Pascal 注释样式 */
.cm-s-barf .cm-comment {
  color: #6a9955; /* 注释颜色 */
}

/* Pascal 字符串样式 */
.cm-s-barf .cm-string {
  color: #d69d85; /* 字符串颜色 */
}

/* Pascal 数字样式 */
.cm-s-barf .cm-number {
  color: #b5cea8; /* 数字颜色 */
}

/* 激活行样式 */
.cm-s-barf .CodeMirror-activeline-background {
  background: #333;
}
  </style>
  