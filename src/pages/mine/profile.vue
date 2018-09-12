
<template>
    <Panel
        title="我的信息"
    >
        <div class="profile">
            <div class="cell-group">
                <mt-cell
                    title="头像"
                    is-link
                    @click.native="avatarHandle"
                >
                    <Avatar :src="info.avatar" :text="info.name" />
                </mt-cell>
                <mt-cell
                    title="名字"
                    :value="info.name"
                    is-link
                    @click.native="fieldHandle('name')"
                ></mt-cell>
                <mt-cell
                    title="电话"
                    :value="info.phone"
                    is-link
                ></mt-cell>
                <mt-cell
                    title="邮箱"
                    :value="info.email || '无'"
                    is-link
                    @click.native="emailHandle"
                ></mt-cell>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Avatar from "../../components/avatar"
import { Cell } from "mint-ui"

import { createNamespacedHelpers } from "vuex"

const { mapState } = createNamespacedHelpers("User")

export default {
    components: {
        Panel,
        Avatar,
        [Cell.name]: Cell
    },
    computed: {
        ...mapState([
            "info"
        ])
    },
    methods: {
        avatarHandle () {
            this.$router.push({ name: "mine-avatar" })
        },
        fieldHandle (key) {
            this.$router.push({ name: "mine-field", params: { key }, query: { value: this.info[key] } })
        },
        emailHandle () {
            this.$router.push({ name: "mail-list" })
        }
    }
}
</script>

<style lang="scss" scoped>

.profile {
    .cell-group {
        padding: 10px 0;
    }
}
</style>
