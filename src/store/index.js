// store/index.js

import { createStore } from "vuex";
// 引入modules
import filesModule from './modules/files'
import globalModule from './modules/global'


const store = createStore({
    modules:{
        files:filesModule,
        global:globalModule
    }
})

export default store;
