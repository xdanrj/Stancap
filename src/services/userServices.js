import twilio from "twilio"
import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import axios from "axios"

export default class userServices {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.APP_API_URL
        })
    }

    async login (dados) {
        const {data} = await this.axios.post('/login', dados)

        if (data.status == 200) {
        localStorage.setItem("email", data.user.email)
        localStorage.setItem("token", data.token)

        return true
        }

        return
    }

}