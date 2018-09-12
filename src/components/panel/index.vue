
<template>

    <div class="panel full-panel">

        <div class="main-panel" :style="{ bottom: bottom + 'px' }">
            <div class="top">
                <div class="header">
                    <mt-header :title="title">
                        <slot v-if="!titleOnly" name="left" slot="left">
                            <mt-button
                                icon="back"
                                @click="backHandle"
                            />
                        </slot>

                        <slot v-if="!titleOnly" name="right" slot="right"></slot>
                    </mt-header>
                </div>
                <!-- slot outside of scroll -->
                <slot name="top"></slot>
            </div>
            <div class="middle">
                <div class="content" v-if="scroll">
                    <scroll
                        ref="scroll"
                        :data="data"
                        :scrollbar="scrollbar"
                        :startY="startY"
                        :pullDownRefresh="pullDownRefresh"
                        :pullUpLoad="pullUpLoad"
                        :click="click"
                        :eventPassthrough="eventPassthrough"
                        :direction="direction"
                        @pullingDown="pullingDownHandle"
                        @pullingUp="pullingUpHandle"
                    >
                        <slot></slot>
                    </scroll>
                </div>
                <div class="content" v-else>
                    <slot></slot>
                </div>

                <slot name="fixed-middle"></slot>
            </div>
            <div class="bottom">
                <!-- slot outside of scroll -->
                <slot name="bottom"></slot>
            </div>
        </div>

        <div v-if="fixed" class="fixed-panel">
            <slot name="fixed"></slot>
        </div>
    </div>

</template>

<script>

import scroll from "../../base/scroll/scroll"
import {
    Header,
    Button
} from "mint-ui"

export default {

    components: {
        scroll,
        [Header.name]: Header,
        [Button.name]: Button
    },

    props: {
        bottom: {
            type: Number,
            default: 0
        },
        fixed: {
            type: Boolean,
            default: false
        },
        title: {
            required: true,
            type: String
        },
        titleOnly: {
            type: Boolean,
            default: false
        },
        click: {
            type: Boolean,
            default: true
        },
        scroll: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: () => []
        },
        scrollbar: {
            type: null,
            default: false
        },
        startY: {
            type: null,
            default: 0
        },
        eventPassthrough: {
            default: ""
        },
        direction: {
            default: "vertical"
        },
        pullDownRefresh: {
            type: null,
            default: false
            // {
            //     threshold: 70,
            //     stop: 40
            // }
        },
        pullUpLoad: {
            type: null,
            default: false
            // {
            //     threshold: 0,
            //     moreTxt: "加载更多",
            //     noMoreTxt: "没有更多数据了"
            // }
        }
    },
    created () {
        document.title = this.title
    },
    activated () {
        document.title = this.title
    },
    methods: {
        backHandle () {
            this.$router.back()
        },
        // 下拉刷新
        pullingDownHandle (...arg) {
            this.$emit("pullingDown", ...arg)
        },

        // 上拉加载
        pullingUpHandle (...arg) {
            this.$emit("pullingUp", ...arg)
        }
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

    .main-panel {
        @include fullScreen;
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        max-height: 100%;

        .middle {
            position: relative;
            width: 100%;
            flex: auto;

            .content {
                width: 100%;
                @include fullScreen;
                position: absolute;
            }
        }

        .top, .bottom {
            position: relative;
            width: 100%;
        }
    }
    .fixed-panel {
        // @include fullScreen;
        z-index: 1;
    }
}

</style>
