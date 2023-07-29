import axios from "axios"

export default class loginAndRegisterServices{
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    async sendCode(email) {
        const response = await this.axios.post('/send_code', email)
        // se enviou o code com sucesso:
        if (response.status === 202) {
            return true
        }
        else if (response.status != 202 ){
            return response.data.message
        }
    }
    
    async checkCode(dados) {
        const response = await this.axios.post('/check_code', dados)
        
    }

    async login(dados) {
        console.log("dados: ", dados)
        const response = await this.axios.post('/login', dados)
        // se recebeu um objeto com "{token}":
        if (response.data.token) {
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("token", response.data.token)
            return true

        // se não: já retorna a "{message}" da API
        } else {
            console.log("response.data.message", response.data.message)
            return response.data.message
        }
    } 
}