const state = {
  rowIds: [], //当前文件的断点list
  debugMsgQueue: [],
};
const mutations = {
  // 新增断点
  addRowId(state, rowId) {
    state.rowIds.push(rowId);
  },
  // 删除断点
  deleteRowId(state, rowId) {
    state.rowIds = state.rowIds.filter((id) => id !== rowId);
  },
  // 清空断点
  clearRowIds(state) {
    state.rowIds = [];
  },
  enqueueDebugMsg(state, debugMsg) {
    state.debugMsgQueue.push(debugMsg); // 添加到队列前端
  },
  dequeueDebugMsg(state) {
    state.debugMsgQueue.shift(); // 移除并返回队列尾端的元素
  },
  clearDebugMsgQueue(state) {
    state.debugMsgQueue = [];
  },
};
const actions = {
  processPaused({ commit }, debugMsg) {
    console.log(state.debugMsgQueue);
    commit("enqueueDebugMsg", debugMsg);
  },
  processContinue({ commit }) {
    commit("dequeueDebugMsg"); // 处理 continue 操作，返回当前处理的调试信息
  },
};
const getters = {
  // 获取断点
  rowIds(state) {
    return state.rowIds;
  },
  debugMsgQueue(state) {
    return state.debugMsgQueue;
  },
  getCurDebugMsg(state) {
    return state.debugMsgQueue[0];
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
