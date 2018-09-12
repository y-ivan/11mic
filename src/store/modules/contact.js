
import pinyin from "tiny-pinyin"
import { getContact, addContact } from "../../api/contact"
import { findIndex } from "../../common/js/util"

const typeTest = (type) => {
    let listName = ""
    switch (type) {
    case "1":
        listName = "contact"
        break
    case "2":
        listName = "clientContact"
        break
    case "3":
        listName = "emailContact"
        break
    case "4":
        listName = "providerContact"
        break
    default:
        listName = "contact"
    }
    return listName
}

const state = {
    // type: 1
    contact: [],
    // type: 2
    clientContact: [],
    // type: 3
    emailContact: [],
    // type: 4
    providerContact: []
}

const getters = {
    contact: (state) => type => {
        const list = typeTest(type)
        return state[list]
    },
    sortContact: state => type => {
        let prevLetter = ""
        const ref = {}

        const list = typeTest(type)
        const contact = [].concat(state[list])

        if (pinyin.isSupported()) {
            contact.sort((a, b) => {
                const prevLetter = pinyin.convertToPinyin(a.name).charAt(0).toUpperCase()
                const nextLetter = pinyin.convertToPinyin(b.name).charAt(0).toUpperCase()

                return prevLetter.localeCompare(nextLetter)
            }).forEach(item => {
                const letter = pinyin.convertToPinyin(item.name).charAt(0).toUpperCase()

                letter === prevLetter
                    ? ref[letter].push(item)
                    : ref[letter] = [item]

                prevLetter = letter
            })
        } else {
            ref[""] = contact
        }

        return ref
    },

    indexes: (state, getters) => Object.keys(getters.contact)
}

const actions = {
    getContact: ({commit}, type) => {
        return getContact(type).then(res => {
            commit("setContact", {type: type, list: res.data})
        })
    },

    addContact: ({ commit }, payload) => {
        return addContact(payload).then(res => {
            payload.data = Object.assign({}, payload, res.data)

            commit("addContact", payload)
        })
    }
}

const mutations = {

    setContact (state, payload) {
        let list = typeTest(payload.type)

        state[list] = payload.list
    },

    addContact (state, payload) {
        let list = typeTest(payload.type)

        state[list].push(payload.data)
    },

    updateContact (state, payload) {
        const list = typeTest(payload.type)
        const idx = findIndex(state[list], "id", payload.list.id)

        state[list].splice(idx, 1, payload.list)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
