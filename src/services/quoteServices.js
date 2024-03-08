import axiosInstance from "./axiosConfig"
const apiUrl = process.env.API_URL
export default class quoteEditingServices {
    constructor() {
        this.axios = axiosInstance
    }

    async quotesQuantity() {
        try {
            const response = await this.axios.get('/quotes_quantity')
            return response
        } catch (error) {
            console.log(error)
        }
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

    async searchAllQuotes(data) {
        const response = await this.axios.post('/search_all_quotes', data)
        if (response.data) {
            return response.data
        } else {
            return false
        }
    }

    async getQuotes(actualPage) {
        const response = await this.axios.get(`/get_quotes?page=${actualPage}`)
        console.log(response)
        if (response.data) {
            return response.data
        } else {
            console.log(response)
            return false
        }
    }

    async searchQuotes(data, actualPage) {
        const response = await this.axios.post(`/search_quotes?page=${actualPage}`, data)
        if (response.data) {
            return response.data
        } else {
            return false
        }
    }

    async addQuote(data) {
        const response = await this.axios.post('/add_quote', data)
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
        const data = {quoteId, userId}
        console.log(quoteId)
        console.log(userId)
        const response = await this.axios.delete(`/delete_quote/${quoteId}/${userId}`)
        console.log(response.data)
        if (response.status === 200) {
            return response.data
        } else {
            return false
        }
    }

}