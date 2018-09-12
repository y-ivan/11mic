
<template>
    <Panel
        title="邀请员工"
        :scroll="false"
        :fixed="showPermission"
    >
        <div class="invite">
            <div class="field">
                <span class="label">请输入员工手机号</span>
                <div class="field-core">
                    <mt-field v-model="phone"></mt-field>
                </div>
            </div>

            <div class="field">
                <span class="label">选择员工职位</span>
                <MultipleTag
                    :selected="permissions"
                    :color="roleColors"
                    @delete="deleteHandle"
                    @action="openPermissionsHandle"
                >

                </MultipleTag>
            </div>

            <div class="action" @click="inviteHandle">邀请</div>
        </div>

        <div slot="fixed">
            <mt-popup
                v-model="showPermission"
                position="bottom"
                style="width: 100%"
            >
                <div class="permission-list">
                    <div class="cell"
                        v-for="(item, index) in roleText"
                        :key="index"
                        v-show="hasSelectd(index)"
                        @click="addHandle(index)"
                    >
                        {{ item }}
                    </div>
                </div>
            </mt-popup>
        </div>
    </Panel>

</template>

<script>

import Panel from "../../components/panel"
import MultipleTag from "../../components/multiple-tag"

import {
    Field,
    Popup
} from "mint-ui"

import { findIndex } from "../../common/js/util"
import { sendInvite } from "../../api/company"
import { positions, positionColors } from "../../common/js/config"
export default {
    components: {
        Panel,
        MultipleTag,
        [Field.name]: Field,
        [Popup.name]: Popup
    },
    data () {
        return {
            phone: "",
            permissions: [{
                id: 1,
                text: "销售"
            }],
            roleText: positions,
            roleColors: positionColors,
            showPermission: false
        }
    },
    methods: {
        deleteHandle (id) {
            const idx = findIndex(this.permissions, "id", id)
            this.permissions.splice(idx, 1)
        },
        hasSelectd (idx) {
            return findIndex(this.permissions, "id", idx) === -1
        },
        openPermissionsHandle () {
            this.showPermission = true
        },
        addHandle (idx) {
            this.permissions.push({
                id: idx,
                text: this.roleText[idx]
            })
            this.showPermission = false
        },

        inviteHandle () {
            const role = this.permissions.map(item => item.id + 1).sort().join(",")
            sendInvite({
                phone: this.phone,
                role_ids: role
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

.permission-list {
    background: $color-white;

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        &:not(:first-child) {
            @include border-top;
        }
    }
}
</style>
