
<template>
    <Panel
        title="我的管理"
        :bottom="55"
        :titleOnly="true"
    >
        <ul class="manage">
            <li
                class="classify-list"
                v-for="(ref, key) in manage"
                v-if="permissions(key)"
                :key="key"
            >
                <div class="title"><span>{{ key | title }}</span></div>

                <ul class="classify-item">
                    <li class="item"
                        v-for="(item, index) in ref"
                        :key="index"
                        @click="itemHandle"
                    >
                        <div class="grid">
                            <div class="icon-wrap">
                                <div class="icon">
                                    <i :class="'iconfont icon-'+ item.name" :style="'color:' + item.color "></i>
                                </div>
                            </div>

                            <span>{{ item.text }}</span>

                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import { manage } from "../../common/js/config"

import { createNamespacedHelpers } from "vuex"

const { mapState } = createNamespacedHelpers("User")
const IndicatorStore = createNamespacedHelpers("Indicator")

export default {
    components: {
        Panel
    },
    data () {
        return {
            manage: manage
        }
    },
    computed: {
        ...mapState([
            "info"
        ])
    },
    filters: {
        title (id) {
            let text = ""
            switch (id) {
            case "0":
                text = "其他管理"
                break
            case "1":
                text = "销售管理"
                break
            case "2":
                text = "采购管理"
                break
            case "3":
                text = "财务管理"
                break
            case "4":
                text = "仓库管理"
                break
            case "5":
                text = "管理员"
                break
            default:
                text = "其他管理"
                break
            }
            return text
        }
    },
    methods: {
        permissions (idx) {
            return true
            // if (!this.info.role_ids) return false

            // const ids = this.info.role_ids.split(",")
            // return ids.find(item => item === idx)
        },
        itemHandle () {
            this.toggleToast({ show: true, message: "业务模块暂不开放" })
        },
        ...IndicatorStore.mapMutations([
            "toggleToast"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

// .manage {
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 55px;
//     top: 0;

//     .list {
//         padding: 45px;
//         margin: auto;
//         width: 225px;
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: space-between;
//         .list-item {
//             margin-top: 25px;
//             flex: 0 0 auto;
//             width: 100px;
//             height: 100px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             background: $color-white;
//             border-radius: 10px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             font-size: $font-size-l;

//             .iconfont {
//                 font-size: 30px;
//                 margin-bottom: 12px;

//                 &.icon-baojia {
//                     color: $color-primary;
//                 }

//                 &.icon-hetong {
//                     color: $color-success;
//                 }

//                 &.icon-cangku {
//                     color: $color-danger;
//                 }

//                 &.icon-xiaoshoudingdan {
//                     color: $color-worning;
//                 }
//             }
//         }
//     }
// }

.manage {
    padding: 20px 15px;
    background: $color-white;

    .classify-list {
        .title {
            display: flex;
            position: relative;
            height: 20px;
            line-height: 20px;
            font-size: $font-size-m;
            color: lighten($color-gray, 20%);
            align-items: center;

            &::after {
                flex: auto;
                margin-left: 10px;
                content: "";
                height: 0px;
                border-top: 1px solid lighten($color-gray, 40%);
            }
        }

        .classify-item {
            display: flex;
            align-items: center;
            padding: 0px 10px 20px;
            flex-wrap: wrap;

            .item {
                flex: 0 0 25%;
                margin-top: 10px;
                box-sizing: border-box;
                text-align: center;
                color: $color-gray;

                .grid {
                    margin: 0 8px;

                    .icon-wrap {
                        position: relative;
                        padding-bottom: 100%;
                        background: $color-white;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                        margin-bottom: 8px;

                        .icon {
                            @include fullScreen;
                            position: absolute;
                            display: flex;
                            align-items: center;
                            text-align: center;
                            justify-content: center;

                            .iconfont {
                                font-size: 34px;
                            }
                        }
                    }
                }

            }
        }
    }
}

</style>
