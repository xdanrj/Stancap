const apiUrl = process.env.API_URL
import axiosInstance from "./axiosConfig"

export default class loginAndRegisterServices {
    constructor() {
        this.axios = axiosInstance
    }

    async sendCode(email) {
        const response = await this.axios.post('/send_code', email)        
        console.log(response)
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
        console.log("response do login abaixo:")
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("token", response.data.token)
            return true
            // se não: já retorna a "{message}" da API
        } else if (response.status === 401){
            return response.data.message
        }
    }

    async isUserTokenValid() {
        const token = localStorage.getItem("token")
        if(!token) {
            return false
        }
        try {
            
        } catch (error) {
            
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