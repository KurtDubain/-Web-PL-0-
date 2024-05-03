// 全局状态管理
const state = {
  isShowAside: true, //是否展示侧边栏
  isShowDebugger: true, //是否展示调试器
  isShowTerminal: false, //是否展示终端
  isWasm: false, //是否是wasm
  isCreateEditor: false, //是否创建了编辑器实例

  isShowBlogerMsg: false, //是否展示博主信息
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
  // 切换博主联系方式
  changeIsShowBlogerMsg(state) {
    state.isShowBlogerMsg = !state.isShowBlogerMsg;
  },
  // 是否已经被初始化（用于控制多次挂载实例的情况）
  changeIsCreateEditor(state) {
    state.isCreateEditor = true;
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
  // 获取博客展示状态
  isShowBlogerMsg(state) {
    return state.isShowBlogerMsg;
  },
  // 获取编辑器实例的挂碍情况
  isCreateEditor(state) {
    return state.isCreateEditor;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
