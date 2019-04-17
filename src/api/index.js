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

/**
 * 管理员列表 添加 删除  等操作
*/
export function adminlogin(url,data = {}){
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then(res => {
            resolve(res.data);
        })
    })
}
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
export const deleteAdmin = (url,data) =>{
    return new Promise((resolve, reject) => {
        axios.get(url + '/'+ data )
        .then(res => {
            resolve(res.data);
        })
    })
}

export const updateAdminPass =  (url,data)=>{
    return new Promise((resolve, reject) => {
        axios.post(url, data)
        .then(res => {
            resolve(res.data);
        })
    })
}

// /admin/order/list/1
export const allOrderListFun =  (url,data)=>{
    return new Promise((resolve, reject) => {
        axios.get(url,  {params: data})
        .then(res => {
            resolve(res.data);
        })
    })
}
/**
 * business  商户列表的增删改查
*/

// 商户登录
export function businesslogin(url,data = {}){
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then(res => {
            resolve(res.data);
        })
    })
}

// 获取商户列表
export const businessList = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.get(url,  {params: data})
        .then(res => {
            resolve(res.data);
        })
    })
}

// 新增商户
export const addBusiness = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data);
        })
    })
}

// 删除用户
export const deleteBusiness = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.get(url + '/'+ data ).then(res => {
            resolve(res.data);
        })
    })
}

//审核用户
export const  checkBusniess = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data);
        })
    })
}

// 修改用户信息
export const infoUpdateFun = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data);
        })
    })
}

// 修改商户密码

export const updatePassFun = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data);
        })
    })
}

// 商户设备管理列表
export const businessEquipment = (url , data ) =>{
    return new Promise((resolve, reject) => {
        axios.get(url,  {params: data})
        .then(res => {
            resolve(res.data);
        })
    })
}