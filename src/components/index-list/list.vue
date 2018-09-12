<template>
    <div class="index-list">
        <div class="index-action">
            <span
                v-for="(item, idx) in indexes"
                :key="idx"
                :class="{ current: item === index  }"
                @click="$emit('indexAction', item)"
            >{{ item }}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        index: {
            type: String,
            default: "A"
        },
        list: {
            type: Object,
            required: true
        }
    },

    computed: {
        indexes () {
            return Object.keys(this.list)
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.index-list {
    .index-action {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        z-index: 1;
        padding: 10px 0;
        border-radius: 10px;
        background: $color-border;
        opacity: .5;

        span {
            width: 16px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            color: $color-gray;

            &.current {
                border-radius: 50%;
                background: $color-primary;
                color: $color-white;
            }
        }
    }
}
</style>
