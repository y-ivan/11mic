
<template>
    <Panel
        title="我的公司"
        :fixed="showActionSheet"
    >
        <mt-button slot="right" @click="openActionSheetHandle">
            邀请
            <!-- <i class="iconfont icon-xinjian"></i> -->
        </mt-button>

        <div class="company">
            <div class="contact"
                v-for="(contact, index) in list"
                :key="index"
            >
                <PanelItem>
                    <div slot="left">
                        <Avatar slot="left" :src="contact.avatar" :text="contact.name"></Avatar>
                    </div>
                    <div class="text">
                        <div class="title">{{ contact.name }}</div>
                        <div class="phone">{{ contact.phone }}</div>
                    </div>
                    <div class="roles" slot="right" v-html="getRoles(contact.role_ids)">

                    </div>
                </PanelItem>
            </div>
        </div>

        <!-- <div slot="fixed">
            <mt-actionsheet
                :actions="actions"
                v-model="showActionSheet">
            </mt-actionsheet>
        </div> -->
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import PanelItem from "../../components/panel/item"
import Avatar from "../../components/avatar"

import {
    Button,
    Actionsheet
} from "mint-ui"

import { positions, positionColors } from "../../common/js/config"
import { getCompanyList } from "../../api/company"

export default {
    components: {
        Panel,
        Avatar,
        PanelItem,
        [Button.name]: Button,
        [Actionsheet.name]: Actionsheet
    },
    data () {
        return {
            list: [],
            showActionSheet: false
            // actionSheets: [{
            //     name: "手机号码邀请员工",
            //     method: (...arg) => {
            //         this.$router.push({ name: "repertory", query: { type: "add", create: this.isCreate || undefined, sellId: this.id } })
            //     }
            // }, {
            //     name: "查看邀请记录",
            //     method: (...arg) => {
            //         this.$router.push({ name: "enquiry-list", query: { export: true } })
            //     }
            // }]
        }
    },
    created () {
        getCompanyList().then(res => {
            this.list = res.data
        })
    },
    methods: {
        getRoles (id) {
            const ids = id.split(",")

            return ids.map(id => {
                return `<span style="border-radius: 50%; padding: 5px; margin-left: 5px; color: #fff; background: ${positionColors[id - 1]}">${positions[id - 1].charAt(0)}</span>`
            }).join("")
        },
        openActionSheetHandle () {
            // this.showActionSheet = true
            this.$router.push({ name: "company-invite" })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.contact {
    background: $color-white;
    @include border-top;
    @include border-bottom;

    .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }

    .text {
        .title {
            font-size: $font-size-m;
        }
        .phone {
            color: $color-gray;
        }

    }
    .roles {
        display: flex;
        align-items: center;
        justify-items: center;
        height: 100%;
    }
}

</style>
