
import storage from "good-storage"
import { findIndex } from "../util"
import { account } from "./account-cache"
const CACHE_KEY = "__chat__"
// const SEARCH_MAX_LENGTH = 15

// export const loadChatList = () => storage.get(SEARCH_KEY, [])

// export const chatList = id => find(loadChatList(), "id", id)

// export const saveChatList = (id, ref) => {
//     const lists = loadChatList()
//     const list = chatList(id)
//     if (list) {
//         const chat = find(list.messages, "id", ref.id)
//         const idx = findIndex(lists, "id", id)

//         if (chat) chat.message = chat.message.concat(ref.message)
//         else list.messages.push(ref)

//         lists[idx] = list
//     } else {
//         lists.push({
//             id,
//             messages: [ref]
//         })
//     }

//     storage.set(SEARCH_KEY, lists)
//     return list
// }

// export const removeChatList = (id, ref) => {
//     const lists = loadChatList()
//     const list = chatList(id)
//     const idx = list.messages.findIndex(item => item.id === ref)

//     list.messages.splice(idx, 1)

//     storage.set(SEARCH_KEY, lists)
//     return list
// }

export const loadChatCache = () => {
    const user = account()
    return storage.get(CACHE_KEY + user.id, {})
}

export const saveChatCache = (id, data) => {
    const user = account()
    const chat = loadChatCache()
    const itemChat = chat[id]

    if (itemChat === undefined) {
        chat[id] = data
    } else {
        data.messages.forEach(item => {
            const idx = findIndex(itemChat.messages || [], "msg_id", item.msg_id)

            if (idx === -1) {
                itemChat.messages.push(item)
            }
        })
    }

    storage.remove(CACHE_KEY + user.id)
    storage.set(CACHE_KEY + user.id, chat)
    return chat
}

export const deleteChatCache = (id) => {
    const chat = loadChatCache()
    const user = account()
    chat[id] && delete chat[id]

    storage.set(CACHE_KEY + user.id, chat)

    return chat
}

export const updateChatCache = (id, data) => {
    const chat = loadChatCache()
    const user = account()
    const itemChat = chat[id]

    if (itemChat && itemChat.messages) {
        const isArray = Array.isArray(data)

        if (isArray) {
            data.forEach(item => {
                const index = findIndex(itemChat.messages, "msg_id", item.msg_id)

                if (index === -1) saveChatCache(id, data)
                else itemChat.messages.splice(index, 1, item)
            })
        } else {
            const index = findIndex(itemChat.messages, "msg_id", data.msg_id)

            if (index === -1) saveChatCache(id, data)
            else itemChat.messages.splice(index, 1, data)
        }

        storage.remove(CACHE_KEY + user.id)
        storage.set(CACHE_KEY + user.id, chat)

        return chat
    } else {
        return saveChatCache(id, data)
    }
}
