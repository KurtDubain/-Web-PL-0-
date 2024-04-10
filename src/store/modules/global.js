const state = {
  isShowAside: true, //是否展示侧边栏
  isShowDebugger: true, //是否展示调试器
  isShowTerminal: false, //是否展示终端
  isWasm: false, //是否是wasm
};
const mutations = {
  // 切换侧边栏
  changeIsShowAside(state) {
    state.isShowAside = !state.isShowAside;
  },
  // 切换调试器
  changeIsShowDebugger(state) {
    state.isShowDebugger = !state.isShowDebugger;
  },
  // 切换终端
  changeIsShowTerminal(state) {
    state.isShowTerminal = !state.isShowTerminal;
  },
  // 切换wasm
  changeIsWasm(state) {
    state.isWasm = !state.isWasm;
  },
};
const actions = {};
const getters = {
  // 获取侧边栏状态
  isShowAside(state) {
    return state.isShowAside;
  },
  // 获取调试器状态
  isShowDebugger(state) {
    return state.isShowDebugger;
  },
  // 获取终端状态
  isShowTerminal(state) {
    return state.isShowTerminal;
  },
  // 获取wasm状态
  isWasm(state) {
    return state.isWasm;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
