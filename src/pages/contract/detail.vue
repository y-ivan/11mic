
<template>
    <Panel :title="info.name || ''">
        <div class="module">
            <mt-cell
            >
                <i class="iconfont icon-fujian" slot="icon"></i>
                <a slot="title" :href="info.src">{{ info.contract_file }}</a>
                <mt-button type="danger" size="small" @click="deleteHandle(info.id)">删除</mt-button>
            </mt-cell>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"

import {
    Cell,
    button
} from "mint-ui"

import { getContractDetail, deleteContract } from "../../api/contract"

export default {
    components: {
        Panel,
        [Cell.name]: Cell,
        [button.name]: button
    },
    data () {
        return {
            info: {}
        }
    },
    created () {
        getContractDetail(this.$route.params.id).then(res => {
            this.info = res.data
        })
    },
    methods: {
        deleteHandle (id) {
            deleteContract(id).then(res => {
                this.$router.back()
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.module {
    padding: 10px 0;
}

</style>
