
<template>
    <div class="panel full-panel">
        <div class="header">
            <mt-header :title="title">
                <slot v-if="!titleOnly" name="left" slot="left"></slot>

                <slot v-if="!titleOnly" name="right" slot="right"></slot>
            </mt-header>
        </div>

        <div class="inner-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script>

import {
    Header,
    Button
} from "mint-ui"
// import Scroll from "../../base/scroll"

export default {

    components: {
        // Scroll,
        [Header.name]: Header,
        [Button.name]: Button
    },

    props: {
        title: {
            required: true,
            type: String
        },
        titleOnly: {
            type: Boolean,
            default: false
        }
    },
    created () {
        document.title = this.title
    },
    activated () {
        document.title = this.title
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.panel {
    background: $color-bg;
    font-size: $font-size-s;

    &.full-panel {
        @include fullScreen;
    }

    .inner-panel {
        @include fullScreen;
        position: absolute;
        top: 40px;
    }
}

</style>
