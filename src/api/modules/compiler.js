import api from "../index";
export const compileCode = (data) => {
  return api.post("/compiler/compile", { data });
};
export const getCompilerErrors = () => {
  return api.get("/compiler/errors");
};
export const resetCompiler = () => {
  return api.post("/compiler/reset");
};
export const runCode = (data) => {
  return api.post("/compiler/compile/run", { data });
};
