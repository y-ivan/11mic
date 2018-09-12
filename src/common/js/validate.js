
import { Validator } from "vee-validate"
import { mobile } from "../../common/js/util"

Validator.extend("mobile", {
    getMessage: field => "请输入正确的手机号",
    validate: value => new Promise(resolve => {
        resolve(mobile(value))
    })
})

Validator.extend("same", {
    getMessage: () => "密码不一致",
    validate: (value, ref) => new Promise(resolve => resolve(value === ref[0]))
})

Validator.extend("truth", {
    getMessage: field => `${field}是必须的`,
    validate: value => new Promise(resolve => resolve(!!value))
})

Validator.extend("picture", {
    getMessage: () => "请选择正确的图片格式",
    validate: value => new Promise(resolve => resolve(/(jpg|svg|jpeg|png|bmp|gif)/i.test(value)))
})

Validator.extend("pictureLimit", {
    getMessage: (field, ref) => `图片大小不能超过${parseInt(ref[0]) / 1048576}M`,
    validate: (value, ref) => new Promise(resolve => {
        resolve(value <= ref[0])
    })
})

const dictionnary = {
    en: {
        messages: {
            required: (field) => `${field}不能为空`,
            digits: (field, num) => `${num[0]}位数字验证码`,
            alpha_dash: () => "需为字母数字下划线",
            min: (field, num) => `${field}最少为${num[0]}位`,
            max: (field, num) => `${field}最多为${num[0]}位`,
            email: field => "请输入正确的邮箱地址"
        }
    }
}

Validator.localize(dictionnary)

export default Validator
