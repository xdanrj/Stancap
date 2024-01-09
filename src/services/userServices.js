import axiosInstance from "./axiosConfig"
const apiUrl = process.env.API_URL

export default class userServices {
    constructor() {
        this.axios = axiosInstance
    }

    authenticatedUser() {
        return localStorage.getItem("token") ? true : false
    }

    async logout() {
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        localStorage.removeItem("token")
    }
}