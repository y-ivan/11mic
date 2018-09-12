
import storage from "good-storage"
import { insertArray, find, findIndex } from "../util"

const SEARCH_KEY = "__message__"
// const SEARCH_MAX_LENGTH = 15

export const loadMessageList = () => storage.get(SEARCH_KEY, [])

export const messageList = id => find(loadMessageList(), "id", id)

export const saveMessageList = (id, ref) => {
    const lists = loadMessageList()
    const list = messageList(id)

    if (list) {
        const idx = findIndex(lists, "id", id)

        if (list.list) {
            insertArray(list.list, ref, item =>
                item === ref
            )
        } else list.list = [ ref ]

        lists[idx] = list
    } else {
        lists.push({
            id,
            list: [ ref ]
        })
    }

    storage.set(SEARCH_KEY, lists)
    return list
}

export const removeMessageList = (id, ref) => {
    const lists = loadMessageList()
    const list = messageList(id)
    const idx = list.list.findIndex(item => item === ref)

    list.list.splice(idx, 1)

    storage.set(SEARCH_KEY, lists)
    return list
}
