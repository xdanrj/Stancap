import React from "react"
import userServices from "../../services/userServices"
import { useNavigate } from "react-router-dom"
const userService = new userServices()

const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()
    const isAuthenticated = userService.authenticatedUser()
    console.log("ta autenticado? ", isAuthenticated)
    return isAuthenticated ? children : navigate('/login')
}

export default ProtectedRoutes