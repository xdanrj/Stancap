const apiUrl = process.env.API_URL
import axiosInstance from "./axiosConfig"

export default class userServices {
    constructor() {
        this.axios = axiosInstance
    }
    authenticatedUser() {
        return localStorage.getItem("userToken") ? true : false
    }

    async logout() {
        localStorage.removeItem("userToken")  
        localStorage.removeItem("userId")      
        localStorage.removeItem("userName")
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