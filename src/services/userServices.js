const apiIp = process.env.API_IP

export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: `${apiIp}`
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