import { Quotes } from "../models/Quotes"
import axios from "axios"

export default class quoteServices {
    constructor() {
        this.axios = axios.create({
            baseURL: window.location.hostname === "localhost" ? "http://localhost:3000" : "http://192.168.1.65:3000"
        })
    }

    async getAllQuotes(){
        const response = await this.axios.get('/all_quotes')
        if (response.data.response) {
            return response.data.response
        } else {
            return response.data.message
        }
    }

    async getQuote(dados) {
        const response = await this.axios.get('/search_quote', dados)
        if (response.data.response) {
            return response
        } else {
            return response.data.message
        }
    }

    async addQuote(dados) {
        const response = await this.axios.post('/add_quote', dados)
        // se recebeu um objeto com "{response}"
        if (response.data.response) {
            return true
        } else {
            return response.data.message
        }
    }

   
}