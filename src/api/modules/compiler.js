import api from "../index";
// 编译操作
export const compileCode = (data) => {
  return api.post("/compiler/compile", { data });
};
// 获取编译异常信息
export const getCompilerErrors = () => {
  return api.get("/compiler/errors");
};
// 重新编译
export const resetCompiler = () => {
  return api.post("/compiler/reset");
};
// 执行运行代码
export const runCode = (data) => {
  return api.post("/compiler/compile/run", { data });
};
