import axios from "axios"
const apiUrl = process.env.API_URL
const userToken = localStorage.getItem("token")
console.log("userToken aqui: ", userToken)
export default class quoteEditingServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3000"
        })
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    }

    async getAllQuotes() {
        try {
            const response = await this.axios.get('/all_quotes')
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error)
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
        console.log(response)
        if (response.data) {
            return true
        } else {
            return false
        }
    }

    async deleteQuote(query) {
        const response = await this.axios.delete('/delete_quote', query)
        if (response) {
            return true
        } else {
            return false
        }
    }
}