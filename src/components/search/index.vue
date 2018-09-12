<template>
    <div class="searchbar">
        <div class="searchbar-inner">
            <i class="iconfont icon-sousuo"></i>
            <input
                type="text"
                class="searchbar-core"
                :value="value"
                :placeholder="placeholder"
                @focus="$emit('focus', $event)"
                @input="$emit('input', $event.target.value)"
                ref="search"
            >
        </div>

        <div v-if="showAction" class="searchbar-action" @click="$emit('action', $event)">
            <slot name="action">
                <mt-button class="button" size="small">{{ actionText }}</mt-button>
            </slot>
        </div>
    </div>
</template>

<script>

import { Button } from "mint-ui"

export default {
    components: {
        [Button.name]: Button
    },

    props: {
        value: "",

        actionText: {
            type: String,
            default: "搜索"
        },
        placeholder: {
            type: String,
            default: "搜索"
        },
        show: {
            type: Boolean,
            default: true
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        showAction: {
            type: Boolean,
            default: true
        }

    },
    created () {
        this.autofocus && this.autofocusHandle()
    },
    methods: {
        autofocusHandle () {
            this.$nextTick(() => this.$refs.search.focus())
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.searchbar {
    padding: 5px 15px;
    background: $color-white;
    @include border-bottom;
    @include flexCenter;

    .searchbar-inner {
        flex: 1;
        border-radius: 3px;
        padding: 7px 14px;
        background: $color-bg;
        color: $color-text;
        @include flexCenter;

        .searchbar-core {
            margin-left: 5px;
            border: 0;
            box-sizing: border-box;
            -webkit-appearance: none;
            width: 100%;
            height: 20px;
            outline: 0;
            background: transparent;
        }
    }

    .searchbar-action {
        margin-left: 10px;

        .button {
            background-color: transparent;
            border: 0;
            box-shadow: none;
            color: inherit;
            display: inline-block;
            padding: 3px 5px;
            font-size: inherit;

            &:active::after {
                opacity: 0.1;
            }
        }
    }
}

</style>
