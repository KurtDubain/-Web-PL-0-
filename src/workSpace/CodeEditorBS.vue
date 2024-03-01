<template>
  <div class="code-editor">
    <div id="code-textarea" ref="editorCode" @input="handleInput"></div>
  </div>
</template>
  
<script>

import { ref, computed, onMounted, nextTick, toRaw } from 'vue'
import { useStore } from 'vuex'
import eventBus from '@/utils/eventBus';
import * as monaco from 'monaco-editor'
import { pascalLanguageConfig, pascalCompletionProvider } from '@/utils/Pascal'
export default {
  name: "CodeEditorBS",
  setup() {
    // 初始化Vuex
    const store = useStore()
    // PL0语言配置
    // Codemirror配置
    // 初始化所选中的文件的内容
    let code = computed(() => store.getters['files/selectedFile'])
    let editorCode = ref(null)//编辑器容器
    let editorCodeContent = ref(null)//编辑器实例

    const initEditor = async () => {
      await nextTick(); // Wait for the next DOM update

      editorCodeContent.value = monaco.editor.create(editorCode.value, {
        value: code.value ? code.value.content : '请先新建文件~',
        language: 'pascal',
        theme: 'vs-dark',
        readOnly: true,
      });
      monaco.languages.register({ id: 'pascal' })
      monaco.languages.setMonarchTokensProvider('pascal', pascalLanguageConfig)
      monaco.languages.registerCompletionItemProvider('pascal', pascalCompletionProvider)
      //编辑代码的时候，同步修改所选中文件的内容
      editorCodeContent.value.onDidChangeModelContent(() => {
        if (!code.value) return
        code.value.content = toRaw(editorCodeContent.value).getValue()
      })

    }

    onMounted(async () => {
      await nextTick()
      await initEditor()
    })


    // editorCode.value = code.value
    // 当切换文件的时候，更新code内容
    eventBus.on('changeFile', () => {
      // editorCode.value = code.value.content
      editorCodeContent.value.updateOptions({
        readOnly: false
      });
      if (code.value) {
        toRaw(editorCodeContent.value).setValue(code.value.content);
      } else {
        toRaw(editorCodeContent.value).setValue('请先新建文件~');
        editorCodeContent.value.updateOptions({
          readOnly: true
        });
      }
    })

    return {
      // handleInput,
      editorCode,
      // handleScroll,      
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

.codemirror {
  /* height: 100%; */
  flex: 1;
}

#code-textarea {
  height: 100%;
  width: 100%;
}

.code-editor .monaco-editor {
  height: 100% !important;
  width: 100% !important;
}
</style>
  