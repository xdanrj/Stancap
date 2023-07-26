import { User } from "../models/User.js"
import axios from "axios"


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
        localStorage.removeItem("token")
        localStorage.removeItem("nome")
        localStorage.removeItem("email")
    }
}