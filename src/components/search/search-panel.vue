<template>
    <div class="search-panel">
        <Search
            :value="searchValue"
            @input="$emit('update:searchValue', $event)"
            :action-text="actionText"
            @action="actionHandle"
            :autofocus="autofocus"
        />
        <div class="search-result">
            <Scroll>
                <div class="search-result-wrapper">
                    <div
                        v-for="(item, idx) in result"
                        :key="idx"
                    >
                        <slot :item="item">
                            <mt-cell
                                :title="item+'ivan'"
                            >

                            </mt-cell>
                        </slot>
                    </div>

                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>

import Search from "./"
import Scroll from "../../base/scroll"
import { Cell } from "mint-ui"

export default {
    components: {
        Search,
        Scroll,
        [Cell.name]: Cell
    },

    props: {
        searchValue: {
            required: true,
            type: [String, Number],
            default: ""
        },
        result: {
            type: Array,
            default: () => []
        },
        actionText: {
            type: String,
            default: "搜索"
        },
        autofocus: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
        }
    },
    methods: {
        actionHandle (e) {
            this.$emit("action", e)
        }
    }

}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.search-panel {
    @include fullScreen;
    position: absolute;
    background: $color-white;
    z-index: 1;

    .search-result {
        position: relative;
        width: 100%;
        height: calc(100% - 44px);
    }
}

</style>
