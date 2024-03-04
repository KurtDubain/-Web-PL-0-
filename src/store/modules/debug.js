const state = {
    rowIds: [],//当前文件的断点list
}
const mutations = {
    // 新增断点
    addRowId(state, rowId) {
        state.rowIds.push(rowId)
    },
    // 删除断点
    deleteRowId(state, rowId) {
        state.rowIds = state.rowIds.filter(id => id !== rowId)
    },
    // 清空断点
    clearRowIds(state) {
        state.rowIds = []
    }
}
const actions = {

}
const getters = {
    // 获取断点
    rowIds(state) {
        return state.rowIds;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}