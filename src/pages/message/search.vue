<template>
    <SearchPanel
        :searchValue="searchValue"
        action-text="取消"
        @action="actionHandle"
    >
    </SearchPanel>
</template>

<script>

import SearchPanel from "../../components/search/search-panel"

export default {
    components: {
        SearchPanel
    },
    data () {
        return {
            searchValue: ""
        }
    },
    methods: {
        actionHandle () {
            this.$router.back()
        }
    }

}
</script>

<style>

</style>
