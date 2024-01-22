const apiUrl = process.env.API_URL


export default class userServices {
  
    authenticatedUser() {
        return localStorage.getItem("token") ? true : false
    }

    async logout() {
        localStorage.removeItem("token")  
        localStorage.removeItem("userId")      
    }
}