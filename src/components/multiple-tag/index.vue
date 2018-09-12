
<template>
    <div class="multiple-field">
        <div class="tag-core">
            <scroll
                direction="horizontal"
            >
                <div class="item-wrap">
                    <div class="item"
                        v-for="(item, index) in selected"
                        :key="index"
                    >
                        <slot>
                            <span :style="{ 'background': color ?  typeof color === 'string' ? color : color[item.id] : '#7f7f7f' }">{{ item.text }}</span>
                            <i class="iconfont icon-jianququanxian" @click="deleteHandle(item.id)"></i>
                        </slot>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="tag-action">
            <i class="iconfont icon-gengduoxinxi" @click="addHandle"></i>
        </div>
    </div>
</template>

<script>

import scroll from "../../base/scroll/scroll"

export default {
    props: {
        selected: {
            default: () => []
        },
        color: null
    },
    components: {
        scroll
    },
    methods: {
        deleteHandle (id) {
            this.$emit("delete", id)
        },
        addHandle () {
            this.$emit("action")
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.multiple-field {
    @include flexCenter;
    height: 48px;
    align-items: stretch;
    padding: 0 15px;
    background: $color-white;

    .tag-core {
        flex: 1;
        position: relative;
        margin-right: 10px;
        overflow: hidden;

        .scroll-wrapper {
            display: flex;
        }

        .item-wrap {
            flex: 1;
            @include flexCenter;
            height: 48px;
            align-items: stretch;

            .item {
                flex: auto;
                @include flexCenter;

                &:not(:first-child) {
                    margin-left: 10px;
                }

                span {
                    white-space: nowrap;
                    flex: 1;
                    margin-right: 3px;
                    padding: 3px 5px;
                    border-radius: 5px;
                    color: $color-white;
                }

                .iconfont {
                    color: $color-gray;
                }
            }
        }
    }

    .tag-action {
        display: flex;
        align-items: center;
        justify-items: center;
        font-size: 20px;
    }
}

</style>
