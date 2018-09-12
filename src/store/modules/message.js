
// import { findIndex } from "../../common/js/util"
// import { messageList, saveMessageList, removeMessageList } from "../../common/js/cache/message-cache"
import { loadChatCache, saveChatCache, updateChatCache, deleteChatCache } from "../../common/js/cache/chat-cache"
import { getUsers } from "../../api/user"
import { url } from "../../common/js/util"
import { account } from "../../common/js/cache/account-cache"

import { loadUnreadList, updateRead } from "../../api/message"

const state = {
    interim: {},
    chat: {},
    email: {}

    // messageList: ["-3", "-2", "-1", "19751"],

    // contactMessage: [],

    // systemMessage: {
    //     type: "system",
    //     id: -3,
    //     name: "系统消息",
    //     unread: 65,
    //     message: [{
    //         content: {
    //             title: "欢迎使用11mic",
    //             text: "我们将会给您带来更好的体验!"
    //         },
    //         type: "text",
    //         timestamp: "1531010615187"
    //     }]
    // },

    // emailMessage: {
    //     type: "email",
    //     id: -1,
    //     name: "邮件助手",
    //     unread: 0,
    //     message: [{
    //         content: "欢迎使用11mic",
    //         type: "text",
    //         timestamp: "1531010615187"
    //     }]
    // },
    // companyMessage: {
    //     type: "company",
    //     id: -2,
    //     name: "企业消息",
    //     unread: 34,
    //     message: [{
    //         content: {
    //             title: "放假通知",
    //             text: "根据国家法定节假日规定办法,我司将于10月1日至10月7日进行放假,祝大家节日愉快."
    //         },
    //         type: "text",
    //         timestamp: "1531010615187"
    //     }]
    // }
}

const getters = {

    recombine: state => (arr, email = true) => {
        const chat = {}
        const info = account()

        arr.forEach(item => {
            let id = Number(item.from_id)
            if (!email) {
                if (Number(item.from_id) !== -2) {
                    id = Number(item.from_id) === info.id ? item.to_id : item.from_id
                } else id = item.email
            }

            const hasOwn = chat.hasOwnProperty(id)

            if (item.type === "email" && email) {
                if (chat.hasOwnProperty("-2")) {
                    chat["-2"].messages.push(item)
                } else chat["-2"] = { messages: [item] }
                return false
            }

            if (hasOwn) chat[id].messages.push(item)
            else chat[id] = { messages: [item] }
        })

        return chat
    },
    getChatList: state => (list = state.chat) => {
        const arr = Object.keys(list).sort((prev, next) => {
            const chat = list
            const prevMessage = chat[prev].messages
            const nextMessage = chat[next].messages

            if (!prevMessage || !nextMessage) return 0
            return nextMessage[nextMessage.length - 1].created_at - prevMessage[prevMessage.length - 1].created_at
        })
        return arr
    },
    getChatItem: state => (id, list = state.chat) => list[id]
}

const actions = {
    // getMessageList ({ commit, getters }, id = "") {
    //     if (id === "") return false

    //     const list = messageList(id)

    //     if (list) commit("setMessageList", list.list)
    // },

    getChatData ({ commit, getters, dispatch }) {
        return loadUnreadList().then(res => {
            return getters.recombine(res.data)
        }).then(data => {
            const keys = Object.keys(data)
            const ids = keys.filter(item => item > 0)
            return ids && getUsers(ids).then(res => {
                const users = res.data

                users.forEach(item => {
                    data[item.id].info = item

                    saveChatCache(item.id, data[item.id])
                })

                if (keys.includes("0")) {
                    data["0"].info = { id: 0, name: "企业消息" }
                    saveChatCache(0, data["0"])
                }

                if (keys.includes("-1")) {
                    data["-1"].info = { id: -1, name: "系统消息" }
                    saveChatCache(-1, data["-1"])
                }

                if (keys.includes("-2")) {
                    data["-2"].info = { id: -2, name: "邮件消息" }
                    saveChatCache(-2, data["-2"])
                }
            })
        }).then(() => {
            const chat = loadChatCache()
            commit("setChat", chat)
            return dispatch("getEmail", chat)
        })
    },
    getEmail: ({ commit, getters, state }, chat) => {
        const arr = chat["-2"] && chat["-2"].messages
        if (!arr) return false
        const list = getters.recombine(arr, false)
        const keys = Object.keys(list)
        const ids = keys.filter(item => item > 0 || url(item))

        if (ids && ids.length) {
            return getUsers(ids).then(res => {
                const users = res.data

                users.forEach(item => {
                    list[item.id].info = item
                })

                commit("setEmail", list)
            })
        } else {
            commit("setEmail", list)
        }
    },

    updateRead ({ commit, getters }, id) {
        const info = account()
        const messages = getters.getChatItem(id) && getters.getChatItem(id).messages
        if (!messages || !messages.length) return false

        const unreads = messages.filter(item => Number(item.to_id) === info.id && item.is_read === 0)

        if (!unreads.length) return false

        const unreadIds = []
        const updateDate = unreads.map(item => {
            unreadIds.push(item.msg_id)
            return Object.assign({}, item, { is_read: 1 })
        })

        updateRead(unreadIds).then(res => {
            commit("updateMessage", { id, chat: updateDate })
        })
    }
}

const mutations = {
    setChat (state, payload) {
        state.chat = payload
    },

    setEmail (state, payload) {
        state.email = payload
    },

    setInterimContact (state, payload) {
        state.interim = payload || {}
    },

    pushMessage (state, { id, chat }) {
        const chatCache = saveChatCache(id, chat)
        state.chat = chatCache
    },

    updateMessage (state, { id, chat }) {
        const chatCache = updateChatCache(id, chat)

        state.chat = chatCache
    },
    removeMessage (state, id) {
        const chat = state.chat[id]

        if (!chat) return false

        this.dispatch("Message/updateRead", id)

        state.chat = deleteChatCache(id)
    }

    // pushSystemMessage (state, payload) {
    //     this.commit("Message/unshiftMessageList", "-3")
    //     state.systemMessage.message.concat(payload)
    //     state.systemMessage.unread++
    // },

    // pushCompanyMessage (state, payload) {
    //     this.commit("Message/unshiftMessageList", "-2")
    //     state.companyMessage.message.concat(payload)
    //     state.companyMessage.unread++
    // },

    // pushemailMessage (state, payload) {
    //     this.commit("Message/unshiftMessageList", "-1")
    //     state.emailMessage.message.concat(payload)
    //     state.emailMessage.unread++
    // },

    // unshiftMessageList (state, id) {
    //     const idx = state.messageList.findIndex(item => item === id)

    //     if (idx === 0) return false

    //     if (idx !== -1) {
    //         state.messageList.splice(idx, 1)
    //     }
    //     const userId = this.getters["User/userId"]
    //     saveMessageList(userId, id)
    //     state.messageList.unshift(id)
    // },
    // markerRead (state, id) {
    //     if (id === "-1") {
    //         state.emailMessage.unread = 0
    //     } else if (id === "-2") {
    //         state.companyMessage.unread = 0
    //     } else if (id === "-3") {
    //         state.systemMessage.unread = 0
    //     } else {
    //         const ref = find(state.contactMessage, "id", id)
    //         ref && (ref.unread = 0)
    //     }
    // }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
