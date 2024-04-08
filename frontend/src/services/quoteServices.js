import axiosInstance from "./axiosConfig"
const apiUrl = process.env.API_URL
export default class quoteEditingServices {
    constructor() {
        this.axios = axiosInstance
    }

    //service/route sem utilidade ate entao \/
    async quotesQuantity() {
        try {
            const response = await this.axios.get('/quotes_quantity')
            console.log(response)
            return response.data
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

    async getQuotes(params) {
        const response = await this.axios.get(`/get_quotes`, { params })
        console.log(response)
        if (response.data) {
            return response.data
        } else {
            console.log(response)
            return false
        }
    }

    async searchQuotes(params) {
        const response = await this.axios.get(`/search_quotes`, { params })
        if (response) {
            return response.data
        }
    }

    async addQuote(data) {
        try {
            const response = await this.axios.post('/add_quote', data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }

    async editQuote(params, updatedBody) {
        try {
            console.log(params)
            console.log(updatedBody)
            const response = await this.axios.patch(`/edit_quote`, updatedBody, {params: params})
            console.log(response)
            return true
        } catch (error) {
            return error.response.data
        }
    }

    async deleteQuote(quoteId, userId) {
        try {
            const params = { quoteId, userId }
            const response = await this.axios.delete('/delete_quote', { params })
            console.log(response.data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
}