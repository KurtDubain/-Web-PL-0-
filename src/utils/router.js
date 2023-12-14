// vue-router的配置项

// 引入 Vue Router 和其他依赖
import { createRouter, createWebHistory } from 'vue-router';
// import {reactive} from 'vue'
// 页面注册
import Home from '../pages/homeDu.vue'
import About from '../pages/aboutDu.vue'
import technology from '../pages/tecDu.vue'
import pyhcials from '../pages/pyhDu.vue'
import community from '../pages/commuDu.vue'
import chatMaker from '../pages/chatDu.vue'
import read from '../pages/readerDu.vue'
import writer from '../pages/writeDu.vue'
import chatReader from '../pages/chatReaderDu.vue'
import subscription from '../pages/subscriptionDu.vue'
import weather from '../pages/weatherDu.vue'

import axios from '../utils/axios';

// 创建 Vue Router 实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path:'/',
        name:'home',
        component: Home
    },
    {
        path:'/about',
        name:'about',
        component: About
    },
    {
        path:'/technology',
        name:'technology',
        component: technology
    },
    {
        path:'/pyhcials',
        name:'pyhcials',
        component: pyhcials,
        
    },
    {
        path:'/community',
        name:'community',
        component: community,
        
    },
    {
        path:'/chatMaker',
        name:'chatMaker',
        component: chatMaker
    },
    {
        path:'/reader/:articleId',
        name:'read',
        component:read,
        props:true,
        
    },
    {
        // 添加了前置路由守卫，来防止非博主用户使用文章发表功能
        path:'/write',
        name:'write',
        component:writer,
        beforeEnter: async (to, from, next)=>{
            const token = localStorage.getItem('token')
            // 利用token来验证用户信息是否放行
            if(token){
                try{
                    const res = await axios.get('http://localhost:3000/users/verifyToken')
                    const {message} = res.data
                    if(message){
                        next()
                    }else{
                        next('/')
                    }   
                }catch(error){
                    console.error('路由验证失败',error);
                    next('/')
                }
            }else{
                next('/')
            }
        }
    },
    {
        path:'/chatComment/:chatId',
        name:'chatComment',
        component:chatReader,
        props:true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    },
    {
        path:'/subscription',
        name:'subscription',
        component:subscription,
    },
    {
        path:'/weather',
        name:'weather',
        component:weather
    }
    ]
});


export default router;
