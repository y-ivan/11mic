
<template>
    <Panel
        title="消息"
        :titleOnly="true"
        :bottom="searchPanel ? 0 : 55"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingDown="pullingDownHandle"
        :click="false"
        eventPassthrough="horizontal"
        :scroll="!searchPanel"
        ref="panel"
    >
        <router-view></router-view>

        <div class="message"
        >
            <Search
                @focus="searchFocusHandle"
                :showAction="false"
            />
            <div class="message-list">

                <MessageItem
                    class="message-item"
                    v-for="id in getChatList()"
                    :key="id"
                    :id="id"
                    :item="getChatItem(id)"
                    @click.native="messageItemHandle(id)"
                >
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
            searchValue: "",
            pullDownRefreshObj: {
                threshold: 70,
                stop: 40,
                txt: "<i class='iconfont icon-zhengque' style='margin-right: 5px;'></i> 刷新成功"
            }
        }
    },

    computed: {
        searchPanel () {
            return this.$route.name === "message-search"
        },
        ...mapState([
            "chat"
        ]),
        ...mapGetters([
            "getChatList",
            "getChatItem"
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
        }
    },
    methods: {

        searchFocusHandle () {
            this.$router.push({ name: "message-search" })
        },
        pullingDownHandle () {
            this.getChatData().finally(() => {
                const scroll = this.$refs.panel.$refs.scroll

                scroll.forceUpdate()
            })
        },
        messageItemHandle (id) {
            if (id === "-2") this.$router.push({ name: "email", params: { id: id } })
            else if (id !== "-1" && id !== "0") this.$router.push({ name: "chat", params: { id: id } })
            else this.$router.push({ name: "notify", params: { id: id } })
        },
        ...mapActions([
            "getChatData"
        ])
    },
    created () {
        // Object.keys(this.chat).length === 0 && this.getChatData()
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.message {
    width: 100%;

    .message-list {
        height: 100%;
        padding-bottom: 1px;
        @include border-bottom;
    }
}
</style>
