import axios from "axios"
/*   "http://localhost:3000"
   P "http://192.168.1.65:3000"
   N "http://192.168.1.89:3000"
   /* baseURL: window.location.hostname === "localhost" ? "http://localhost:3000" : "http://192.168.1.65:3000" */
export default class loginAndRegisterServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://192.168.1.65:3000"
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
            localStorage.setItem("username", response.data.username)
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
        console.log("DADOS QUE TAO CHEGANDO PRO SERVICE: ", dados)
        const response = await this.axios.patch('/edit_user', dados)
        if (response.data.response) {
            return true
        }
        else {
            return response.data.message
        }
    }

}