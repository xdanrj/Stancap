import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET_KEY

const requireToken = (req, res, next) => {
    const rawUserToken = req.headers['authorization']
    const userToken = rawUserToken.replace('Bearer ', '').trim()
    console.log("header Authorization aqui: ", userToken)

    if(!userToken) {
        return res.status(401).json({message: "Token de usuário não fornecido. Faça login."})
    }

    try {
        console.log("secretKey: ", secretKey)
        console.log("userToken: ", userToken)
        const legitToken = jwt.verify(userToken, secretKey)
        console.log(legitToken)
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