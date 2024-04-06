<template>
  <div class="debugger-styles">
    <h3>调试器</h3>
    <div class="debugger-options">
      <el-form :inline="true">
        <el-form-item color="#fff" label="目前所在行">
          <div class="input">
            <el-input v-model.number="currentLine" size="small" disabled />
          </div>
          <el-button
            class="debug-button"
            @click="startInit"
            type="primary"
            size="small"
            >初始化</el-button
          >
          <el-button
            class="debug-button"
            @click="startByType('nextLine')"
            type="primary"
            size="small"
            >执行到下一行</el-button
          >
          <el-button
            class="debug-button"
            @click="startByType('nextBreak')"
            type="primary"
            size="small"
            >执行到下一个断点</el-button
          >
          <el-button
            class="debug-button"
            @click="clearIt"
            type="primary"
            size="small"
            >清空</el-button
          >
          <el-button
            class="debug-button"
            @click="endDebugSession"
            type="primary"
            size="small"
            >取消调试</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="debugger-output">
      <div>调试结果：</div>
      <div class="pre">
        <el-table height="100%" :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="变量名" />
          <el-table-column prop="value" label="变量值" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="scope" label="作用域" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import eventBus from "@/utils/eventBus";
import { init, stepInto } from "../api/modules/debugger";
import io from "socket.io-client";
export default {
  name: "DebuggerBS",
  setup() {
    const store = useStore();
    const code = computed(() => store.getters["files/selectedFile"]); //代码文件
    const debugRowIds = computed(() => store.getters["debug/rowIds"]); //断点行号
    const isWasm = computed(() => {
      return store.getters["global/isWasm"];
    });
    let socket = null;
    // 当前行号
    let currentLine = ref(0);
    // 调试数据
    const tableData = ref([]);
    // 预检功能
    const checkCode = () => {
      let result;
      if (code.value) {
        console.log(debugRowIds.value);
        result = true;
      } else {
        result = false;
        window.alert("没有可执行文件");
      }
      return result;
    };
    // 初始化
    const startInit = async () => {
      if (!checkCode()) return;
      if (isWasm.value) {
        let data = {
          code: code.value,
          language: isWasm.value ? "wasm" : "js",
        };
        let res = await init(data);
        if (res.success) {
          tableData.value = res.result;
        }
      } else {
        if (!socket) {
          // 建立 WebSocket 连接
          socket = io("http://localhost:3001");

          // 注册一次性的事件监听器
          socket.once("initialized", () => {
            console.log("链接成功");
          });

          // 只注册一次 paused 事件的监听器
          socket.on("paused", (args) => {
            console.log("暂停信息", args);
            // currentLine.value = args.pl0Line; // 假设后端发送的 args 包含 pl0Line
            // 更新调试数据表格
            // tableData.value = args.variables.map((varInfo) => ({
            //   name: varInfo.name,
            //   value: varInfo.value,
            //   type: varInfo.type, // 假设这是变量的类型
            //   scope: "Local", // 假设所有变量都是局部的，根据需要调整
            // }));
          });
        }

        // 向服务器发送初始化指令，包括代码和断点信息
        socket.emit("init", {
          code: code.value,
          breakpoints: debugRowIds.value.map((breakpoint) =>
            Number(breakpoint)
          ),
        });
      }
    };

    // 单步执行
    const startByType = (type) => {
      if (!checkCode()) return;
      if (isWasm.value) {
        let line;
        if (type == "nextLine") {
          let totalLine = code.value.content.split("\n").length;
          line = currentLine.value + 1;
          if (line > totalLine) {
            window.alert("没有下一行了");
            currentLine.value = 0;
            return;
          }
        }
        if (type == "nextBreak") {
          line = debugRowIds.value
            .map((item) => {
              if (item > currentLine.value) {
                return item;
              }
            })
            .filter((item) => item)[0];
          if (!line) {
            window.alert("没有下一个断点");
            currentLine.value = 0;
            return; //没有下一个断点
          }
        }
        stepIntoTheNext(line);
        currentLine.value = line;
      } else {
        if (socket) {
          if (type == "nextLine") {
            socket.emit("debugCommand", { command: "stepOver" });
          } else if (type == "nextBreak") {
            socket.emit("debugCommand", { command: "continue" });
          }
        } else {
          console.log("请先链接");
        }
      }
    };
    // 执行到下一个断点
    const stepIntoTheNext = async (line) => {
      console.log(line);
      let data = {
        code: code.value,
        line,
        language: isWasm.value ? "wasm" : "js",
      };
      let res = await stepInto(data);
      if (res.success) {
        tableData.value = res.result;
      }
    };
    // 清空变量数据
    const clearIt = () => {
      tableData.value = [""];
      currentLine.value = 0;
    };
    const endDebugSession = () => {
      if (socket) {
        // socket.emit("disconnectSocket");
        socket.disconnect();
        socket = null;
      }
    };
    // 监听到文件更新，则重新初始化一些数据
    eventBus.on("changeFile", () => {
      currentLine.value = 0;
      tableData.value = [];
    });
    // 更新高亮行
    watch(currentLine, (newVal, oldVal) => {
      console.log(newVal, oldVal);
      eventBus.emit("changeLine", newVal);
    });
    return {
      currentLine,
      tableData,
      startInit,
      startByType,
      clearIt,
      endDebugSession,
    };
  },
};
</script>

<style scoped>
.debugger-styles {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  background-color: #444;
  color: #fff;
  overflow: visible !important;
  height: 100%;
}

.debugger-options {
  margin-bottom: 10px;
}

.debugger-options label {
  margin-right: 10px;
}

.debug-button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.debugger-output {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.debugger-output .pre {
  white-space: pre-wrap;
  background-color: #333;
  height: 60%;
  overflow-y: auto;
  border: 1px solid #555;
}

.input {
  margin-right: 10px;
  width: 50px;
}
</style>
