
import axios from "./axios"

export const getCompanyList = () =>
    axios.get("myCompany")

export const sendInvite = data =>
    axios.post("admin/adminAddEmployee", data)

export const join = data =>
    axios.post("cusers/accedeCompanyWithCode", data)
