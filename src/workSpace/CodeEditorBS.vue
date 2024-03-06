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
    let editorCodeContent = null//编辑器实例
    let debugRowIds = computed(() => store.getters['debug/rowIds'])//断点行号
    const decorationIds = [];
    const initEditor = async () => {
      await nextTick(); // Wait for the next DOM update
      editorCodeContent = monaco.editor.create(editorCode.value, {
        value: code.value ? code.value.content : '请先新建文件~',
        language: 'pascal',
        theme: 'vs-dark',
        readOnly: true,
        glyphMargin: true,
      });
      monaco.languages.register({ id: 'pascal' })
      monaco.languages.setMonarchTokensProvider('pascal', pascalLanguageConfig)
      monaco.languages.registerCompletionItemProvider('pascal', pascalCompletionProvider)
      //编辑代码的时候，同步修改所选中文件的内容
      editorCodeContent.onDidChangeModelContent(() => {
        if (!code.value) return
        code.value.content = toRaw(editorCodeContent).getValue()
      })
      editorCodeContent.onMouseDown(e => {
        console.log(e);
        if (!code.value) return
        if (![2, 3, 4].includes(e.target.type)) return
        const position = e.target.position;
        const lineDecoration = editorCodeContent.getModel().getLineDecorations(position.lineNumber);
        let flagId = "";
        lineDecoration.forEach((decoration) => {
          if (decoration.options.marginClassName === "myGlyphMarginClass") {
            decorationIds.push(decoration.id);
            flagId = decoration.id;
          }
        });
        if (decorationIds.length === 0) {
          //新增样式
          const range = {
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: 1,
          };
          const breakPointDec = {
            range,
            options: {
              isWholeLine: true,
              className: "contentClass",
              marginClassName: "myGlyphMarginClass",
              stickiness:
                monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          };
          store.commit('debug/addRowId', position.lineNumber);
          console.log(position.lineNumber);
          console.log(debugRowIds.value);
          editorCodeContent.getModel().deltaDecorations([], [breakPointDec]);
        } else {
          //删除
          const index = decorationIds.findIndex((id) => id === flagId);
          editorCodeContent.getModel().deltaDecorations(decorationIds, []);
          decorationIds.splice(index, 1);
          store.commit('debug/deleteRowId', position.lineNumber);
          console.log(debugRowIds.value);
        }
      })
      editorCodeContent.onMouseMove(e => {
        if (!code.value) return
        if (![2, 3, 4].includes(e.target.type)) return
        const position = e.target.position;
        const lineDecoration = editorCodeContent.getModel().getLineDecorations(position.lineNumber);
        lineDecoration.forEach((decoration) => {
          if (decoration.options.marginClassName === "myGlyphMarginHoverClass") {
            return
          }
        });
        if (decorationIds.length === 0) {
          //新增样式
          const range = {
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: 1,
          };
          const breakPointDec = {
            range,
            options: {
              isWholeLine: true,
              className: "contentClass",
              marginClassName: "myGlyphMarginHoverClass",
              stickiness:
                monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          };
          editorCodeContent.getModel().deltaDecorations([], [breakPointDec]);
        }
      })

    }

    onMounted(async () => {
      await nextTick()
      await initEditor()
    })


    // editorCode.value = code.value
    // 当切换文件的时候，更新code内容
    eventBus.on('changeFile', () => {
      store.commit('debug/clearRowIds');
      console.log(debugRowIds);
      // editorCode.value = code.value.content
      editorCodeContent.updateOptions({
        readOnly: false
      });
      if (code.value) {
        toRaw(editorCodeContent).setValue(code.value.content);
      } else {
        toRaw(editorCodeContent).setValue('请先新建文件~');
        editorCodeContent.updateOptions({
          readOnly: true
        });
      }
    })
    eventBus.on('changeLine', (line) => {
      console.log(line);
      let postion = {
        lineNumber: line,
        column: 1
      }
      console.log(editorCodeContent.setPosition, postion);
      editorCodeContent.setPosition(postion);
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

.myGlyphMarginClass {
  top: 4px !important;
  left: 10px !important;
  width: 10px !important;
  height: 10px !important;
  background: red !important;
  border-radius: 50%;
}

.myGlyphMarginHoverClass:hover {
  top: 4px !important;
  left: 10px !important;
  width: 10px !important;
  height: 10px !important;
  background: rgba(255, 0, 0, .5) !important;
  border-radius: 50%;
}
</style>