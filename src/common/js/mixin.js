
// import { isObject } from "./util"
import { url, image } from "./util"
import moment from "moment"
moment.locale("zh-CN")

export const validateMixin = {
    created () {
        this.keys.forEach(item => this.errors.remove(item))
    },

    methods: {
        validateAll (refs) {
            return Promise.all(refs.map(item => {
                return new Promise((resolve, reject) => {
                    this.validator.validate(item, this[item]).then(result => {
                        if (result) {
                            resolve(true)
                        } else {
                            reject(new Error(this.errors.first(item)))
                        }
                    })
                }).catch(res => console.log(res))
            })).then(result => result.every(item => !!item))
        }
    }
}

export const messageContentMixin = {
    methods: {
        messageContent (ref) {
            if (!ref) return ""
            const type = ref.type
            let body = ref.body

            if (type === "text") {
                const hasUrl = url(body)
                if (hasUrl && hasUrl.length) {
                    hasUrl.forEach(item => {
                        const hasImage = image(item)
                        if (hasImage) body = body.replace(item, "[图片]")
                        else body = body.replace(item, "[链接]")
                    })
                }

                return body
            } else if (type === "image") return "[图片]"
            else return ref.body
        }
    }
}

export const timeStampMixin = {
    filters: {
        timeStampParse (timestamp) {
            return new Date(timestamp * 1000).toLocaleTimeString()

            // const before = moment()
            // // const diff = now.diff(before, "days")
            // return before.format("YYYY/MM/DD")
        }
    }
}

export const scrollFollow = {
    updated () {
        this.scrollFollow(100)
    },
    created () {
        this.scrollFollow(100)
    },
    methods: {
        scrollFollow (interval = 0) {
            if (!this.chatMessage.messages || !this.chatMessage.messages.length) return false

            this.$nextTick(() => {
                const scroll = this.$refs.panel.$refs.scroll
                scroll.forceUpdate()
                const scrollHeight = scroll.$el.children[0].clientHeight
                const clientHeight = scroll.$el.clientHeight
                const height = scrollHeight - clientHeight

                if (height <= 0) return false
                setTimeout(() => {
                    scroll.scrollTo(0, -height, interval)
                }, 20)
            })
        }
    }
}

export const calcPriceMinMax = {
    filters: {
        calcPriceMinMax (ref) {
            if (ref.length) {
                const price = ref.map(item => item.price)

                return price.length === 1 ? price[0] : Math.min(...price) + " - " + Math.max(...price)
            } else return "** - **"
        }
    }
}
