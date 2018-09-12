<template>
    <Panel
        :title="chatMessage.name || chatMessage.info.name || ''"
        ref="panel"
    >
        <div class="chat">
            <div class="chat-bd">
                <div
                    v-if="chatMessage.messages"
                    v-for="(message, index) in chatMessage.messages"
                    :key="index"
                    ref="messages"
                >
                    <ChatItem
                        :message="message"
                        :contactInfo="chatMessage.info"
                        :selfInfo="info"
                    />
                </div>
            </div>
        </div>

        <div class="chat-action" slot="bottom">
            <ActionBar :messages="chatMessage"></ActionBar>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import ChatItem from "../../components/chat"
import ActionBar from "../../components/chat/action"
import { scrollFollow } from "../../common/js/mixin"
import { createNamespacedHelpers } from "vuex"

const { mapState, mapGetters, mapActions } = createNamespacedHelpers("Message")

const userStore = createNamespacedHelpers("User")

export default {
    mixins: [ scrollFollow ],
    components: {
        Panel,
        ChatItem,
        ActionBar
    },
    computed: {
        ...mapState([
            "interim",
            "chat"
        ]),
        chatMessage () {
            const id = this.$route.params.id
            const chatItem = this.getChatItem(id)

            const hasInterim = this.interim.id === id
            if (id === undefined || !hasInterim & !chatItem) return { info: {}, messages: [] }

            return chatItem || (hasInterim && { info: this.interim })
        },
        ...mapGetters([
            "getChatItem"
        ]),
        ...userStore.mapState([
            "info"
        ])
    },
    activated () {
        const id = this.$route.params.id
        this.updateRead(id)
    },
    methods: {
        ...mapActions([
            "updateRead",
            "getChatData"
        ])
    },
    created () {
        Object.keys(this.chat).length === 0 && this.getChatData()
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.chat-action {
    background: $color-white;
    @include border-top;
}

</style>
