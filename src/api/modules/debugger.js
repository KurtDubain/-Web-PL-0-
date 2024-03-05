import api from "../index";
// 获取调试信息
export const getDebugInfo = (programState) => {
  return api.post("/debugger/info", { programState });
};
// 设置断点
export const setBreakpoint = (lineNumber) => {
  return api.post("/debugger/breakpoint", { lineNumber });
};
// 继续执行
export const continueExecution = () => {
  return api.post("/debugger/continue");
};
// 初始化
export const init = (data) => {
  return api.post("/debugger/init", { data });
};
// 执行到该行
export const stepInto = (data) => {
  return api.post("/debugger/debug2point", { data });
};
// 跳出当前函数
export const stepOut = () => {
  return api.post("/debugger/step-out");
};
