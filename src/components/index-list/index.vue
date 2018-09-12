<template>
    <div class="index">
        <scroll ref="scroll"
            :listenScroll="true"
            :probeType="3"
            :fill="true"
            @scroll="scrollHandle">
            <div class="contact">

                <slot name="top"></slot>

                <div style="contact-list" ref="list">
                    <div
                        class="section" v-for="(refs, key) in list"
                        :key="key"
                        :ref="key"
                    >
                        <slot name="title" :props="key">
                            <div class="section-title">{{ key }}</div>
                        </slot>

                        <div
                            v-for="(ref, idx) in refs"
                            :key="idx"
                        >
                            <slot name="cell" :items="ref">
                                <mt-cell
                                    :title="ref.name"
                                    @click.native="$emit('itemClickHandle', ref)"
                                >
                                    <Avatar slot="icon" :size="35" :src="ref.avatar" :text="ref.name" />
                                </mt-cell>
                            </slot>

                        </div>

                    </div>

                    <slot name="bottom"></slot>

                </div>
            </div>
        </scroll>

        <IndexList :index="currentIndex" :list="list" @indexAction="indexActionHandle" />
    </div>
</template>

<script>

import scroll from "../../base/scroll/scroll"
import Avatar from "../../components/avatar"
import IndexList from "../../components/index-list/list"
import {
    Cell
} from "mint-ui"

export default {
    props: {
        list: {
            required: true,
            type: Object
        }
    },
    data () {
        return {
            currentIndex: ""
        }
    },
    components: {
        Avatar,
        scroll,
        IndexList,
        [Cell.name]: Cell
    },
    computed: {
        keys () {
            return Object.keys(this.list).sort()
        }
    },
    methods: {
        indexActionHandle (index) {
            this.$nextTick(() =>
                this.$refs.scroll.scrollToElement(
                    this.$refs[index][0],
                    300
                )
            )

            this.currentIndex = index
        },
        scrollHandle (pos) {
            const list = Object.keys(this.list)

            list.forEach((item, idx) => {
                const top = this.$refs[item][0].offsetTop
                const next = list[idx + 1]
                const nextTop = next && this.$refs[next][0].offsetTop

                if (idx === 0 && top + pos.y >= 0) this.currentIndex = ""

                if (top + pos.y <= 0 && nextTop + pos.y > 0) this.currentIndex = item
            })
        }
    }
}
</script>

<style lang="scss">

.mint-cell-wrapper {
    padding: 7px 15px;
    background-origin: border-box;
    font-size: 14px;
}

</style>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.section {
    .section-title {
        padding: 2px 15px;
        font-size: $font-size-m;
        line-height: 16px;
        color: $color-gray;
    }

    .avatar {
        margin-right: 10px;
    }
}

</style>
