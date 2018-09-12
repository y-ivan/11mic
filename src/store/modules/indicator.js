
const state = {
    showToast: false,
    showIndicator: false,
    toastOption: {},
    indicatorOption: {}
}

const mutations = {
    toggleToast (state, option) {
        state.showToast = option.show

        state.toastOption = option.show ? option : {}
    },

    toggleIndicator (state, option) {
        state.showIndicator = option.show

        state.indicatorOption = option.show ? option : {}
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
