const apiUrl = process.env.API_URL

export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: apiUrl
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