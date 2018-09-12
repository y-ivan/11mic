
import axios from "./axios"

export const getUser = token =>
    axios.get("user", "", {
        meta: {
            unIndicator: true
        }
    })

export const getUsers = ids =>
    axios.post("msg/getUsers", {
        ids: ids
    }, {
        meta: {
            unIndicator: true
        }
    })

export const setUserInfo = (id, key) =>
    axios.post(`link/${id}`, Object.assign({}, key, {
        "_method": "PUT"
    }))

export const setUser = (id, data) =>
    axios.post(`cusers/${id}`, Object.assign({}, data, {
        "_method": "PUT"
    }))
