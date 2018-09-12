
// import ReconnectingWebSocket from "reconnecting-websocket"

// import { SOCKETHOST } from "../../common/js/config"

// export const connect = id => new ReconnectingWebSocket(`${SOCKETHOST}from=${id}`)

// const state = {
//     ws: null
// }

// const getters = {
//     // send: state => state.wx ? state.ws.send : null
// }

// const actions = {
//     connect: ({ commit }, id) => {
//         const ws = connect(id)
//         commit("setws", ws)

//         // return ws
//     }
// }

// const mutations = {
//     setws (state, payload) {
//         state.ws = payload
//     }
// }

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// }
