// store/index.js

import { createStore } from 'vuex';
// 引入modules
import filesModule from './modules/files'


const store = createStore({
    modules:{
        files:filesModule
    }
})

export default store;
