
<template>
    <Panel
        title="个人头像"
        :fixed="showActionSheet"
        :scroll="false"
    >
        <mt-button slot="right" @click="moreHandle">
            <i class="iconfont icon-more"></i>
        </mt-button>

        <div class="avatar" :class="{ full: fullScreen }"
        >
            <scroll
                :freeScroll="true"
                v-if="fullScreen"
                :zoom="true"
                :dblclick="true"
                bounce="{ bottom: false, left: false, right: false, top: false }"
            >
                <div :style="style">
                    <img @click="toggleHandle" ref="img" :src="info.avatar" v-if="info.avatar" />
                    <i class="iconfont icon-morentupian" v-else ></i>
                </div>
            </scroll>

            <div class="avatar-wrap"
                v-else
            >
                <img @click="toggleHandle" :src="info.avatar" v-if="info.avatar" />
                <i class="iconfont icon-morentupian" v-else ></i>
            </div>
        </div>

        <input type="file" hidden ref="file" @change="fileChangeHandle">

        <mt-actionsheet
            :actions="actionSheets"
            v-model="showActionSheet"
            cancelText=""
            slot="fixed"
        >
        </mt-actionsheet>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import scroll from "../../base/scroll/scroll"
import { createNamespacedHelpers } from "vuex"

import {
    Button,
    Actionsheet
} from "mint-ui"
import { upload } from "../../api/upload"
import { setUser } from "../../api/user"

const { mapState, mapActions } = createNamespacedHelpers("User")

export default {
    components: {
        Panel,
        scroll,
        [Button.name]: Button,
        [Actionsheet.name]: Actionsheet
    },
    data () {
        return {
            actionSheets: [{
                name: "修改头像",
                method: (...arg) => {
                    var file = this.$refs.file
                    file.click()
                }
            }, {
                name: "保存图片",
                method: (...arg) => {
                }
            }],
            fullScreen: false,
            showActionSheet: false,
            style: {}
        }
    },
    computed: {
        ...mapState([
            "info"
        ])
    },
    watch: {
        fullScreen (bool) {
            if (!bool) return false

            this.$nextTick(() => {
                this.style = {
                    width: this.$refs.img.clientWidth + "px",
                    height: this.$refs.img.clientHeight + "px"
                }
            })
        }
    },
    methods: {
        moreHandle () {
            this.showActionSheet = true
        },
        toggleHandle () {
            this.fullScreen = !this.fullScreen
        },
        fileChangeHandle (e) {
            let files = event.target.files || event.dataTransfer.files

            if (!files.length) return false

            upload("file", files[0]).then(res => {
                setUser(this.info.id, {
                    avatar: res.data
                }).then(res => {
                    this.getUserInfo()
                })
            })
        },
        ...mapActions([
            "getUserInfo"
        ])
    }
}

</script>

<style lang="scss">

.avatar {
    &.full {
        .scroll-content {
            display: inline-block;
            min-width: 100%;
        }
    }

}

</style>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.avatar {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    height: 0px;
    padding-bottom: 100%;
    transform: translateY(-50%);
    text-align: center;
    overflow: hidden;
    transition: all .5s;

    &.full {
        top: 0;
        bottom: 0;
        padding: 0;
        transform: translateY(0);
        height: 100%;

        img {
            display: block;
        }
    }

    .avatar-wrap {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .iconfont {
        font-size: 100vw;
        color: $color-gray;
        opacity: .3;
    }

}

</style>
