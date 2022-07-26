import AlertUtil from '../utils/AlertUtil';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

// 请求拦截器
axios.interceptors.request.use(config => {
        if (window.sessionStorage.getItem('tokenStr')) {
            config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
        }
        console.log(config);
        return config
    }, error => {
        console.log(error)
    }
)
// 响应拦截器
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    if (success.status && success.status === 200) {
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 406) {
            AlertUtil.error("请登录", success.data.message)
            return
        }
        if (success.data.message) {
            AlertUtil.show("提示", success.data.message)
        }
    }
    return success.data
}, error => {
    let navigate = useNavigate();
    if (error.response.code === 504 || error.response.code === 404) {
        AlertUtil.error("请求失败！", '服务器无响应！')
    } else if (error.response.code === 403) {
        AlertUtil.error('无权限！请联系管理员！');
    } else if (error.response.code === 401) {
        AlertUtil.error('请登录！');
        navigate('/')
    } else {
        if (error.response.data.message) {
            AlertUtil.error(error.response.data.message)
        } else {
            AlertUtil.error('未知错误！')
        }
    }
})

// 封装axios
let base = ''
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}