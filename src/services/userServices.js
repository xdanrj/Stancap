const apiUrl = process.env.API_URL
import axiosInstance from "./axiosConfig"

export default class userServices {
    constructor() {
        this.axios = axiosInstance
    }
    authenticatedUser() {
        return localStorage.getItem("token") ? true : false
    }

    async logout() {
        localStorage.removeItem("token")  
        localStorage.removeItem("userId")      
    }

    async allUsers() {
        const response = await this.axios.get('/all_users')
        console.log(response)
    }
}