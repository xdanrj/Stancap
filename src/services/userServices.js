const apiUrl = process.env.API_URL


export default class userServices {
  
    authenticatedUser() {
        return localStorage.getItem("token") ? true : false
    }

    async logout() {
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        localStorage.removeItem("token")        
    }
}