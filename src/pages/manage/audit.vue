
<template>
    <Panel title="审批">

        <div>
            <mt-navbar v-model="type" slot="top">
                <mt-tab-item id="0">报价审批</mt-tab-item>
                <mt-tab-item id="1">销售订单审批</mt-tab-item>
            </mt-navbar>
            <div class="order">
                <ul class="order-list">
                    <li class="order-item"
                        v-for="(ref, idx) in list"
                        :key="idx"
                    >
                        <section class="section">
                            <div class="title">订单号: {{ ref.sell_number || ref.sell_order_number }}</div>
                            <a href="/" class="accessory" v-if="ref.contract_id"><i class="iconfont icon-fujian"></i> 合同附件</a>
                        </section>
                        <section class="section">
                            <div class="client">客户: {{ ref.cuser && ref.cuser.name }}</div>
                            <span class="date">{{ ref.created_at }}</span>
                        </section>

                        <section class="section operator">
                            <span class="detail-action"
                                @click="$router.push({ name: type === '0' && 'audit-quote-detail' || 'audit-sales-detail' , params: { id: ref.id }, query: { unenforceable: true } })"
                            >订单详情 <i class="iconfont icon-gengduo"></i></span>
                            <span class="total" v-if="type === '0'">付款方式: {{ ref.pay_mode || "全款" }}</span>
                            <span class="total" v-else>金额: {{ ref.price }}</span>

                        </section>

                        <div class="action">
                            <mt-button type="danger" v-if="ref.is_pass != '2'" :disabled="ref.is_pass == '3'" size="small" @click="modifyHandle(ref.id)">{{ ref.is_pass == "3" && "修改中" || "修改" }}</mt-button>
                            <mt-button type="primary" :disabled="ref.is_pass == '2'" size="small" @click="passHandle(ref.id)">{{ ref.is_pass == "2" && "已通过" || "通过" }}</mt-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"

import { getQuiteList, getSalesList, quotePass, salesPass } from "../../api/audit"

import {
    Button,
    Navbar,
    TabItem
} from "mint-ui"

export default {
    components: {
        Panel,
        [Button.name]: Button,
        [Navbar.name]: Navbar,
        [TabItem.name]: TabItem
    },
    data () {
        return {
            list: [],
            type: "0"
        }
    },

    watch: {
        type (type) {
            if (type === undefined) return false

            this.$router.replace({ name: "audit", query: { type: type } })
            this.getData()
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            this.list = []

            if (this.type === "0") {
                getQuiteList().then(res => {
                    this.list = res.data
                })
            } else {
                getSalesList().then(res => {
                    this.list = res.data
                })
            }
        },
        passHandle (id) {
            const api = this.type === "0" ? quotePass : salesPass

            api({ id: id }).then(() => {
                this.getData()
            })
        },

        modifyHandle (id) {
            this.$route.meta.keepAlive = true
            this.$router.push({ name: "audit-comment", params: { id: id }, query: { type: this.type } })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.order {

    .order-list {
        padding: 15px;

        .order-item {
            position: relative;
            padding: 15px 15px 0;
            display: flex;
            margin-bottom: 10px;
            min-height: 150px;
            flex-wrap: wrap;
            background: $color-white;
            align-items: flex-start;
            box-shadow: 0px 0px 10px 0px rgba(0 , 0, 0, .15);

            .meta-icon {
                position: absolute;
                right: 0;
                top: 0;
                box-sizing: border-box;
                width: 20px;
                height: 20px;
                border: 0px solid transparent;
                border-top: 20px solid $color-worning;
                border-left-width: 20px;
                color: $color-white;
                span {
                    position: absolute;
                    display: block;
                    right: 0;
                    top: -20px;
                    left: -16px;
                    width: 16px;
                    text-align: right;
                }
            }

            .section {
                width: 100%;
                @include flexCenter;
                justify-content: space-between;
                &.operator {
                    align-self: flex-end;
                }

                .title {
                    font-size: $font-size-m;
                }

                .client, .date, .detail-action {
                    color: $color-gray;
                }

                .accessory {
                    .iconfont {
                        font-size: $font-size-l;
                        color: $color-primary;
                    }
                }
            }

            .action {
                padding: 10px;
                width: 100%;
                align-self: flex-end;
                border-top: 1px solid $color-border;
                text-align: right;
            }
        }

    }
}

</style>
