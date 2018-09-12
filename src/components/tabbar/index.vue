<template>
    <div class="tab-wrapper">
        <mt-tabbar class="tab-bar" :fixed="fixed" :value="currentItem" @input="$emit('change', $event)">
            <mt-tab-item id="message" class="tab-item">
                <div slot="icon" class="icon-cont">
                    <i class="iconfont icon-ai-message"></i>
                    <mt-badge class="badge" size="small" type="error" v-if="newMessage">{{ newMessage }}</mt-badge>
                </div>
                消息
            </mt-tab-item>

            <mt-tab-item id="manage" class="tab-item">
                <i class="iconfont icon-guanli" slot="icon"></i>
                管理
            </mt-tab-item>

            <mt-tab-item id="work-place" class="tab-item center">
                <i class="iconfont icon-gongzuotai" slot="icon"></i>
                工作台
            </mt-tab-item>

            <mt-tab-item id="contact" class="tab-item">
                <i class="iconfont icon-tongxunlu" slot="icon"></i>
                通讯录
            </mt-tab-item>

            <mt-tab-item id="mine" class="tab-item">
                <i class="iconfont icon-wode" slot="icon"></i>
                我的
            </mt-tab-item>

        </mt-tabbar>
    </div>
</template>

<script>

import {
    Badge,
    Tabbar,
    TabItem
} from "mint-ui"
import { createNamespacedHelpers } from "vuex"

const { mapGetters } = createNamespacedHelpers("Message")
const userStore = createNamespacedHelpers("User")

export default {
    components: {
        [Badge.name]: Badge,
        [Tabbar.name]: Tabbar,
        [TabItem.name]: TabItem
    },

    props: {
        currentItem: {
            type: String,
            default: "message"
        },
        fixed: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        newMessage () {
            const total = this.getChatList().map(id => {
                const ref = this.getChatItem(id)
                const messages = ref.messages
                if (!messages) return 0
                return messages.filter(item => Number(item.to_id) === this.info.id && item.is_read === 0).length
            }).reduce((prev, next) => prev + next, 0)
            return total > 99 ? "99+" : total
        },
        ...mapGetters([
            "getChatList",
            "getChatItem"
        ]),
        ...userStore.mapState([
            "info"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.tab-wrapper {
    .tab-bar {
        height: 55px;
        background: $color-white;
        @include shadowTop;
    }

    .tab-item {
        &.is-selected {
            background: none;
        }

        &.center {
            position: relative;
            height: 41px;
            padding: 17px 0;
            transform: translateY(-50%);
            border-radius: 50%;
            background: $color-white;
            box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.05);

        }
    }
    .icon-cont {
        position: relative;

        .badge {
            position: absolute;
            right: 0;
            top: 0;
            transform: translate(50%, -20%)
        }
    }

    .iconfont {
        font-size: 24px;
    }
}

</style>
