// services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // 你的API基本URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 其他通用的请求头可以在这里添加
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在响应之前做一些处理
    return response.data;
  },
  (error) => {
    // 在响应出错时做一些处理
    return Promise.reject(error);
  }
);

export default instance;
