
<template>
    <Panel title="邮箱助手">
        <ul class="mail-list">
            <li
                v-for="(ref, index) in mail"
                :key="index"
                @click="mailItemHandle(ref.type)"
            >
                <img :src="ref.image" />
            </li>
        </ul>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import { mail } from "../../common/js/config"

export default {
    components: {
        Panel
    },
    data () {
        return {
            mail: mail
        }
    },
    methods: {
        mailItemHandle (type) {
            this.$router.push({ name: "mail-sign", params: { type: type } })
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.mail-list {
    padding: 30px 20px;

    li {
        padding: 20px 0;
        margin-bottom: 10px;
        text-align: center;
        background: $color-white;
        border-radius: 5px;

        img {
            width: 108px;
            height: 25px;
            vertical-align: middle;
        }
    }
}

</style>
