<template>
    <div class="char-action-bar">
        <div class="voice-action action-item">
            <i class="iconfont icon-shurufayuyin"></i>
        </div>

        <div class="text-area">
            <textarea
                ref="core"
                class="core"
                :rows="rows"
                v-model="content"
                @keydown.enter="sendMessageHandle"
            ></textarea>
        </div>
        <div class="image-action action-item">
            <i class="iconfont icon-tupian"></i>
            <input type="file" accept="image/*" @change="fileChangeHandle">
        </div>
        <div class="more-action action-item">
            <i class="iconfont icon-gengduoxinxi"></i>
        </div>
    </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex"
import { account } from "../../common/js/cache/account-cache"
import { send } from "../../common/js/socket"
import { uuid } from "../../common/js/util"
import { upload } from "../../api/upload"
import { sendMail } from "../../api/message"

const { mapMutations } = createNamespacedHelpers("Message")

export default {
    props: {
        messages: {
            required: true
        }
    },
    data () {
        return {
            content: "",
            row: 1,
            scrollHeight: 0

        }
    },
    computed: {
        rows () {
            return this.row >= 3 ? 3 : this.row
        }
    },
    created () {
        this.$nextTick(() => {
            this.$refs.core.onscroll = (e) => {
                const scrollH = e.target.scrollHeight
                if (scrollH > this.scrollHeight) this.row++
                if (scrollH < this.scrollHeight) this.row--
                this.scrollHeight = scrollH
            }
        })
    },
    watch: {
        content (value) {
            if (value === "") {
                this.row = 1
                this.scrollHeight = 0
            }
        },
        row () {
            this.$emit("reScrollFollow")
        }
    },
    methods: {
        fileChangeHandle (e) {
            const files = e.target.files || e.dataTransfer.files

            upload("file", files[0]).then(res => {
                const src = res.data
                this.sendMessageHandle(e, {type: "image", body: src})
            })
        },
        sendMessageHandle (e, { type = "text", body = this.content } = {}) {
            e.preventDefault()
            e.target.blur()

            const user = account()
            const email = this.$route.name === "chat-email"
            const msgId = uuid(10, 16)

            const msg = {
                type: email ? "email" : type,
                body: body,
                from_id: user.id,
                to_id: this.messages.info ? this.messages.info.id : 0,
                created_at: parseInt(new Date().getTime() / 1000),
                msg_id: msgId,
                email: email ? ((this.messages.info && this.messages.info.email) || (this.messages.messages[0] && this.messages.messages[0].email)) : undefined
            }

            let info = {}

            if (email) info = { name: "邮箱助手", id: -2 }

            const chat = Object.assign({}, email ? { info } : this.messages, {
                messages: [msg]
            })

            if (email) {
                sendMail((this.messages.info && this.messages.info.email) || (this.messages.messages[0] && this.messages.messages[0].email), msg).then(res => {
                    send && send(msg)
                    this.pushMessage({ id: "-2", chat })
                })
            } else {
                send && send(msg)
                this.pushMessage({ id: this.messages.info.id, chat })
            }
            if (this.row === 1) {
                this.$emit("reScrollFollow")
            }
            this.content = ""
        },
        ...mapMutations([
            "pushMessage"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.char-action-bar {
    // height: 50px;
    padding: 7px 15px;
    display: flex;
    align-items: flex-end;
    height: 100%;
    box-sizing: border-box;

    .action-item {
        position: relative;
        color: $color-gray;
        margin-right: 14px;
        font-size: 24px;
        margin-bottom: 6px;

        &:active {
            color: $color-primary;
        }
        &:last-child {
            margin-right: 0px;
        }

        &.image-action {
            input {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
            }
        }
    }

    .text-area {
        // position: relative;
        // height: 36px;
        flex: 1;
        margin-right: 14px;

        .core {
            // position: absolute;
            width: 100%;
            left: 0;
            bottom: 0px;
            padding: 6px 5px;
            line-height: 22px;
            border-radius: 3px;
            resize: none;
            outline: none;
            border: 1px solid $color-gray;
            box-sizing: border-box;
            vertical-align: top;
        }
    }
}
</style>
