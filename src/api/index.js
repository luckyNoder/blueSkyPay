import axios from 'axios'
import qs from 'qs'
import {getToken} from '../libs/util'
axios.defaults.baseURL = 'http://47.100.161.132:8181';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['authorization'] =  "Bearer "+ getToken()
    config.headers['Content-Type'] =  'application/x-www-form-urlencoded'

    if (getToken() !== null && typeof getToken() !== 'undefined') {
      }
    if(config.method === 'post'){
        config.data = qs.stringify(config.data)
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export function adminlogin(url,data = {}){
    debugger
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then(res => {
            resolve(res.data);
        })
    })
}

/**
 * 管理员列表 添加 删除  等操作
*/
export const adminlist = (url,data = {}) =>{
    // let Token = getToken()
    return new Promise((resolve, reject) => {
        axios.get(url,  {params: data})
        .then(res => {
            resolve(res.data);
        })
    })
}
export const addAdmin = (url,data) =>{
    // let Token = getToken()
    return new Promise((resolve, reject) => {
        axios.post(url, data)
        .then(res => {
            resolve(res.data);
        })
    })
}