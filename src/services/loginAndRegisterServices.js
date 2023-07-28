import axios from "axios";

export class loginAndRegisterServices extends loginAndRegisterInstance{
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    async login(dados) {
        const response = await this.axios.post('/login', dados)
        // se recebeu um objeto com "{token}"
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