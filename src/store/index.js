
import Vue from "vue"
import Vuex from "vuex"
// import * as actions from "./actions"
// import * as getters from "./getters"
// import state from "./state"
// import mutations from "./mutations"
import createLogger from "vuex/dist/logger"
import Indicator from "./modules/indicator"
import Message from "./modules/message"
import Contact from "./modules/contact"
import User from "./modules/user"
// import Quote from "./modules/quote"
// import Enquiry from "./modules/enquiry"
// import Sales from "./modules/sales"
// import Purchase from "./modules/purchase"
// import Repertory from "./modules/repertory"
import WorkPlace from "./modules/work-place"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
    modules: {
        Indicator,
        Message,
        Contact,
        User,
        // Quote,
        // Enquiry,
        // Repertory,
        // Sales,
        // Purchase,
        WorkPlace
    },
    // actions,
    // getters,
    // state,
    // mutations
    strict: debug,
    plugins: debug ? [ createLogger() ] : []
})
