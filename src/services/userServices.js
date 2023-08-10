export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: window.location.hostname === "localhost" ? "http://localhost:3000" : "http://192.168.1.65:3000"
        })
    }

    usuarioAutenticado() {
        return localStorage.getItem("token") != undefined ? true : false
    }

    async logout() {
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        localStorage.removeItem("token")
    }
}