<template>
    <Panel :title="chatMessage.info && chatMessage.info.name || ''">
        <div class="chat">
            <Scroll ref="scroll">
                <div class="chat-bd">
                    <div
                        v-for="(message, index) in chatMessage && chatMessage.messages"
                        :key="index"
                        ref="messages"
                    >
                        <NotifyItem
                            :message="message"
                        ></NotifyItem>
                    </div>
                </div>
            </Scroll>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Scroll from "../../base/scroll"
import NotifyItem from "../../components/chat/default"
import { scrollFollow } from "../../common/js/mixin"
import { createNamespacedHelpers } from "vuex"

const { mapGetters, mapMutations } = createNamespacedHelpers("Message")

export default {
    mixins: [ scrollFollow ],
    components: {
        Panel,
        Scroll,
        NotifyItem
    },
    data () {
        return {
            id: ""
        }
    },
    computed: {
        chatMessage () {
            return this.getChatItem(this.id) || { }
        },
        ...mapGetters([
            "getChatItem"
        ])
    },
    activated () {
        const id = this.$route.params.id
        this.id = id
        // this.markerRead(id)
    },
    methods: {
        ...mapMutations([
            // "markerRead"
        ])
    }
}
</script>

<style lang="scss" scoped>

.chat {
    position: relative;
    width: 100%;
    height: 100%;

    .chat-bd {
        padding: 10px 0;
    }
}

</style>
