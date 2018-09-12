
<template>
    <Panel title="登录">
        <mt-button slot="left" @click="$router.push({ name: 'sign-up-company', query: { redirect: $route.query.redirect } })">企业入驻</mt-button>
        <mt-button slot="right" @click="$router.push({ name: 'sign-up', query: { redirect: $route.query.redirect } })">快速注册</mt-button>
        <div class="sign sign-in">
            <mt-field
                label="手机号"
                placeholder="请输入手机号"
                v-model="phone"
            >
                <span class="field-error" v-if="errors.has('phone')">{{errors.first("phone") }}</span>
            </mt-field>
            <mt-field
                label="密码"
                placeholder="请输入密码"
                v-model="password"
                type="password"
            >
                <span class="field-error" v-if="errors.has('password')">{{errors.first("password") }}</span>
            </mt-field>
            <div class="action">

                <mt-button size="large" type="primary" @click="signInHandle">登陆</mt-button>
                <router-link class="forget" :to="{ name: 'sign-up', query: { redirect: $route.query.redirect, find: true } }">忘记密码?</router-link>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import {
    Field,
    Button,
    Switch
} from "mint-ui"

import Validator from "../../common/js/validate"
import { validateMixin } from "../../common/js/mixin"
import { signIn } from "../../api/sign"
import storage from "good-storage"
import { createNamespacedHelpers } from "vuex"

const { mapMutations } = createNamespacedHelpers("User")

const validator = new Validator({
    phone: "required|mobile",
    password: "required|min:6|max:36|alpha_dash"
})

export default {
    mixins: [validateMixin],
    components: {
        Panel,
        [Field.name]: Field,
        [Button.name]: Button,
        [Switch.name]: Switch
    },
    data () {
        return {
            phone: "18621864834",
            password: "ivanfe123",
            validator: validator,
            errors: validator.errors
        }
    },
    computed: {
        keys () {
            return ["phone", "password"]
        }
    },
    watch: {
        phone (value) {
            this.validator.validate("phone", this.phone)
        },
        password (value) {
            this.validator.validate("password", this.password)
        }
    },
    methods: {
        signInHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false

                signIn({
                    phone: this.phone,
                    password: this.password
                }).then(res => {
                    if (res.status) {
                        const data = res.data
                        storage.set("api_token", data.api_token)
                        storage.set("lifetime", res.lifetime + (new Date()).getTime())
                        this.setInfo(data)

                        const redirect = this.$route.query.redirect

                        if (redirect) this.$router.replace({ path: redirect })
                        else this.$router.replace({ name: "message" })
                    }
                })
            })
        },
        ...mapMutations([
            "setInfo"
        ])
    }
}
</script>

<style lang="scss">

@import "../../common/scss/sign.scss";

</style>
