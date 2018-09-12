import storage from "good-storage"

const CACHE_KEY = "__account__"
const CACHE_MAX_LENGTH = 15

const insertArray = (arr, key, compare, maxLen) => {
    const index = arr.findIndex(compare)

    if (index === 0) return true

    if (index >= 0) {
        arr.splice(index, 1)
    }

    arr.unshift(key)

    if (maxLen && arr.length > maxLen) arr.pop()
}

export const load = () => storage.get(CACHE_KEY, [])

export const save = (data) => {
    let searches = load()

    insertArray(searches, data, (item) => {
        return item.id === data.id
    },
    CACHE_MAX_LENGTH
    )

    storage.set(CACHE_KEY, searches)
    return searches
}

export const clear = () => {
    storage.remove(CACHE_KEY)
    return []
}

export const account = () => load()[0]
