import api from '../index'
// 获取调试信息
export const getDebugInfo = (programState) => {
    return api.post('/debug/info', { programState });
  };
  // 设置断点
export const setBreakpoint = (lineNumber) => {
    return api.post('/debug/breakpoint', { lineNumber });
  };
  // 继续执行
export const continueExecution = () => {
    return api.post('/debug/continue');
  };
  // 单步执行
export const stepOver = () => {
    return api.post('/debug/step-over');
  };
  // 逐句执行
export const stepInto = () => {
    return api.post('/debug/step-into');
  };
  // 跳出当前函数
export const stepOut = () => {
    return api.post('/debug/step-out');
  };
  