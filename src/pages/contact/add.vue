
<template>
    <Panel
        title="添加联系人"
    >
        <mt-button
            slot="left"
            icon="back"
            @click="$emit('update:show', false)"
        />

        <!-- <div class="add-field">
            <mt-field
                label="姓名"
                placeholder="请输入姓名"
                v-model="name"
            >
                <span class="field-error" v-if="errors.has('name')">{{errors.first("name") }}</span>
            </mt-field>

            <mt-field
                label="电话"
                placeholder="请输入电话号码"
                v-model="phone"
            >
                <span class="field-error" v-if="errors.has('phone')">{{errors.first("phone") }}</span>
            </mt-field>

            <mt-field
                label="邮箱"
                placeholder="请输入电子邮箱"
                v-model="email"
            >
                <span class="field-error" v-if="errors.has('email')">{{errors.first("email") }}</span>
            </mt-field>

            <mt-field
                label="备注"
                placeholder=""
                type="textarea"
                rows="2"
                v-model="remark"
            >
                <span class="field-error" v-if="errors.has('remark')">{{errors.first("remark") }}</span>
            </mt-field>

            <div class="action">
                <mt-button type="primary" size="large" @click="saveHandle">保存</mt-button>
            </div>
        </div> -->

        <Search
            v-model="phone"
            placeholder="请输入手机号码查找"
            @action="actionHandle"
        >

        </Search>
        <div class="field-error" v-if="errors.has('phone')">{{errors.first("phone") }}</div>

        <div class="contact" v-if="contact">
            <PanelItem @click.native="itemHandle">
                <div slot="left">
                    <Avatar slot="left" :src="contact.avatar" :text="contact.name"></Avatar>
                </div>
                <div class="text">
                    <div class="title">{{ contact.name }}</div>
                </div>
                <div class="action" slot="right">
                    <i class="iconfont icon-shangchuan" @click="addHandle(contact.id)"></i>
                </div>
            </PanelItem>
        </div>

    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import PanelItem from "../../components/panel/item"
import Search from "../../components/search"
import Avatar from "../../components/avatar"

import {
    Field,
    Button
} from "mint-ui"

import Validator from "../../common/js/validate"
import { createNamespacedHelpers } from "vuex"
import { validateMixin } from "../../common/js/mixin"
import { searchContact } from "../../api/contact"
const { mapActions } = createNamespacedHelpers("Contact")

const validator = new Validator({
    phone: "required|mobile"
})

export default {
    mixins: [ validateMixin ],
    components: {
        Panel,
        Search,
        Avatar,
        PanelItem,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            phone: "",
            validator: validator,
            errors: validator.errors,
            contact: ""
        }
    },
    computed: {
        keys () {
            return ["phone"]
        }
    },
    watch: {
        phone () {
            this.validator.validate("phone", this.phone)
        }
    },
    methods: {
        saveHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false

                const type = this.$route.params.type

                this.addContact({
                    type: type,
                    phone: this.phone
                }).then(() => {
                    this.keys.map(item => {
                        this[item] = ""
                        this.errors.remove(item)
                    })
                    this.$emit("update:show", false)
                })
            })
        },
        actionHandle () {
            this.validateAll(this.keys).then(result => {
                if (!result) return false
                const type = this.$route.params.type
                searchContact(this.phone, type).then(res => {
                    this.contact = res.data
                })
            })
        },
        itemHandle () {

        },
        addHandle (id) {
            const type = this.$route.params.type

            this.addContact({
                type: type,
                id: id
            }).then(() => {
                this.keys.map(item => {
                    this[item] = ""
                    this.errors.remove(item)
                })
                this.$emit("update:show", false)
            })
        },
        ...mapActions([
            "addContact"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

// .add-field {
//     padding: 15px;

//     .mint-field {
//         border-radius: 5px;
//         margin-bottom: 5px;

//         .field-error {
//             color: $color-danger;
//         }
//     }

//     .action {
//         margin: 50px auto 0;
//         width: 70%;
//     }
// }

.field-error {
    padding: 5px 46px;
    color: $color-danger;
    background: $color-white;
}

.contact {
    margin-top: 10px;
    background: $color-white;
    @include border-top;
    @include border-bottom;

    .text,.action {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: $font-size-l;
        color: $color-gray;
    }
    .action {

        .iconfont {
            font-size: 20px;
        }
    }
}

</style>
