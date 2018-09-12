<template>
    <Panel
        title="我的"
        :bottom="55"
    >
        <div slot="left"></div>
        <mt-button slot="right" @click="$router.push({ name: 'setting' })">
            <i class="iconfont icon-shezhi"></i>
        </mt-button>

        <div class="mine">
            <div class="card-wrap">
                <div class="card"
                    @click="openProfileHandle"
                >
                    <div class="shadow"></div>
                    <div class="avatar-wrap">
                         <div class="avatar-circle"></div>
                    </div>
                    <Avatar :size="70" :src="info.avatar" :text="info.name" />

                    <div class="info-content">
                        <div class="title user-name">{{ info.name }}</div>
                        <div class="meta meta-job" v-if="info.role_ids">职位:
                            <div>
                                <span
                                    v-for="(item, index) in info.role_ids.split(',')"
                                    :key="index"
                                    :style="{ 'background': colors[item - 1] }"
                                >
                                    {{ positions[item - 1] }}
                                </span>
                            </div>
                        </div>
                        <div class="meta meta-phone">手机号: {{ info.phone }}</div>
                    </div>
                </div>
            </div>

            <div class="entry">
                <mt-cell
                    icon="icon-wodejixiao"
                    title="我的绩效"
                    is-link
                >
                    <i slot="icon" class="iconfont icon-wodejixiao" style="color: rgb(154, 209, 143)"></i>
                </mt-cell>
                <mt-cell
                    icon="icon-wodejixiao"
                    title="企业入驻"
                    is-link
                    :to="{ name: 'sign-up-company' }"
                    v-if="info.company_id === 0"
                >
                    <i slot="icon" class="iconfont icon-wodejixiao" style="color: rgb(154, 209, 143)"></i>
                </mt-cell>

                <mt-cell
                    icon="icon-wodejixiao"
                    title="我的公司"
                    is-link
                    :to="{ name: 'company' }"
                    v-if="info.company_id !== 0 &&  info.role_ids && info.role_ids.indexOf('1') !== -1"
                >
                    <i slot="icon" class="iconfont icon-wodejixiao" style="color: rgb(154, 209, 143)"></i>
                </mt-cell>

                <mt-cell
                    icon="icon-wodejixiao"
                    title="加入公司"
                    is-link
                    :to="{ name: 'company-join' }"
                    v-else-if="info.company_id === 0"
                >
                    <i slot="icon" class="iconfont icon-wodejixiao" style="color: rgb(154, 209, 143)"></i>
                </mt-cell>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Avatar from "../../components/avatar"
import { Cell, Button } from "mint-ui"
import { positions, positionColors } from "../../common/js/config"
import { createNamespacedHelpers } from "vuex"

const { mapState } = createNamespacedHelpers("User")

export default {
    components: {
        Panel,
        Avatar,
        [Cell.name]: Cell,
        [Button.name]: Button
    },
    data () {
        return {
            positions: positions,
            colors: positionColors
        }
    },
    computed: {
        ...mapState([
            "info"
        ])
    },
    methods: {
        openProfileHandle () {
            this.$router.push({ name: "profile" })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.mine {
    .card-wrap {
        padding: 45px 15px 20px;
        background: $color-white;
        .card {
            position: relative;
            min-height: 120px;
            width: 100%;
            padding: 15px 15px 15px 110px;
            box-shadow: 0px 0px 10px 2px rgba(38, 162, 255, .1);
            border-radius: 5px;
            box-sizing: border-box;

            .avatar-wrap {
                position: absolute;
                width: 90px;
                height: 45px;
                left: 20px;
                top: 0px;
                overflow: hidden;
                .avatar-circle {
                    position: absolute;
                    left: 0px;
                    top: -45px;
                    width: 90px;
                    height: 90px;
                    border-bottom-left-radius: 100%;
                    border-bottom-right-radius: 100%;
                    box-shadow: 0px 0px 10px 2px rgba(38, 162, 255, .1) inset;
                }
            }
            .avatar {
                position: absolute;
                left: 30px;
                top: -35px;
                font-size: 32px;
            }
            .shadow {
                width: 80px;
                height: 10px;
                background: $color-white;
                position: absolute;
                left: 25px;
                top: -10px;
            }

            .info-content {
                padding-left: 20px;

                .title {
                    padding-bottom: 5px;
                    font-size: $font-size-m;
                }

                .meta {
                    display: flex;
                    position: relative;
                    padding: 5px 0;
                    margin-top: 10px;
                    color: $color-gray;

                    &:before {
                        content: "";
                        position: absolute;
                        left: -15px;
                        top: 5px;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background: $color-primary;
                        border: 3px solid lighten($color-primary, 10%);
                    }

                    &.meta-job {
                        div {
                            margin-top: -8px;
                            flex: 1;
                            display: flex;
                            flex-wrap: wrap;
                        }
                        span {
                            margin-left: 5px;
                            margin-top: 5px;
                            padding: 3px 5px;
                            color: $color-white;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }

    .entry {
        padding: 10px 0;
    }
}
</style>
