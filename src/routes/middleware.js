import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secretKey = process.env.SECRET_KEY

const requireToken = (req, res, next) => {
    let userToken
    if(req.headers['authorization']){
        const rawUserToken = req.headers['authorization']
        userToken = rawUserToken.replace('Bearer ', '').trim()
    }
    else{
        res.send({message: "Sem header de token de autorização."})
    }

    if(!userToken) {
        return res.status(401).json({message: "Token de usuário não fornecido. Faça login."})
    }

    try {
        const legitToken = jwt.verify(userToken, secretKey)
        if(legitToken) {
            next()
        } else {
            return res.status(401).json({message: "Token de usuário inválido. Faça login."})
        }
    } catch (error) {
        console.log("caiu no catcherror")
        if (error instanceof jwt.TokenExpiredError) {            
            res.redirect('/login')
            return res.status(498).json({ message: "Token de usuário expirado. Faça login novamente." })
            
        }
    }
}

export default requireToken