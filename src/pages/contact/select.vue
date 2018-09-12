
<template>
    <Panel
        title="选择联系人"
        :scroll="false"
    >
        <mt-button
            slot="left"
            icon="back"
            @click="hidePopup"
        ></mt-button>
        <mt-button slot="right"
            v-if="multiple && hasSelected"
            @click="selectedActionHandle"
        >
            {{ actionText }}
        </mt-button>

        <div class="contact-select">
            <IndexList
                :list="sortContact(type)"
            >
                <slot name="top" slot="top"></slot>
                <mt-cell
                    slot="cell" slot-scope="props"
                    :title="props.items.name"
                    @click.native="!multiple && selectedActionHandle(props.items)"
                >
                    <Checkbox
                        v-if="multiple"
                        slot="icon"
                        style="display: inline-block; margin-right: 10px;"
                        @change="multipleChoseHandle($event, props.items)"
                    ></Checkbox>
                    <Avatar slot="icon" :size="35" :src="props.items.avatar" :text="props.items.name" />
                </mt-cell>

                <slot name="bottom" slot="bottom"></slot>
            </IndexList>
        </div>

    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Search from "../../components/search"
import Avatar from "../../components/avatar"
import IndexList from "../../components/index-list"
import Checkbox from "../../components/checkbox"
import { createNamespacedHelpers } from "vuex"
import { findIndex } from "../../common/js/util"

import {
    Cell,
    Button
} from "mint-ui"

const { mapGetters, mapActions } = createNamespacedHelpers("Contact")

export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        actionText: {
            default: "选择"
        },
        type: {
            default: "1"
        }
    },
    components: {
        Panel,
        Search,
        Avatar,
        Checkbox,
        IndexList,
        [Cell.name]: Cell,
        [Button.name]: Button
    },
    data () {
        return {
            selected: []
        }
    },
    computed: {
        hasSelected () {
            return this.selected && this.selected.length !== 0
        },
        ...mapGetters([
            "sortContact"
        ])
    },
    created () {
        this.getContact(this.type)
    },
    methods: {
        multipleChoseHandle (bool, info) {
            const idx = findIndex(this.selected, "id", info.id)
            if (bool) idx === -1 && this.selected.push(info)
            else idx !== -1 && this.selected.splice(idx, 1)
        },
        selectedActionHandle (info) {
            if (!this.multiple) this.$emit("selectedAction", info)
            else this.$emit("selectedAction", this.selected)

            this.hidePopup()
        },
        hidePopup () {
            this.selected = []
            this.$emit("update:show", false)
        },
        ...mapActions([
            "getContact"
        ])
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
