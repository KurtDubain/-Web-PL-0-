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


  export default {
    name:"CodeEditorBS",
    components:{
      codemirror:VueCodemirror.Codemirror
    },
    setup(){
      const store = useStore()
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

      watch(code, (newValue) => {
        editorCode.value = newValue.content;
      });
      const customPascalMode = {
        token: /\b(?:PROGRAM|BEGIN|END|IF|THEN|ELSE|WHILE|DO)\b/,
        cmOptions: {
          indentUnit: 2,
        },
      };

      const editorOptions = {
        mode:'text/x-pascal',
        theme:'barf',
        lineNumbers:true,
        styleActiveLine: true,
        matchBrackets: true,
      }

      Object.assign(editorOptions, customPascalMode.cmOptions);

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
  </style>
  