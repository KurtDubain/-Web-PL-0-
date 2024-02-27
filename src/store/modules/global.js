const state = {
    isShowAside:true,//是否展示侧边栏
    isShowDebugger:true//是否展示调试器
}
const mutations = {
    // 切换侧边栏
    changeIsShowAside(state) {
        state.isShowAside = !state.isShowAside;
    },
    // 切换调试器
    changeIsShowDebugger(state) {
        state.isShowDebugger = !state.isShowDebugger
        }
}
const actions = {

}
const getters = {
    // 获取侧边栏状态
    isShowAside(state) {
        return state.isShowAside;
    },
    // 获取调试器状态
    isShowDebugger(state) {
        return state.isShowDebugger;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}