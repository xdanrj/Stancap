import axios from "axios"
const apiUrl = process.env.API_URL

export default class quoteEditingServices {
    constructor() {
        this.axios = axios.create({
            baseURL: `${apiUrl}`
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