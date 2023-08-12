export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
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