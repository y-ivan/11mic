
import { findIndex } from "../../common/js/util"

const state = {
    notices: [],
    actions: [{}]

}

const getters = {
}

const actions = {

}

const mutations = {
    updateNotices (state, paymode) {
        const index = findIndex(state.notices, "msg_id", paymode.msg_id)

        if (index === -1) state.notices.push(paymode)
        else state.notices.splice(index, 1, paymode)
    },
    updateActions (state, paymode) {
        const index = findIndex(state.actions, "msg_id", paymode.msg_id)

        if (index === -1) state.actions.push(paymode)
        else state.actions.splice(index, 1, paymode)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
