
<template>
    <Panel :title="text">
        <mt-button slot="right" @click="saveHandle">确认</mt-button>
        <div class="field">
            <div class="field-cell">
                <mt-field
                    type="text"
                    :label="text"
                    v-model="fieldValue"
                ></mt-field>
                <span class="field-error" v-if="errors.has(key)">{{errors.first(key)}}</span>
            </div>
        </div>
    </Panel>
</template>

<script>

import Panel from "../../components/panel"

import {
    Field,
    Button
} from "mint-ui"
import Validator from "../../common/js/validate"
import { validateMixin } from "../../common/js/mixin"

import { setUser } from "../../api/user"
import { createNamespacedHelpers } from "vuex"

const { mapState, mapActions } = createNamespacedHelpers("User")
const IndicatorStore = createNamespacedHelpers("Indicator")

const validator = new Validator({
    name: "required",
    age: "required|digits:2",
    address: "required",
    sex: "required"
})

export default {
    mixins: [validateMixin],
    components: {
        Panel,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            name: null,
            age: null,
            address: null,
            sex: null,
            edited: false,

            validator: validator,
            errors: validator.errors
        }
    },
    computed: {
        fieldValue: {
            set (val) {
                this.edited = true
                this[this.key] = val
            },
            get () {
                return !this.edited ? this.$route.query.value : this[this.key]
            }
        },
        key () {
            return this.$route.params.key
        },
        keys () {
            return [this.key]
        },
        text () {
            const ref = {
                name: "名字",
                age: "年龄",
                address: "地址",
                sex: "性别"
            }
            return ref[this.key]
        },
        ...mapState([
            "info"
        ])
    },
    watch: {
        name (value) {
            this.validator.validate("name", this.name)
        },
        age (value) {
            this.validator.validate("name", this.age)
        },
        address (value) {
            this.validator.validate("name", this.address)
        },
        sex (value) {
            this.validator.validate("name", this.sex)
        }
    },
    methods: {
        saveHandle () {
            const defaultVal = this.$route.query.value

            if (this[this.key] === defaultVal) {
                // toast
                this.toggleToast({ show: true, message: "当前未做任何修改" })
                return false
            }

            this.validateAll([this.key]).then(result => {
                if (!result) return false
                const data = {}

                data[this.key] = this[this.key]

                setUser(this.info.id, data).then(res => {
                    this.$router.back()
                    this.getUserInfo()
                })
            })
        },
        ...mapActions([
            "getUserInfo"
        ]),
        ...IndicatorStore.mapMutations([
            "toggleToast"
        ])
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/scss/mixin.scss";

.field {
    padding: 20px 0;

    .field-cell {
        position: relative;

        .field-error {
            position: absolute;
            padding: 3px;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            color: $color-danger;
            background: lighten($color-gray, 40);
        }
    }
}

</style>
