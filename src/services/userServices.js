export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://192.168.1.89:3000"
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