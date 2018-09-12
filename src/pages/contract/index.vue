
<template>
    <Panel title="合同">
        <mt-button slot="right" v-if="!chosen" @click="$router.push({ name: 'contract-create' })">新建</mt-button>

        <Scroll>
            <div class="contract">
                <div class="item"
                    v-for="item in list"
                    :key="item.id"
                    @click="itemClickHandle(item.id)"
                >
                    <div class="left">
                        <!-- <Checkbox class="checkbox" @change="checkItemHandle($event, item.id)" v-if="check"></Checkbox> -->

                        <div>{{ item.contract_name }}</div>
                    </div>

                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
        </Scroll>

        <mt-popup
            class="popup-remark"
            v-model="showContactSelect"
            position="right"
        >
            <ContactSelect
                v-if="showContactSelect"
                @selectedAction="selectedContactHandle"
                :show.sync="showContactSelect"
                :multiple="true"
            >
            </ContactSelect>
        </mt-popup>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Scroll from "../../base/scroll"
import ContactSelect from "../contact/select"

import {
    Popup,
    Button
} from "mint-ui"

import { getContract } from "../../api/contract"

export default {
    components: {
        Panel,
        Scroll,
        ContactSelect,
        [Popup.name]: Popup,
        [Button.name]: Button
    },
    data () {
        return {
            selectedId: null,
            list: [],
            showContactSelect: false
        }
    },
    computed: {
        chosen () {
            return this.$route.query.chosen
        }
    },
    created () {
        getContract().then(res => {
            this.list = res.data
        })
    },
    methods: {
        itemClickHandle (id) {
            if (this.chosen) {
                this.selectedId = id
                this.showContactSelect = true
            } else this.$router.push({ name: "contract-detail", params: { id: id } })
        },

        selectedContactHandle (selected) {
            console.log(selected)
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.contract {
    padding: 10px 0;

    .item {
        padding: 15px 10px;
        height: 30px;
        font-size: $font-size-m;
        @include flexCenter;
        justify-content: space-between;
        background: #fff;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .1);
        margin-bottom: 5px;

        .left {
            flex: 1;
            @include flexCenter;
            .checkbox {
                margin-right: 10px;
            }
        }
    }
}

.popup-remark {
    width: 100%;
    height: 100%;
}
</style>
