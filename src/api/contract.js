
import axios from "./axios"

export const getContract = () =>
    axios.get("contract")

export const createContract = data =>
    axios.post("contract", data)

export const getContractDetail = id =>
    axios.get(`contract/${id}`)

export const deleteContract = id =>
    axios.post(`contract/${id}`, { "_method": "DELETE" })
