<template>
    <div class="chat-item">
        <div class="timestamp">
            <mt-badge size="small" color="rgb(179, 179, 179)">{{ message.created_at  }}</mt-badge>
        </div>

        <div class="chat-message">
            <div class="chat-content">
                <div class="bubble">
                    <!-- <div class="title">{{ message.body }}</div> -->
                    <!-- 文本消息 -->
                    <div class="plain" v-if="message.type === 'text'">{{ message.body }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { Badge } from "mint-ui"

export default {
    props: {
        message: {
            required: true
        }
    },
    components: {
        [Badge.name]: Badge
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.chat-item {
    padding: 0 15px 15px;

    .timestamp {
        margin: 10px;
        text-align: center;
    }

    .chat-message {
        margin-top: 5px;

        .chat-content {
            padding: 15px;
            background: $color-white;
            border-radius: 5px;

            .bubble {
                .title {
                    font-size: $font-size-m;
                    color: $color-text;
                    @include textBreak;
                    margin-bottom: 10px;
                    text-align: center;
                }

                .plain {
                    color: $color-gray;
                    font-size: $font-size-s;
                }
            }
        }
    }

}

</style>
