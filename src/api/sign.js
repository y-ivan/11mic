
import axios from "./axios"

export const signIn = ({ phone, password }) =>
    axios.post("login", {
        phone,
        password
    })

export const signUp = ({ phone, password, repassword, verifiy, name }) =>
    axios.post("register", {
        phone,
        password,
        name,
        password2: repassword,
        sms_code: verifiy
    })

export const getVerifiy = ({ phone }) =>
    axios.get(`smsconfirm?phone=${phone}`)

export const resetPassword = ({ phone, password, repassword, verifiy }) =>
    axios.post("resetpwd", {
        phone,
        password,
        password2: repassword,
        sms_code: verifiy
    })

export const companySignUp = (formData, config) =>
    axios.post("company", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const emailSignIn = ({ email, password }) =>
    axios.post("mail/authMail", {
        email,
        email_auth_code: password
    })
