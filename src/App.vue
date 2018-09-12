
<template>
    <div id="app">
        <div class="">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>

        <tabbar
            v-if="showTabbar"
            :currentItem="$route.name"
            @change="tabChangeHandle"
        ></tabbar>
        <div v-else></div>

    </div>
</template>

<script>

import {
    Toast,
    Indicator
} from "mint-ui"

import tabbar from "./components/tabbar"

import { createNamespacedHelpers } from "vuex"
import { save } from "./common/js/cache/account-cache"
import { connect } from "./common/js/socket"
import { updateRead } from "./api/message"
import { getUsers } from "./api/user"

const IndicatorStore = createNamespacedHelpers("Indicator")
const UserStore = createNamespacedHelpers("User")
const MessageStore = createNamespacedHelpers("Message")
const WorkPlaceStore = createNamespacedHelpers("WorkPlace")

export default {
    components: {
        tabbar
    },

    data () {
        return {
            ws: null,
            toast: null,
            timer: null,
            tabbarNames: ["message", "manage", "work-place", "contact", "mine"]
        }
    },
    computed: {
        showTabbar () {
            return this.tabbarNames.find(item => item === this.$route.name)
        },
        ...IndicatorStore.mapState([
            "showToast",
            "showIndicator",
            "toastOption",
            "indicatorOption"
        ]),
        ...UserStore.mapState([
            "info"
        ]),
        ...MessageStore.mapState([
            "chat"
        ])
    },
    watch: {
        showToast (bool) {
            if (bool) {
                this.toast = Toast(this.toastOption)

                const duration = this.toastOption.duration

                if (duration !== -1) {
                    this.timer = setTimeout(() => {
                        this.toggleToast({ show: false })
                    }, duration || 3000)
                }
            } else {
                this.toast.close()
                clearTimeout(this.timer)
            }
        },

        showIndicator (bool) {
            if (bool) Indicator.open(this.indicatorOption)
            else Indicator.close()
        },
        info (info) {
            save(info)
            this.getChatData()
            this.loadWS(info.id)
        },
        chat (chat) {
            this.getEmail(chat)
        }
    },
    methods: {
        tabChangeHandle (value) {
            if (value === "contact") this.$router.push({ name: value, params: { type: "1" } })
            // else if (value === "manage") return false
            else this.$router.push({ name: value })
        },
        loadWS (id) {
            const selfId = id

            if (this.ws) return false
            this.ws = connect(selfId)
            this.ws.addEventListener("message", e => {
                const message = JSON.parse(e.data)

                if (message.type === "notice" || message.type === "action") {
                    const method = message.type === "notice" ? this.updateNotices : this.updateActions

                    method(message)
                    return false
                }

                const hasChatCurrent = this.$route.name === "chat" && this.$route.params.id === message.from_id

                const data = Object.assign({}, message, { is_read: hasChatCurrent ? 1 : 0 })
                let id = message.from_id
                let info = {}
                hasChatCurrent && updateRead([message.msg_id])

                // 邮件消息处理
                if (id === "-2") {
                    this.pushMessage({ id: -2, chat: { info: { name: "邮件消息", id: -2 }, messages: [data] } })

                    return false
                }

                if (id === "0") {
                    id = 0
                    info = { id: 0, name: "企业消息" }
                } else if (id === "-1") {
                    id = -1
                    info = { id: -1, name: "系统消息" }
                } else {
                    if (message.type === "email") {
                        return getUsers([id]).then(res => {
                            data.sender = res.data[0]
                            this.pushMessage({ id: -2, chat: { info: { name: "邮件消息", id: -2 }, messages: [data] } })
                        })
                    }

                    if (this.chat[id]) {
                        info = this.chat[id].info
                    } else {
                        return getUsers([id]).then(res => {
                            this.pushMessage({ id: id, chat: { info: res.data && res.data[0], messages: [data] } })
                        })
                    }
                }

                this.pushMessage({ id: id, chat: { info: info, messages: [data] } })
            })

            this.ws.addEventListener("close", function (evt) {
                this.ws = connect(selfId)
            })
        },
        ...IndicatorStore.mapMutations([
            "toggleToast"
        ]),
        ...UserStore.mapActions([
            "getUserInfo"
        ]),
        ...MessageStore.mapMutations([
            "pushMessage"
        ]),
        ...MessageStore.mapActions([
            "getChatData",
            "getEmail"
        ]),
        ...WorkPlaceStore.mapActions([
            "updateNotices",
            "updateActions"
        ])
    },
    created () {
        if (this.$route.path.indexOf("sign-in") !== -1) return false
        this.getUserInfo()
    }
}
</script>

<style lang="scss">

@import "./common/scss/index.scss";

</style>
