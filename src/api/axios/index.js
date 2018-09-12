
import axios from "axios"
import { HOST } from "../../common/js/config"
import storage from "good-storage"
import store from "../../store"

let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken

const Axios = axios.create({
    baseURL: HOST,
    // timeout: 5000,
    responseType: "json"
    // withCredentials: true    // 是否需要携带 Cookies
})

Axios.interceptors.request.use(
    config => {
        if (promiseArr[config.url]) promiseArr[config.url]()
        promiseArr[config.url] = cancel

        if (!(config.meta && config.meta.unIndicator)) {
            store.commit("Indicator/toggleIndicator", { show: true })
        }

        const token = storage.get("api_token")

        if (token) {
            if (config.params) config.params.api_token = token
            else config.params = { api_token: token }
        }

        // if (config.method === "post") {
        //     return Axios.get("xsrf").then(res => {
        //         config.data._token = res.data

        //         return config
        //     })
        // }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    res => {
        if (res.status !== 200) {
            return Promise.reject(res.data)
        }

        store.commit("Indicator/toggleIndicator", { show: false })
        if (!(res.config.meta && res.config.meta.unToast)) {
            if (typeof res.data.data === "string") store.commit("Indicator/toggleToast", { show: true, message: res.data.data })
        }

        return res.data
    },

    error => {
        if (error && error.response) {
            // hasAbort = true

            switch (error.response.status) {
            case 400:
                error.message = "错误请求"
                break
            case 401:
                error.message = "未授权，请重新登录"
                break
            case 403:
                error.message = "拒绝访问"
                break
            case 404:
                error.message = "请求错误,未找到该资源"
                break
            case 405:
                error.message = "请求方法未允许"
                break
            case 408:
                error.message = "请求超时"
                break
            case 422:
                error.message = error.response.data[Object.keys(error.response.data)[0]][0]
                break
            case 500:
                error.message = "服务器端出错"
                break
            case 501:
                error.message = "网络未实现"
                break
            case 502:
                error.message = "网络错误"
                break
            case 503:
                error.message = "服务不可用"
                break
            case 504:
                error.message = "网络超时"
                break
            case 505:
                error.message = "http版本不支持该请求"
                break
            default:
                error.message = `连接错误${error.response.status}`
            }
        } else {
            error.message = "连接到服务器失败"
        }
        store.commit("Indicator/toggleIndicator", { show: false })

        if (error && error.response) {
            if (!(error.response.config.meta && error.response.config.meta.unToast)) {
                store.commit("Indicator/toggleToast", { show: true, message: error.message })
            }
            if (error.response.status === 401) {
                if (location.hash.indexOf("sign-in") === -1) {
                    const timestamp = (new Date()).valueOf()
                    const url = `${location.origin}/#/sign-in?t=${timestamp}`
                    window.location.href = url
                }
            }
        }

        return Promise.reject(error)
    }
)

export default {

    get (url, param, config) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "get",
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                }),
                ...config
            }).then(res => {
                if (res.status) resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    post (url, param, config) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "post",
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                }),
                ...config
            }).then(res => {
                if (res.status) resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
