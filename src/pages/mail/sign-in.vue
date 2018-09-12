
<template>
    <Panel title="登陆邮箱">
        <div class="mail-sign">
            <div class="logo">
                <img :src="mail.image">
            </div>
            <div class="core">
                <div class="field-cell">
                    <mt-field
                        class="mail-sign-field"
                        :placeholder="placeholder"
                        v-model="email"
                    >
                        <div class="label">
                            <i class="iconfont icon-youxiang"></i>
                        </div>
                    </mt-field>
                    <span class="field-error" v-if="errors.has('email')">{{errors.first("email")}}</span>

                </div>

                <div class="field-cell">
                    <mt-field
                        class="mail-sign-field"
                        placeholder="请输入授权码/独立密码"
                        type="password"
                        v-model="password"
                    >
                        <div class="label">
                            <i class="iconfont icon-mima"></i>
                        </div>
                    </mt-field>
                    <span class="field-error" v-if="errors.has('password')">{{errors.first("password")}}</span>
                </div>

            </div>
            <div class="action" @click="signHandle">登陆</div>
        </div>

    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import { mail } from "../../common/js/config"
import { find } from "../../common/js/util"

import { Field } from "mint-ui"

import Validator from "../../common/js/validate"
import { validateMixin } from "../../common/js/mixin"
import { emailSignIn } from "../../api/sign"

import { createNamespacedHelpers } from "vuex"

const { mapMutations } = createNamespacedHelpers("Indicator")
const UserStore = createNamespacedHelpers("User")

const validator = new Validator({
    email: "required|email",
    password: "required|min:6|max:36|alpha_dash"
})

export default {
    mixins: [validateMixin],
    components: {
        Panel,
        [Field.name]: Field
    },
    data () {
        return {
            email: null,
            password: null,

            validator: validator,
            errors: validator.errors
        }
    },
    computed: {
        mail () {
            const type = this.$route.params.type

            return find(mail, "type", type)
        },
        placeholder () {
            return `email@${this.mail.type}.com`
        },
        keys () {
            return ["email", "password"]
        }
    },
    watch: {
        email (value) {
            this.validator.validate("email", this.email)
        },
        password (value) {
            this.validator.validate("password", this.password)
        }
    },
    methods: {
        signHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false

                emailSignIn({
                    email: this.email,
                    password: this.password
                }).then(res => {
                    // 获取用户信息
                    this.getUserInfo()
                    this.$router.replace({ name: "message" })
                }).catch(err => {
                    if (err.response && err.response.status === 500) {
                        this.toggleToast({ show: false })
                        setTimeout(() => this.toggleToast({ show: true, message: "授权码或独立密码不正确" }), 0)
                    }
                })
            })
        },
        ...mapMutations([
            "toggleToast"
        ]),
        ...UserStore.mapActions([
            "getUserInfo"
        ])
    }

}
</script>

<style lang="scss">
    @import "../../common/scss/mixin.scss";

    .mail-sign-field {

        &.mint-field {
            background: lighten($color-gray,  40);

            .mint-cell-value {
                flex-direction: row-reverse;
                .mint-field-core {
                    background: lighten($color-gray,  40);
                }
                .mint-field-clear {
                    display: none;
                }
            }
        }

    }

</style>

<style lang="scss" scopde>

@import "../../common/scss/mixin.scss";

.mail-sign {
    margin: 20px;
    border-radius: 10px;
    background: $color-white;

    .logo {
        padding: 15px;
        text-align: center;
        img {
            width: 108px;
            height: 25px;
        }

    }
    .core {
        .field-cell {
            position: relative;

            .label {
                margin-left: 10px;
                margin-right: 20px;
            }

            .field-error {
                position: absolute;
                padding: 3px;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                color: $color-danger;
                background: $color-white;
            }
        }

    }
    .action {
        font-size: $font-size-m;
        line-height: 40px;
        height: 40px;
        text-align: center;
        color: lighten($color-primary, 10)
    }

}
</style>
