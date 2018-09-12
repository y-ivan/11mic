<template>
    <Panel title="工作台" :titleOnly="true">
        <div class="notices" v-if="!notices.length">
            <Item>
                <div slot="left">
                    <Avatar slot="left" icon="gongzuotaixiaoxi" color="#fda84b"></Avatar>
                    <span class="dot"></span>
                </div>
                <div class="text">
                    <div class="title">您跟踪的订单有新的状态变更</div>
                    <span class="mate-date mate">2018-09-08</span>
                </div>

                <div class="more" slot="right">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </Item>
        </div>

        <div class="notices"
            v-for="(item, index) in actions"
            :key="index"
        >
            <Item>
                <div slot="left">
                    <Avatar slot="left" icon="caozuotongzhi" color="#41affc"></Avatar>
                    <span class="dot"></span>
                </div>
                <div class="text">
                    <div class="title">{{ item.status + "您跟踪的订单有新的状态变更" }}</div>
                    <span class="mate-date mate">item.date</span>
                </div>

                <div class="more" slot="right">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </Item>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Avatar from "../../components/avatar"
import Item from "../../components/panel/item"

import { createNamespacedHelpers } from "vuex"

const { mapState } = createNamespacedHelpers("WorkPlace")

export default {
    components: {
        Item,
        Panel,
        Avatar
    },
    computed: {
        ...mapState([
            "notices",
            "actions"
        ])
    }
}

</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.notices {
    background: $color-white;
    @include border-bottom;

    .dot {
        position: absolute;
        top: 1px;
        right: 1px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid $color-white;
        background: $color-danger;
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;

        .title {
            color: $color-text;
        }

        .mate-date {
            color: $color-gray;
        }
    }
    .more {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: $font-size-l;
    }
}

</style>
