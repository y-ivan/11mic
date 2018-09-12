
<template>
    <Panel
        title="设置"
    >

        <div class="setting">
            <div class="cell-group">
                <mt-cell
                    is-link
                    title="修改密码"
                />
                <mt-cell
                    is-link
                    title="关于我们"
                />
            </div>

            <mt-cell
                title="清除缓存"
                :value="calcCacheMb"
                @click.native="cleanCachHandle"
            />

            <div class="action">
                <mt-button size="large" type="danger" @click="exitHandle">退出登陆</mt-button>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import {
    Cell,
    Button,
    MessageBox
} from "mint-ui"

import storage from "good-storage"

import { sizeof } from "../../common/js/util"

export default {
    components: {
        Panel,
        [Cell.name]: Cell,
        [Button.name]: Button,
        [MessageBox.name]: MessageBox
    },
    data () {
        return {
            storage: {}
        }
    },
    computed: {
        calcCacheByte () {
            const allStorageStr = Object.keys(this.storage).reduce((prev, next) => prev + this.storage[next], "")
            return sizeof(allStorageStr, "utf-16")
        },
        calcCacheMb () {
            const byte = this.calcCacheByte

            if (byte % 1024 < 1024) {
                const kb = byte / 1024
                return kb.toFixed(2) + "K"
            } else {
                const Mb = byte / 1024 / 1024
                return Mb.toFixed(2) + "M"
            }
        }
    },
    methods: {
        exitHandle () {
            storage.remove("api_token")
            storage.remove("lifetime")
            this.$router.replace({ name: "sign-in" })
        },
        cleanCachHandle () {
            MessageBox.confirm("确定执行此操作?").then(action => {
                localStorage.clear()
                this.storage = {}
            })
        }
    },
    created () {
        this.storage = localStorage
    }
}
</script>

<style lang="scss" scoped>

.setting {
    .cell-group {
        padding: 10px 0;
    }

    .action {
        margin: 30px 20px;
    }
}
</style>
