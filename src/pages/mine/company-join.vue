
<template>
    <Panel
        title="加入公司"
    >
        <div class="invite">
            <div class="field">
                <span class="label">请输入邀请码</span>
                <div class="field-core">
                    <mt-field v-model="vertify" type="number"></mt-field>
                </div>
            </div>

            <div class="action" @click="inviteHandle">加入公司</div>
        </div>

    </Panel>

</template>

<script>

import Panel from "../../components/panel"

import {
    Field
} from "mint-ui"

import { join } from "../../api/company"

export default {
    components: {
        Panel,
        [Field.name]: Field
    },
    data () {
        return {
            vertify: ""

        }
    },
    methods: {
        inviteHandle () {
            if (!this.vertify) return

            join({
                sms_code: this.vertify
            }).then(res => {
                this.$router.back()
            })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.invite {
    padding: 15px;

    .label {
        display: block;
        padding: 10px;
    }
    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        margin: 0 15px;
        top: 50%;
        left: 0;
        right: 0;
        height: 50px;
        transform: translateY(-50%);
        background: $color-primary;
        border-radius: 50px;
        color: $color-white;
    }

}
</style>
