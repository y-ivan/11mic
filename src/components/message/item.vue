<template>
    <mt-cell-swipe
        :right="swipeConfig"
    >
        <div class="item">
            <div class="info" v-if="$route.name !== 'email'">

                <Avatar v-if="currentMessage.from_id == -1" icon="xiaoxi" color="#e6506a" />
                <Avatar v-else-if="currentMessage.from_id == 0" icon="tongzhi" color="#2dd048" />
                <Avatar v-else-if="currentMessage.type == 'email'" icon="youxiangzhushou" color="#41affc" />
                <Avatar v-else :src="item.info && item.info.avatar" :text="item.info && item.info.name" />

                <div class="text" v-if="currentMessage.from_id == -1">
                    <div class="title">系统消息</div>
                    <div class="content" v-html="messageContent(currentMessage)"></div>
                </div>
                <div class="text" v-if="currentMessage.from_id == 0">
                    <div class="title">企业消息</div>
                    <div class="content" v-html="messageContent(currentMessage)"></div>
                </div>
                <div class="text" v-if="currentMessage.type == 'email'">
                    <div class="title">邮箱助手</div>
                    <div class="content" v-html="messageContent(currentMessage)"></div>
                </div>

                <div class="text" v-else>
                    <div class="title">{{ item.info && item.info.name }}</div>
                    <div class="content" v-html="messageContent(currentMessage)"></div>
                </div>
            </div>

            <div class="info" v-else>
                <Avatar
                    :src="item.info && item.info.avatar || currentMessage.sender && currentMessage.sender.avatar"
                    :text="currentMessage.sender && currentMessage.sender.name || currentMessage.email"
                />
                <div class="text">
                    <div class="title">{{ item.info && item.info.name || currentMessage.email }}</div>
                    <div class="content" v-html="messageContent(currentMessage)"></div>
                </div>

            </div>

            <div class="meta">
                <div class="timestamp">{{ currentMessage.created_at | timeStampParse }}</div>
                <mt-badge size="small" type="error" v-if="unreadMessages.length > 0">{{ unreadMessages.length | limitUnRead }}</mt-badge>
            </div>
        </div>
    </mt-cell-swipe>
</template>

<script>

import { messageContentMixin, timeStampMixin } from "../../common/js/mixin"
import { Badge, CellSwipe } from "mint-ui"
import { createNamespacedHelpers } from "vuex"
import Avatar from "../avatar"

const { mapActions, mapMutations } = createNamespacedHelpers("Message")
const userStore = createNamespacedHelpers("User")

export default {
    mixins: [ messageContentMixin, timeStampMixin ],
    props: {
        item: {
            required: true
        },
        id: {
            default: 0
        }
    },

    components: {
        Avatar,
        [Badge.name]: Badge,
        [CellSwipe.name]: CellSwipe
    },
    computed: {
        swipeConfig () {
            let obj = null

            if (this.unreadMessages.length === 0) {
                obj = [{
                    content: "删除",
                    style: { background: "red", color: "#fff", display: "flex", "align-items": "center" },
                    handler: () => this.removeMessage(this.id)
                }]
            } else {
                obj = [{
                    content: "标记已读",
                    style: { background: "orange", color: "#fff", display: "flex", "align-items": "center" },
                    handler: () => this.updateRead(this.id)
                }, {
                    content: "删除",
                    style: { background: "red", color: "#fff", display: "flex", "align-items": "center" },
                    handler: () => this.removeMessage(this.id)
                }]
            }

            return obj
        },
        currentMessage () {
            const messages = this.item.messages

            return messages[messages.length - 1]
        },
        unreadMessages () {
            const messages = this.item.messages || []

            return messages.filter(item => Number(item.to_id) === this.info.id && item.is_read === 0)
        },
        ...userStore.mapState([
            "info"
        ])
    },
    filters: {
        limitUnRead (num) {
            return num >= 100 ? "99+" : num
        }
    },
    methods: {

        ...mapMutations([
            "removeMessage"
        ]),
        ...mapActions([
            "updateRead"
        ])
    }

}
</script>

<style lang="scss">
.message {
    .mint-cell-swipe {
        .mint-cell-title {
            flex: 0;
        }
        .mint-cell-value {
            width: 100%;
        }

        .mint-cell-swipe-buttongroup {
            display: flex;
        }
    }
}
</style>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.item {
    width: 100%;
    @include flexCenter;
    justify-content: space-between;
    padding: 8px 5px;
    font-size: $font-size-s;
    box-sizing: border-box;

    .info {
        flex: 1;
        @include flexCenter;
        max-width: calc(100% - 70px);

        .text {
            height: 40px;
            flex: 1;
            // max-width: 100%;
            max-width: calc(100% - 50px);

            .title {
                margin: 5px 0;
                font-size: $font-size-m;
            }

            .content {
                width: 100%;
                color: $color-gray;
                @include textOverflow;
                line-height: 1.2;

                span {
                    font-weight: bold;
                }
            }
        }

        .avatar {
            margin-right: 10px;
        }
    }

    .meta {
        height: 40px;
        flex: 0 0 75px;
        padding: 3px 0;
        box-sizing: border-box;
        @include flexCenter;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .timestamp {
            color: $color-gray;
        }
    }
}
</style>
