import axios from "axios"

export default class quoteEditingServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://192.168.1.89:3000"
        })
    }

    async getAllQuotes() {
        const response = await this.axios.get('/all_quotes')
        if (response.data) {
            return response.data
        } else {
            return false
        }
    }

    async getQuote(dados) {
        const response = await this.axios.post('/search_quote', dados)
        if (response.data) {
            return response.data
        } else {
            return false
        }
    }

    async addQuote(dados) {
        const response = await this.axios.post('/add_quote', dados)
        if (response.data) {
            return true
        } else {
            return false
        }
    }

    async editQuote(query, body) {
        const response = await this.axios.patch('/edit_quote', { ...query, ...body })
        if (response.data) {
            return true
        } else {
            return false
        }
    }

    async deleteQuote(query) {
        console.log(query)
        const response = await this.axios.delete('/delete_quote', query)
        if (response) {
            return true
        } else {
            return false
        }
    }
}