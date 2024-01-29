import axios from "axios"
import userServices

const userService = new userServices()


const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se o erro tem uma resposta, retorna a resposta mesmo que seja um erro 4xx
        if (error.response) {
            console.log(error)
            if(error.response.status === 498) {
                alert("Token de usuário expirado. Faça login novamente.")
                userService.logout()
            }
            return Promise.resolve(error.response)
        }
        // Se o erro não tem uma resposta, retorna o próprio erro
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem("token")
        console.log("userToken aqui: ", userToken)

        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance