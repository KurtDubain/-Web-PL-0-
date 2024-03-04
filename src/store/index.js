// store/index.js

import { createStore } from "vuex";
// 引入modules
import filesModule from './modules/files'
import globalModule from './modules/global'
import debugModule from './modules/debug'


const store = createStore({
    modules: {
        files: filesModule,
        global: globalModule,
        debug: debugModule
    }
})

export default store;
