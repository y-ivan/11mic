
<template>
    <Panel title="修改意见">
        <div class="comment">
            <textarea v-model="comment" placeholder="请输入您的修改意见"></textarea>

            <div class="action">
                <mt-button size="small" type="danger" @click="saveHandle">保存</mt-button>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"

import { quotePass, salesPass } from "../../api/audit"

import {
    Button
} from "mint-ui"
export default {
    components: {
        Panel,
        [Button.name]: Button
    },
    data () {
        return {
            comment: ""
        }
    },
    methods: {
        saveHandle () {
            if (!this.comment) return false
            const api = this.$route.query.type === "0" ? quotePass : salesPass
            const id = this.$route.params.id
            api({
                id: id,
                comment: this.comment
            }).then(res => {
                this.$router.back()
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.comment {
    padding: 10px;

    textarea {
        box-sizing: border-box;
        border: none;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        min-height: 200px;
        max-height: 500px;
        outline: none;
    }

    .action {
        margin-top: 20px;
        text-align: right;

        .mint-button {
            border-radius: 32px;
        }
    }

}

</style>
