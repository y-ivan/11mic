<template>
    <Panel
        title="详细资料"
        :fixed="showRemark"
    >
        <div class="detail" v-if="contactInfo">
            <div class="business">
                <Avatar :size="60" :src="contactInfo.avatar" :text="contactInfo.name" />
                <div>{{ contactInfo.name }}</div>
                <div v-if="this.type === '4'">邮箱号: {{ contactInfo.email }}</div>
                <div v-else>手机号: {{ contactInfo.phone }}</div>
            </div>

            <mt-cell
                title="备注"
                is-link
                @click.native="showRemarkHandle"
                :value="contactInfo.remark"
            />

            <div class="actions">
                <mt-button v-if="this.type !== '4'" @click="openChatHandle" class="button" type="primary" size="large">发消息</mt-button>
                <mt-button v-if="contactInfo.email" @click="openEmailHandle" class="button" type="primary" plain size="large">发邮件</mt-button>
                <mt-button v-if="$route.params.type !== '0'" class="button" type="danger" size="large">删除联系人</mt-button>
            </div>
        </div>

        <mt-popup
            class="popup-remark"
            v-model="showRemark"
            position="right"
            slot="fixed"
        >
            <Remark
                v-if="showRemark"
                :info="contactInfo"
                :show.sync="showRemark"
            />
        </mt-popup>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"
import Avatar from "../../components/avatar"
import Remark from "../../pages/contact/remark"

import {
    Cell,
    Popup,
    Button
} from "mint-ui"

import { find } from "../../common/js/util"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapActions } = createNamespacedHelpers("Contact")
const MessageStore = createNamespacedHelpers("Message")
const UserStore = createNamespacedHelpers("User")

export default {
    components: {
        Panel,
        Remark,
        Avatar,
        [Cell.name]: Cell,
        [Popup.name]: Popup,
        [Button.name]: Button
    },
    data () {
        return {
            showRemark: false
        }
    },

    computed: {
        contactInfo () {
            const id = this.$route.params.id
            return find(this.contact(this.type), "id", Number(id))
        },
        type () {
            return this.$route.params.type
        },
        ...MessageStore.mapState([
            "email"
        ]),
        ...MessageStore.mapGetters([
            "getChatItem"
        ]),
        ...mapGetters([
            "contact"
        ]),
        ...UserStore.mapState([
            "info"
        ])
    },
    methods: {
        openChatHandle () {
            const id = this.$route.params.id
            if (!this.getChatItem(id)) {
                this.setInterimContact(Object.assign({}, this.contactInfo))
            }
            this.$router.replace({ name: "chat", params: { id: id } })
        },

        openEmailHandle () {
            const id = this.$route.params.id
            if (!this.getChatItem(id, this.email)) {
                this.setInterimContact(Object.assign({}, this.contactInfo))
            }

            if (this.info.is_email_auth) this.$router.replace({ name: "chat-email", params: { id: id } })
            else this.$router.replace({ name: "mail-list" })
        },

        showRemarkHandle () {
            this.showRemark = true
        },
        ...mapActions([
            "getContact"
        ]),
        ...MessageStore.mapMutations([
            "setInterimContact"
        ])
    },
    created () {
        this.contact(this.type).length === 0 && this.getContact(this.type)
    }

}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.detail {
    .business {
        margin: 15px 0;
        padding: 15px 0;
        background: $color-white;
        text-align: center;
        color: $color-gray;
        font-size: $font-size-m;
        line-height: 1.5em;

        .avatar {
            margin-bottom: 10px;
        }
    }

    .actions {
        width: 70%;
        margin: 50px auto;

        .button {
            margin-bottom: 10px;
        }
    }
}

.popup-remark {
    width: 100%;
    height: 100%;
}

</style>
