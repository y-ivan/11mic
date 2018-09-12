<template>
    <div class="chat-item">
        <div class="timestamp">
            <mt-badge size="small" color="rgb(179, 179, 179)">{{ message.created_at | timeStampParse }}</mt-badge>
        </div>

        <div class="chat-message"
            :class="{ self: hasSelf(message.from_id) }"
        >
            <Avatar v-if="hasSelf(message.from_id)" :src="selfInfo.avatar" :text="selfInfo.name" />
            <Avatar v-else :src="contactInfo && contactInfo.avatar " :text="message && contactInfo.name || message.email" />
            <div class="chat-content">
                <div class="bubble">
                    <!-- text -->
                    <div class="plain" v-if="message.type === 'text'" v-html="parseBody(message.body)"></div>

                    <!-- image -->
                    <div class="plain" v-if="message.type === 'image'" v-html="parseImage(message.body)"></div>

                    <!-- email -->
                    <div class="plain" v-if="message.type === 'email'" v-html="parseBody(message.body)"></div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { Badge } from "mint-ui"
import Avatar from "../avatar"
import { timeStampMixin } from "../../common/js/mixin"
import { url, image } from "../../common/js/util"

export default {
    mixins: [timeStampMixin],
    props: {
        message: {
            required: true,
            type: Object
        },
        contactInfo: {
            required: true
        },
        selfInfo: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Avatar,
        [Badge.name]: Badge
    },
    methods: {
        hasSelf (id) {
            return id === this.selfInfo.id
        },
        parseImage (body) {
            return `<span class="image"><img src="http://47.99.81.169/${body}" /></span>`
        },
        parseBody (body) {
            const hasUrl = url(body)

            if (hasUrl && hasUrl.length) {
                hasUrl.forEach(item => {
                    const hasImage = image(item)
                    if (hasImage) body = body.replace(item, `<span class="image"><img src="${item}" /></span>`)
                    else body = body.replace(item, `<a href="${item}" target="_blank">${item}</a>`)
                })
            }
            return body
        }
    }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

.chat-content {
    .bubble {
        .plain {
            a {
                margin: 0 5px;
                vertical-align: top;
                color: $color-primary;
            }

            .image {
                font-size: 0px;
                display: inline-block;
                margin: 5px;
                img {
                    vertical-align: top;
                    max-width: 100%;
                }
            }

        }
    }
}

.chat-message.self {
    .plain {
        a {
            color: #72ffff;;
        }
    }
}
</style>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.chat-item {
    padding: 0 15px 15px;

    .timestamp {
        padding: 10px;
        text-align: center;
    }

    .chat-message {
        @include flexCenter;
        align-items: flex-start;

        .avatar {
            margin-right: 15px;
        }

        &.self {
            flex-direction: row-reverse;

            .avatar {
                margin-left: 15px;
                margin-right: 0px;
            }
            .chat-content {
                display: flex;

                flex-direction: row-reverse;

                .bubble {

                    .plain {
                        margin-right: 0px;
                        margin-left: 10px;
                        color: $color-white;
                        background: $color-primary;

                        &::before {
                            left: auto;
                            right: -12px;
                            border-top-color: $color-primary;
                            border-right-width: 20px;
                            border-left-width: 0px;
                        }
                    }
                }
            }
        }

        .chat-content {
            margin-top: 8px;
            flex: 1;

            .bubble {
                position: relative;
                max-width: 60%;
                min-height: 1em;
                display: inline-block;
                vertical-align: top;
                text-align: left;
                font-size: $font-size-s;
                border-radius: 3px;

                .plain {
                    position: relative;
                    margin-right: 10px;
                    border-radius: 3px;
                    padding: 8px;
                    color: $color-text;
                    background: $color-white;
                    @include textBreak;
                    min-height: 14px;
                    min-width: 20px;
                    line-height: 1.5em;

                    &::before {
                        position: absolute;
                        left: -12px;
                        top: 0px;
                        content: "";
                        width: 0px;
                        height: 0px;
                        border: 10px solid transparent;
                        border-left-width: 20px;
                        border-top-color: $color-white;
                    }
                }

            }
        }
    }
}
</style>
