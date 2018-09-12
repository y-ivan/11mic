
<template>
    <Panel title="企业入驻">
        <mt-button slot="right" @click="saveHandle">保存</mt-button>
        <div class="sign sign-up-company">
            <mt-field
                label="企业名"
                placeholder="请输入完整的企业名称"
                v-model="company_name"
            >
                <span class="field-error" v-if="errors.has('company')">{{errors.first("company_tel") }}</span>
            </mt-field>
            <mt-field
                label="企业地址"
                placeholder="请输入您企业的所在地址"
                v-model="company_address"
            >
                <span class="field-error" v-if="errors.has('address')">{{errors.first("company_user_name") }}</span>
            </mt-field>

            <mt-field
                label="企业负责人"
                placeholder="请输入您企业负责人姓名"
                v-model="company_user_name"
            >
                <span class="field-error" v-if="errors.has('address')">{{errors.first("company_user_name") }}</span>
            </mt-field>

            <mt-field
                label="手机号码"
                placeholder="请输入您的手机号"
                v-model="company_tel"
            >
                <span class="field-error" v-if="errors.has('phone')">{{errors.first("company_tel")}}</span>
            </mt-field>

            <mt-field
                label="企业简介"
                placeholder="不超过80个字符"
                v-model="company_desc"
                type="textarea"
                rows="5"
            >
                <span class="field-error" v-if="errors.has('introduction')">{{errors.first("company_desc")}}</span>
            </mt-field>

            <mt-cell
                class="mint-field"
                title="营业执照"
            >
                <div class="file-control">
                    <div class="left" v-if="license" >
                        <img :src="license" width="100%" />
                        <mt-progress
                            v-if="progress"
                            :value="progress"
                            :bar-height="5"
                        >
                            <span class="progress-text" slot="end">{{ progress + '%' }}</span>
                        </mt-progress>
                    </div>
                    <div class="right">
                        <mt-button class="file-button" :type="license ? 'danger' : 'primary'" size="small"><i class="icon icon-image" slot="icon"></i>{{ license ? "重新选择" : "添加图片" }}
                            <input class="file" ref="file" multiple="multiple" type="file" name="license" accept="image/*" @change="fileChangeHandle" />
                        </mt-button>
                        <div class="field-error" style="margin-top: 10px;" v-if="errors.has('license') || errors.has('licenseLimit') ">{{ errors.first(errors.has("license") ? "license" : "licenseLimit")}}</div>
                    </div>
                </div>
            </mt-cell>

            <!-- <div class="action">
                <mt-button size="large" type="primary" @click="signInHandle">登陆</mt-button>
                <router-link class="forget" :to="{ name: 'sign-up', query: { redirect: $route.query.redirect, find: true } }">忘记密码?</router-link>
            </div> -->
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import {
    Cell,
    Field,
    Button,
    Switch,
    Progress
} from "mint-ui"

import Validator from "../../common/js/validate"
import { validateMixin } from "../../common/js/mixin"
import { companySignUp } from "../../api/sign"
import { createNamespacedHelpers } from "vuex"

const { mapMutations } = createNamespacedHelpers("Indicator")

const validator = new Validator({
    company_tel: "required|mobile",
    company_desc: "required|max:80",
    company_address: "required",
    company_user_name: "required",
    company_name: "required",
    license: "required|picture",
    licenseLimit: "required|pictureLimit:3145728"
})

export default {
    mixins: [validateMixin],
    components: {
        Panel,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [Button.name]: Button,
        [Switch.name]: Switch,
        [Progress.name]: Progress
    },
    data () {
        return {
            company_name: "",
            company_address: "",
            company_user_name: "",
            company_tel: "",
            company_desc: "",
            license: null,
            company_licence_pic: null,
            licenseLimit: 0,

            progress: 0,

            validator: validator,
            errors: validator.errors
        }
    },
    computed: {
        keys () {
            return ["company_name", "company_user_name", "company_address", "company_tel", "company_desc", "license", "licenseLimit"]
        }
    },
    watch: {
        company_tel (value) {
            this.validator.validate("company_tel", this.company_tel)
        },
        company_address (value) {
            this.validator.validate("company_address", this.company_address)
        },
        company_user_name (value) {
            this.validator.validate("company_user_name", this.company_user_name)
        },
        company_desc (value) {
            this.validator.validate("company_desc", this.company_desc)
        },
        company_name (value) {
            this.validator.validate("company_name", this.company_name)
        },
        license (value) {
            this.validator.validate("license", this.license)
        },
        licenseLimit (value) {
            this.validator.validate("licenseLimit", this.licenseLimit)
        }
    },
    methods: {
        saveHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false

                const formData = new FormData()

                const refs = ["company_name", "company_user_name", "company_address", "company_tel", "company_desc", "company_licence_pic"]

                refs.forEach(key => formData.append(key, this[key]))

                companySignUp(formData, {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        this.progress = complete

                        if (progressEvent.loaded === progressEvent.total) this.progress = 0
                    }
                }).then(res => {
                    this.progress = 0
                    const redirect = this.$route.query.redirect

                    redirect ? this.$router.push({ path: redirect }) : this.$router.push({ name: "message" })
                }).catch(res => {
                    this.progress = 0
                })
            })
        },

        fileChangeHandle (e) {
            const files = e.target.files || e.dataTransfer.files
            if (!files.length) return false
            this.company_licence_pic = files
            this.createImage(files[0])
        },

        createImage (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                this.license = e.target.result
                this.company_licence_pic = file
                this.licenseLimit = file.size
            }

            reader.onloadstart = (e) => {
                this.toggleIndicator({
                    show: true,
                    text: "加载中···"
                })
            }

            reader.onloadend = (e) => {
                this.toggleIndicator({
                    show: false
                })
            }
            reader.readAsDataURL(file)
        },

        ...mapMutations([
            "toggleIndicator"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/sign.scss";

.file-control {
    padding: 10px 0;
    display: flex;
    align-items: center;

    .left {
        flex: 0 0 50%;

        .progress-text {
            font-size: $font-size-s;
            color: $color-gray;
            margin-left: 5px;
        }
    }

    .right {
        margin-left: 10px;
        flex: 1;
    }
    .file-button {
        position: relative;

        .file {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: 1;
        }
    }

}

</style>
