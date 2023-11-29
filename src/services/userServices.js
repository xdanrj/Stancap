import axios from "axios"
const apiUrl = process.env.API_URL

export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    usuarioAutenticado() {
        return localStorage.getItem("token") ? true : false
    }

    async logout() {
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        localStorage.removeItem("token")
    }
}