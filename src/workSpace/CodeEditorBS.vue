<template>
    <div class="code-editor">
      <div id="code-textarea" ref="editorCode" @input="handleInput" style="height:300px"></div>
    </div>
  </template>
  
  <script>

import {ref, computed, watch, onMounted,nextTick} from 'vue'
import { useStore } from 'vuex'
import eventBus from '@/utils/eventBus';
import * as monaco from 'monaco-editor'
  export default {
    name:"CodeEditorBS",
    setup(){
      // 初始化Vuex
      const store = useStore()
      // PL0语言配置
      // Codemirror配置
      // 初始化所选中的文件的内容
      let code = computed(()=>store.getters['files/selectedFile'])
      let editorCode = ref(null)
      
      const initEditor = async()=>{
        await nextTick(); // Wait for the next DOM update
        editorCode.value = monaco.editor.create(editorCode.value, {
          value: code.value,
          language: 'pascal',
          theme: 'vs-dark'
        });
        // editorCode.value.onDidChangeModelContent(() => {
        //   code.value = editorCode.value.getValue();
        // });
      }
      onMounted(()=>{
        initEditor()
      })


      // editorCode.value = code.value
      // 当切换文件的时候，更新code内容
      eventBus.on('changeFile',()=>{
        editorCode.value = code.value.content
      })
      // 当输入操作的时候，同步更新当前选中文件的code
      const handleInput = ()=>{
        const selectedFile = store.getters['files/selectedFile']
        if(selectedFile&&editorCode.value !== selectedFile.content){
          store.commit('files/updateFileContent',{
            index:store.state.files.selectedFileIndex,
            content:editorCode.value
          })
        }
        console.log(111)
      }
      const handleScroll = ()=>{

      }

      // 当文本中的代码更新的时候，同步更新对应文件内容中的代码
      watch(code, (newValue) => {
        editorCode.value = newValue.content;
      });

      return {
        handleInput,
        editorCode,
        handleScroll,      
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
  }
  
  .code-editor{
    transition: none;
    width: 20rem;
    height: 20rem;
    overflow: auto;
    z-index: 999;
  }
  .codemirror{
    /* height: 100%; */
    flex: 1;
  }

  </style>
  