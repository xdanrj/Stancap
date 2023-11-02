import axios from "axios"

export default class quoteEditingServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://192.168.1.65:3000"
        })
    }

    async getAllQuotes() {
        const response = await this.axios.get('/all_quotes')
        if (response.data.response) {
            return response.data.response
        } else {
            return response.data.message
        }
    }

    async getQuote(dados) {
        console.log(dados)
        const response = await this.axios.post('/search_quote', dados)
        console.log(response)
        if (response.data.response) {
            return response.data.response
        } else {
            return response.data.message
        }
    }

    async addQuote(dados) {
        const response = await this.axios.post('/add_quote', dados)
        if (response.data.response) {
            return true
        } else {
            return response.data.message
        }
    }

    async editQuote(query, body) {
        console.log({query, body})
        const response = await this.axios.patch('/edit_quote', {...query, ...body})
        if (response.data.response) {
            return true
        } else {
            return response.data.message
        }
    }
}