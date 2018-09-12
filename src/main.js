import "babel-polyfill"
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"

Vue.config.productionTip = process.env.NODE_ENV !== "production"
new Vue({

    el: "#app",
    router,
    store,
    render: h => h(App)

})
