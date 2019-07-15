import axios from 'axios';
import { Toast } from 'components/Common';
const ajax = axios.create({
    timeout: 3000,
    withCredentials: true, // 支持跨域
    baseURL: 'http://154.92.18.182'
});

// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.errcode == 0) {
        return response.data;
    } else {
        Toast.info(data.msg || '网络不稳定，请稍后再试～');
        return Promise.reject({
            success: false,
            data: null,
            msg: data.msg || '网络不稳定，请稍后再试～'
        });
    }
    

}, function (error) {
    // 对响应错误做点什么
    console.log(error.response.statusText);
    Toast.info(error.response.statusText);
    return Promise.reject({
        success: false,
        data: null,
        msg: error.response.statusText
    });
    
});

export default ajax;