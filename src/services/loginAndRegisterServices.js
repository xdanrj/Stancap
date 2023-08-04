import axios from "axios"

export default class loginAndRegisterServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    async sendCode(email) {
        const response = await this.axios.post('/send_code', email)
        // se enviou o code com sucesso:
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

    async checkCode(dados) {
        const emailAndCode = {
            ...dados.email,
            ...dados.code
        }
        console.log("emailAndCode: ", emailAndCode)
        const response = await this.axios.post('/check_code', emailAndCode)
        // se recebeu um objeto com "{response}":
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

    async register(dados) {
        const response = await this.axios.post('/register', dados)
        // se recebeu um objeto com "{response}":

        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

    async login(dados) {
        const response = await this.axios.post('/login', dados)
        // se recebeu um objeto com "{token}":
        if (response.data.token) {
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("token", response.data.token)
            return true
            // se não: já retorna a "{message}" da API
        } else {
            return response.data.message
        }
    }

    async newPasswordSendCode(email) {
        const response = await this.axios.post('/change_password_send', email)
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

    async newPasswordCheckCode(dados) {
        console.log("OLHA OS DADOS: ", dados)
        const emailAndCode = {
            ...dados.email,
            ...dados.code
        }
        console.log("emailAndCode: ", emailAndCode)
        const response = await this.axios.post('/change_password_check', emailAndCode)
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }
    async newPassword(dados) {
        const response = await this.axios.post('/edit_user', dados)
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

}