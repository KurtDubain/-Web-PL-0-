// 文件管理
const state = {
  files: [], //用于存储代码文件
  selectedFileIndex: null, //当前选中的文件
};

const mutations = {
  addFile(state, { name, content }) {
    const existingFile = state.files.find((file) => file.name === name);
    if (existingFile) {
      const newName = `${name.split(".")[0]}_copy.pl0`;
      state.files.push({
        name: newName,
        content,
      });
      state.selectedFileIndex = state.files.length - 1;
    } else {
      state.files.push({
        name,
        content,
      });
      state.selectedFileIndex = state.files.length - 1;
    }
  },
  // 删除文件
  deleteFile(state, index) {
    state.files.splice(index, 1);
    if (state.selectedFileIndex === index) {
      state.selectedFileIndex = null; // 如果删除的是选中的文件，则清空选中
    }
  },
  // 选择文件
  selectFile(state, index) {
    state.selectedFileIndex = index;
  },
  // 更新文件内容
  updateFileContent(state, { index, content }) {
    state.files[index].content = content;
  },
};

const actions = {};
const getters = {
  // 获取当前选中的文件信息
  selectedFile(state) {
    return state.selectedFileIndex !== null
      ? state.files[state.selectedFileIndex]
      : null;
  },
  // 获取所有文件列表
  allFiles(state) {
    return state.files;
  },
  getIndex(state) {
    return state.selectedFileIndex;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
