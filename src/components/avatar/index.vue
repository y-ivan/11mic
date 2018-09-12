<template>
    <div class="avatar">
        <div class="avatar-core"  :style="{ 'width': size + 'px', 'height': size + 'px', 'background': color, 'fontSize': (size > 40 ? size / 2 * 1 : 16) + 'px'  }">
            <i class="iconfont" :class="'icon-' + icon" v-if="icon"></i>
            <img :src="src" v-else-if="src" width="100%" />
            <span v-else>{{ uppercase }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 40
        },
        icon: {
            type: String
        },
        color: {
            type: String,
            default: "#e6e6e6"
        },
        src: {
            type: String
        },
        text: {
            type: String,
            default: ""
        }

    },
    computed: {
        uppercase () {
            return this.text.charAt(0).toUpperCase()
        }
    }

}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.avatar {
    display: inline-block;
    vertical-align: middle;

    .avatar-core {
        display: inline-block;
        border-radius: 100%;
        @include flexCenter;
        justify-content: center;
        color: $color-white;
        background: $color-gray;
        font-size: $font-size-l;
        overflow: hidden;
    }
}

</style>
