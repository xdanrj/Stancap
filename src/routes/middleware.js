import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secretKey = process.env.SECRET_KEY

const requireToken = (req, res, next) => {
    console.log(req.headers)
    if(req.headers['authorization']){
        const rawUserToken = req.headers['authorization']
        const userToken = rawUserToken.replace('Bearer ', '').trim()
    }
    else{
        alert("sem headers['authorization']")
    }
    
    console.log("header Authorization aqui: ", userToken)

    if(!userToken) {
        return res.status(401).json({message: "Token de usuário não fornecido. Faça login."})
    }

    try {
        console.log("secretKey aquii: ", secretKey)
        console.log("userToken: ", userToken)
        const legitToken = jwt.verify(userToken, secretKey)
        console.log("legitToken foi? ", legitToken)
        if(legitToken) {
            next()
        } else {
            return res.status(401).json({message: "Token de usuário inválido. Faça login."})
        }
    } catch (error) {
        console.log("caiu no catcherror")
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(498).json({ message: "Token de usuário expirado. Faça login novamente." });
        }
    }
}

export default requireToken