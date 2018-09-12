
<template>
    <div>
        <Panel :title="hasFind ? '找回密码' : '注册'">
            <mt-button slot="right" @click="$router.push({name: 'sign-in'})">登录</mt-button>
            <div class="sign sign-in">

                <mt-field
                    label="手机号"
                    placeholder="请输入手机号"
                    v-model="phone"
                >
                    <span class="field-error" v-if="errors.has('phone')">{{errors.first("phone") }}</span>
                </mt-field>
                <mt-field
                    label="验证码"
                    placeholder="请输入验证码"
                    v-model="verifiy"
                    :attr="{maxlength: 4}"
                >
                    <span class="field-error" v-if="errors.has('verifiy')">{{errors.first("verifiy") }}</span>
                    <mt-button
                        type="primary"
                        size="small"
                        :disabled="this.interval !== 0"
                        @click="verifiyHandle"
                    >
                        {{ verifiyText }}
                    </mt-button>
                </mt-field>

                <mt-field
                    v-if="!hasFind"
                    label="姓名"
                    placeholder="请输入姓名"
                    v-model="name"
                >
                    <span class="field-error" v-if="errors.has('name')">{{errors.first("name") }}</span>
                </mt-field>

                <mt-field
                    label="密码"
                    placeholder="请输入密码"
                    v-model="password"
                    type="password"
                >
                    <span class="field-error" v-if="errors.has('password')">{{errors.first("password") }}</span>
                </mt-field>

                <mt-field
                    label="确认密码"
                    placeholder="请再次输入密码"
                    v-model="repassword"
                    type="password"
                >
                    <span class="field-error" v-if="errors.has('repassword')">{{errors.first("repassword") }}</span>
                </mt-field>

                <div class="action">
                    <div class="agree" v-if="!hasFind">
                        <mt-switch
                            v-model="agree"
                        >
                            <div class="agree-action">
                                我已看过并同意《<router-link to="" tag="span">**规则</router-link>》
                                <span class="field-error" v-if="errors.has('agree')"> {{errors.first("agree") }}</span>
                            </div>
                        </mt-switch>
                    </div>
                    <mt-button size="large" type="primary" @click="signUpHandle">{{ hasFind ? "提交" : "提交注册" }}</mt-button>
                    <router-link class="forget" :to="{ name: 'sign-up-company', query: { redirect: $route.query.redirect } }" style="font-size: 14px;" v-if="!hasFind">企业入驻</router-link>
                </div>
            </div>
        </Panel>
    </div>
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
import { signUp, getVerifiy, resetPassword } from "../../api/sign"
import { createNamespacedHelpers } from "vuex"
import storage from "good-storage"

const { mapMutations } = createNamespacedHelpers("Indicator")

const validator = new Validator({
    phone: "required|mobile",
    verifiy: "required|digits:4",
    name: "required",
    password: "required|min:6|max:36|alpha_dash",
    repassword: "required",
    agree: "truth"
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
            phone: "",
            password: "",
            name: "",
            repassword: "",
            verifiy: "",
            agree: true,

            interval: 0,
            timer: null,
            validator: validator,
            errors: validator.errors
        }
    },

    computed: {
        keys () {
            return this.hasFind
                ? ["phone", "verifiy", "password", "repassword"]
                : ["phone", "verifiy", "name", "password", "repassword", "agree"]
        },

        hasFind () {
            return this.$route.query.find
        },
        verifiyText () {
            if (this.interval) return `${this.interval} 秒后重新发送`
            else return "获取验证码"
        }
    },

    watch: {
        interval (num) {
            if (num <= 0) {
                this.interval = 0
                clearInterval(this.timer)
            }
        },
        phone (value) {
            this.validator.validate("phone", value)
        },

        name (value) {
            this.validator.validate("name", value)
        },

        verifiy (value) {
            this.validator.validate("verifiy", value)
        },

        password (value) {
            this.validator.validate("password", value)
            this.validator.detach("repassword")
            this.validator.attach({
                name: "repassword",
                rules: "required|same:" + value
            })
        },
        repassword (value) {
            this.validator.validate("repassword", value)
        },
        agree (bool) {
            this.validator.validate("agree", bool)
        },

        $route () {
            this.keys.forEach(item => this.errors.remove(item))
        }
    },

    methods: {
        signUpHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false

                const submit = this.hasFind ? resetPassword : signUp

                submit({
                    phone: this.phone,
                    name: this.hasFind ? undefined : this.name,
                    password: this.password,
                    repassword: this.repassword,
                    verifiy: this.verifiy
                }).then(res => {
                    this.toggleToast({
                        show: true,
                        message: this.hasFind ? "修改密码成功, 请重新登陆" : "用户注册成功,请登录"
                    })

                    // 如果是修改密码  销毁 token
                    if (this.hasFind) storage.set("user_token", "")

                    this.$router.push({ name: "sign-in", query: { redirect: this.$route.query.redirect } })
                })
            })
        },

        verifiyHandle () {
            if (this.interval === 0) {
                this.validateAll(["phone"]).then(result => {
                    if (!result) return false

                    getVerifiy({
                        phone: this.phone
                    }).then(res => {
                        this.interval = 60

                        this.timer = setInterval(() => {
                            this.interval--
                        }, 1000)
                    })
                })
            }
        },

        ...mapMutations([
            "toggleToast"
        ])
    }

}
</script>

<style lang="scss">

@import "../../common/scss/sign.scss";

</style>
