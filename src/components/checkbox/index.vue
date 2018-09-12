
<template>
    <div class="checkbox" :class="{ 'disabled': disabled }">
        <span class="checkbox-core" :class="{ 'checked': checked }" @click="toggleHandle">
            <i class="iconfont icon-zhengque"></i>
        </span>
        <span v-if="$slots.default" class="checkbox-label" @click="toggleHandle">
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    props: {
        name: null,
        value: {
            type: Boolean,
            defatul: false
        },
        disabled: Boolean
    },
    data () {
        return {
            checked: this.value
        }
    },
    watch: {
        checked (val) {
            this.$emit("change", val)
            this.$emit("input", val)
        }
    },

    methods: {
        toggleHandle (target) {
            if (!this.disabled) {
                this.checked = !this.checked
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.checkbox {
    .checkbox-core {
        display: inline-block;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid $color-gray;

        overflow: hidden;
        .iconfont {
            display: none;
            font-size: 20px;
            color: $color-success;
        }
        &.checked {
            border: none;
            .iconfont {
                display: inline-block;
            }
        }
    }
}
</style>
