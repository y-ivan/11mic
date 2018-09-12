
<template>
    <Panel title="备注">
        <mt-button
            slot="right"
            @click="saveHandle"
        >
            保存
        </mt-button>
        <div class="remark">
            <mt-field
                class="field"
                label="备注名"
                placeholder="请输入备注名"
                v-model="remark"
            />
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import {
    Field,
    Button
} from "mint-ui"
import { setUserInfo } from "../../api/contact"
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("Indicator")
const ContactStore = createNamespacedHelpers("Contact")
export default {
    props: {
        info: {
            required: true,
            type: Object
        }
    },
    components: {
        Panel,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            remark: this.info.remark || this.info.name
        }
    },
    methods: {
        saveHandle () {
            if (this.remark && this.info.remark !== this.remark && this.info.name !== this.remark) {
                this.toggleIndicator({
                    show: true
                })
                setUserInfo(
                    this.$route.params.type, {
                        remark: this.remark,
                        id: this.info.id
                    }).then(res => {
                    this.updateContact({ type: this.$route.params.type, list: Object.assign({}, this.info, { remark: this.remark }) })
                    this.toggleIndicator({show: false})
                    this.$emit("update:show", false)
                })
            } else this.$emit("update:show", false)
        },
        ...mapMutations([
            "toggleIndicator"
        ]),
        ...ContactStore.mapMutations([
            "updateContact"
        ])
    }
}

</script>

<style lang="scss" scoped>

.remark {

    .field {
        margin: 15px 0;
    }
}

</style>
