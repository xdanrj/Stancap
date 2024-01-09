import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET_KEY

const requireToken = (req, res, next) => {
    const userToken = req.headers['Authorization']

    if(!userToken) {
        return res.status(401).json({message: "Token de usuário não fornecido. Faça login."})
    }

    try {
        const legitToken = jwt.verify(userToken, secretKey)
        if(legitToken) {
            next()
        } else {
            return res.status(401).json({message: "Token de usuário inválido. Faça login"})
        }
    } catch (error) {
        return res.status(401).json({message: error})
    }
}

export default requireToken