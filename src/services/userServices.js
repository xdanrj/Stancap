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

    async getUsername(userId) {
        console.log(userId)
        const response = await this.axios.post('/search_user', {_id: userId})
        if (response.data) {
            return response.data
        } else {
            return false
        }
    }

    async allUsers() {
        const response = await this.axios.get('/all_users')
        return response.data
        
    }
}