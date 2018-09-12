
export const mobile = value => {
    value = value && value.replace(/[^-|\d]/g, "")
    return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)
}

export const url = str => {
    const urlR = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi

    return str.match(urlR)
}

export const image = str => {
    const imageR = /.(?:png|jpg|jpeg|gif|png|svg)/g

    return imageR.test(str)
}

// -1
export const findIndex = (list, key, value) =>
    list.findIndex(item => item[key] === value)

// undefined
export const find = (list, key, value) =>
    list.find(item => item[key] === value)

export const isObject = x => x != null && typeof x === "object"

export const insertArray = (arr, key, compare, maxLen) => {
    const index = arr.findIndex(compare)

    if (index === 0) return true

    if (index >= 0) {
        arr.splice(index, 1)
    }

    arr.unshift(key)

    if (maxLen && arr.length > maxLen) arr.pop()
}

export const uuid = (len, radix) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
    var uuid = []
    var i
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        // rfc4122, version 4 form
        var r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"
        uuid[14] = "4"

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join("")
}

export const sizeof = (str, charset) => {
    let total = 0
    let charCode = null
    let i = null
    let len = null
    charset = charset ? charset.toLowerCase() : ""
    if (charset === "utf-16" || charset === "utf16") {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0xffff) {
                total += 2
            } else {
                total += 4
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0x007f) {
                total += 1
            } else if (charCode <= 0x07ff) {
                total += 2
            } else if (charCode <= 0xffff) {
                total += 3
            } else {
                total += 4
            }
        }
    }
    return total
}

export const getRect = el => {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

export const removeEmpty = obj => {
    const newObj = {}
    Object.keys(obj).forEach(item => {
        if (obj[item] !== undefined) newObj[item] = obj[item]
    })
    return newObj
}
