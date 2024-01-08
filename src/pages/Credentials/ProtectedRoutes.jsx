import React, { useEffect } from "react"
import userServices from "../../services/userServices"
import { useNavigate } from "react-router-dom"
const userService = new userServices()

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const isAuthenticated = userService.authenticatedUser()

    useEffect(() => {
        if (!isAuthenticated) {
            alert("Você precisa estar logado para acessar essa página")
            navigate('/login')
        }
    }, [isAuthenticated])

    console.log("ta autenticado? ", isAuthenticated)
    return isAuthenticated ? children : null
}

export default ProtectedRoutes