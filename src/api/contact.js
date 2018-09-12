
import axios from "./axios"

export const getContact = type =>
    axios.get(`link?type=${type}`)

export const setContactRemark = (id, cname) =>
    axios.get(`contact-remark/${id}/${cname}`)

export const addContact = data =>
    axios.post("link", data)

export const setUserInfo = (id, data) =>
    axios.post(`link/${id}`, Object.assign({}, data, {
        "_method": "PUT"
    }))

export const searchContact = (phone, type) =>
    axios.get("link/searchFriend", { phone, type })
