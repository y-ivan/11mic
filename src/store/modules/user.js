
import { getUser } from "../../api/user"
import storage from "good-storage"

const state = {
    info: {
        id: "",
        name: "",
        avatar: ""
    }
}

const getters = {
    userId: state => state.info.id
}

const actions = {
    getUserInfo: ({ commit }) => {
        const token = storage.get("api_token")

        return getUser(token).then(res => {
            commit("setInfo", res.data)
            return res.data
        })
    }
}

const mutations = {
    setInfo (stata, payload) {
        stata.info = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
