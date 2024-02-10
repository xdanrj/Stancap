import axiosInstance from "./axiosConfig"
const apiUrl = process.env.API_URL
export default class quoteEditingServices {
    constructor() {
        this.axios = axiosInstance
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

    async deleteQuote(quoteId, userId) {
        console.log("quoteId: ", quoteId)
        console.log("userid: ", userId)
        const response = await this.axios.delete('/delete_quote', {quoteId, userId})
        console.log(response)
        if (response.status === 200) {
            return true
        } else {
            return false
        }
    }

}