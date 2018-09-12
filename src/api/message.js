
import axios from "./axios"

export const getChatList = (id, user) =>
    axios.get(`chat/${id}/list?id=${user}`)

export const loadUnreadList = () =>
    axios.get("/msg/0")

export const loadAllUnreadList = () =>
    axios.post("/msg/getUnread")

export const updateRead = ids =>
    axios.post("/msg/updateRead", {
        ids
    }, {
        meta: {
            unIndicator: true
        }
    })

export const sendMail = (email, data) =>
    axios.post(`mail/sendMail?mail=${email}`, data, {
        meta: {
            unToast: true
        }
    })
