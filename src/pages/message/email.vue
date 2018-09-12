
<template>
    <Panel
        title="邮箱助手"
        :pullDownRefresh="{ threshold: 70, stop: 40 }"
        @pullingDown="pullingDownHandle"
        :click="false"
        eventPassthrough="horizontal"
        ref="panel"
    >

        <div class="message">

            <div class="message-list">

                <MessageItem
                    class="message-item"
                    v-for="id in getChatList(email)"
                    :key="id"
                    :item="email[id]"
                    @click.native="messageItemHandle(id)">
                </MessageItem>
            </div>
        </div>

    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Search from "../../components/search"
import SearchPanel from "../../components/search/search-panel"
import MessageItem from "../../components/message/item"
import { createNamespacedHelpers } from "vuex"

const { mapState, mapGetters, mapActions } = createNamespacedHelpers("Message")

export default {
    components: {
        Panel,
        Search,
        MessageItem,
        SearchPanel
    },
    data () {
        return {
            list: {}
        }
    },

    computed: {
        ...mapState([
            "chat",
            "email"
        ]),
        ...mapGetters([
            "getChatList"
        ])
    },
    watch: {
        searchValue (id) {
            this.pushSystemMessage({
                content: {
                    title: "标题" + id,
                    text: id
                },
                type: "text",
                timestamp: "1531010615187"
            })
        },
        chat (chat) {
            this.getEmail(chat)
        }
    },
    methods: {
        messageItemHandle (id) {
            this.$router.push({ name: "chat-email", params: { id: id } })
        },
        pullingDownHandle () {
            this.getChatData().finally(() => {
                const scroll = this.$refs.panel.$refs.scroll

                scroll.forceUpdate()
            })
        },
        ...mapActions([
            "getChatData",
            "getEmail"
        ])
    },
    created () {
        Object.keys(this.chat).length === 0 && this.getChatData()
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.message {
    width: 100%;

    .message-list {
        padding-bottom: 1px;
        @include border-bottom;
    }
}
</style>
