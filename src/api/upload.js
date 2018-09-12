
import axios from "./axios"

export const upload = (key, file) => {
    const formData = new FormData()
    formData.append(key, file)

    return axios.post("upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        meta: {
            unToast: true
        }
    })
}
