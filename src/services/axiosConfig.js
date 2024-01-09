import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

// Adicione um interceptor de resposta para lidar com erros
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se o erro tem uma resposta, retorna a resposta mesmo que seja um erro 4xx
        if (error.response) {
            return Promise.resolve(error.response);
        }
        // Se o erro não tem uma resposta, retorna o próprio erro
        return Promise.reject(error);
    }
);

export default axiosInstance