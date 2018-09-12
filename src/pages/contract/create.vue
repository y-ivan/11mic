
<template>
    <Panel title="模版上传">
        <mt-button slot="right" @click="saveHandle">保存</mt-button>

        <div class="upload">
            <div class="title">
                <span class="label"></span>
                <mt-field
                    v-model="name"
                    label="模版名称"
                    placeholder="请输入模版名称"
                ></mt-field>
            </div>

            <div class="upload-action">
                <div class="icon"><i class="iconfont icon-shangchuan"></i></div>
                <span>上传模版</span>
                <input class="file" type="file" ref="file"
                    @change="fileChangeHandle"
                >
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"

import {
    Field,
    Button
} from "mint-ui"

import { upload } from "../../api/upload"
import { createContract } from "../../api/contract"
import { createNamespacedHelpers } from "vuex"

const { mapMutations } = createNamespacedHelpers("Indicator")

export default {
    components: {
        Panel,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            name: "",
            src: "1"
        }
    },
    methods: {
        fileChangeHandle (e) {
            const files = e.target.files || e.dataTransfer.files

            upload("file", files[0]).then(res => {
                this.src = res.data
            })
        },
        saveHandle (e) {
            createContract({
                contract_name: this.name,
                contract_file: this.src
            }).then(res => {
                this.toggleToast({ show: true, message: "新建成功!" })
                this.$router.back()
            })
        },
        ...mapMutations([
            "toggleToast"
        ])

    }
}
</script>

<style lang="scss" scoped>

.upload {
    .upload-action {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        overflow: hidden;
        text-align: center;

        .icon {
            margin-bottom: 10px;

            .iconfont {
                font-size: 88px;
            }
        }

        span {
            font-size: 14px;
        }

        .file {
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            opacity: 0;
        }
    }
}

</style>
