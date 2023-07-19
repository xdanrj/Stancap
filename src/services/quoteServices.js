import { Quotes } from "../models/Quotes"
import axios from "axios"

export default class quoteServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    async addQuote(dados){
        const response = await this.axios.post('/add_quote', dados)

    // se recebeu um objeto com "{response}"
    if (response.data.response){
        return true
    } else {
        return response.data.message
    }
}
}