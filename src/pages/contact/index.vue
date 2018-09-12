
<template>
    <Panel
        title="通讯录"
        :titleOnly="type === '1'"
        :scroll="false"
        :bottom="55"
        :fixed="showAddPopup"
    >
        <div slot="right" style="font-size: 16px">
            <mt-button
                @click="add1Handle"
            >
                <i class="iconfont icon-tianjialianxiren"
                ></i>
            </mt-button>
        </div>

        <div class="contact">

            <IndexList
                :list="sortContact(type)"
                @itemClickHandle="itemClickHandle"
            >
                <div slot="top">
                    <Search
                        v-if="type === '1'"
                        @focus="searchFocusHandle"
                        :showAction="false"
                    />
                    <mt-cell
                        v-if="type === '1' || type === '4'"
                        title="邮件联系人"
                        :to="{ name: 'contact', params: { type: '4' } }"
                        class="default-cell"
                    >
                        <Avatar slot="icon" :size="35" icon="youxiangzhushou" color="rgb(249, 155, 76)" text="邮件联系人" />
                    </mt-cell>

                    <mt-cell
                        v-if="type === '1' || type=== '2'"
                        title="客户联系人"
                        :to="{ name: 'contact', params: { type: '2' } }"
                        class="default-cell"
                    >
                        <Avatar slot="icon" :size="35" icon="kehu" color="rgb(65, 172, 252)" text="客户联系人" />
                    </mt-cell>

                    <mt-cell
                        v-if="type === '1' || type=== '3'"
                        title="供应商联系人"
                        :to="{ name: 'contact', params: { type: '3' } }"
                        class="default-cell"
                    >
                        <Avatar slot="icon" :size="35" icon="gongyingshanglianxiren" color="rgb(54, 186, 51)" text="供应商联系人" />
                    </mt-cell>
                </div>

            </IndexList>

        </div>

        <div slot="fixed">
            <mt-popup
                class="popup-remark"
                v-model="showAddPopup"
                position="right"
            >
                <Add :show.sync="showAddPopup" v-if="!type!== '1'"/>
            </mt-popup>
        </div>

    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Search from "../../components/search"
import Avatar from "../../components/avatar"
import IndexList from "../../components/index-list"
import Add from "../../pages/contact/add"

import { createNamespacedHelpers } from "vuex"
import {
    Cell,
    Popup,
    Button
} from "mint-ui"

const { mapGetters, mapActions } = createNamespacedHelpers("Contact")

export default {
    components: {
        Add,
        Panel,
        Avatar,
        Search,
        IndexList,
        [Cell.name]: Cell,
        [Popup.name]: Popup,
        [Button.name]: Button
    },

    data () {
        return {
            showAddPopup: false
        }
    },
    computed: {
        type () {
            return this.$route.params.type || "1"
        },
        ...mapGetters([
            "sortContact"
        ])
    },
    created () {
        this.getContact(this.type)
    },
    watch: {
        $route (to, from) {
            if (from.name === "contact" && from.params.type !== this.type) this.getContact(this.type)
        }
    },
    methods: {
        searchFocusHandle () {

        },
        add1Handle () {
            this.showAddPopup = true
        },
        itemClickHandle (ref) {
            this.$router.push({ name: "contact-detail", params: { id: ref.id, type: this.type } })
        },
        ...mapActions([
            "getContact"
        ])
    }
}
</script>

<style lang="scss">
.contact {
    .mint-cell-wrapper {
        padding: 7px 15px;
        background-origin: border-box;
        font-size: 14px;
    }
}

</style>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.contact {

    .default-cell {
        .avatar {
            margin-right: 5px;
        }
    }

}
.popup-remark {
    width: 100%;
    height: 100%;
}

</style>
