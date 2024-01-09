import twilio from "twilio"
import { User } from "../models/User.js";
import { userExists } from "./commonFunctions.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const loginAndRegisterRoutes = (app) => {
    //variaveis globais para funcionamento da API Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SID
    const client = twilio(accountSid, authToken)
    const secretKey = process.env.SECRET_KEY
    const apiUrl = process.env.API_URL

    app.get("/testando", async (req, res) => {
        try {
            res.status(200).json({
                accountSid: accountSid,
                authToken: authToken,
                verifySid: verifySid,
                client: client,
                secretKey: secretKey,
                apiUrl: apiUrl
            })
        } catch (error) { res.status(400).json({message: error}) }
    })

    app.post("/login", async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await userExists({ email: email })
            const correctCredentials = await bcrypt.compare(password, user.password)
            console.log("correctCredentials: ", correctCredentials)
            if (correctCredentials) {
                const token = createToken(user._id)
                res.status(200).json({ email: email, username: user.username, token: token })
            } else if (!correctCredentials) {
                console.log("caiu no elseif")
                res.status(401).json({ message: "Login/Senha incorreto(s)" })
            }
        } catch (error) {
            console.log(error)
             res.status(400).json({message: error}) }

    })
    app.post("/send_code", async (req, res) => {
        try {
            const email = req.body.email
            //verifica se o email ja existe no DB
            let exist = await userExists({ email: email })

            if (exist) {
                res.status(409).json({ message: "E-mail já cadastrado" });
            }
            else if (!exist) {
                const verification = await client.verify.v2.services(verifySid)
                    .verifications.create({
                        channelConfiguration: {
                            template_id: 'd-ab018621f4d84d32a83a746a5f69053e',
                            from: 'stancapdb@gmail.com',
                            from_name: 'Stancap'
                        }, to: email, channel: 'email'
                    })

                const verificationStatus = verification.status
                console.log(`verification.status: ${verificationStatus}`)
                res.status(200).json({
                    message: "Código de verificação enviado para o e-mail",
                    response: verificationStatus
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error}) }
    })

    app.post("/check_code", async (req, res) => {
        try {
            let email = req.body.email
            let otpCode = req.body.code

            const exist = await userExists({ email: email })
            if (!exist) {
                const verification_check = await client.verify.v2.services(verifySid)
                    .verificationChecks
                    .create({ to: email, code: otpCode })
                const verificationCheckStatus = verification_check.status
                //caso o codigo verificado por email seja aprovado, cria o User por enquanto apenas com o email:
                if (verificationCheckStatus == "approved") {
                    res.status(200).json({
                        message: "E-mail verificado com sucesso",
                        response: email
                    })
                } else {
                    res.status(400).json({
                        message: "Código inválido ou expirado: tente novamente"
                    })
                }
            }
        } catch (error) { res.status(400).json({message: error}) }
    })

    app.post("/register", async (req, res) => {
        try {
            // na rota anterior o email verificado sera guardado no localstorage (??nao sei, hein?? ignorar isso aqui talvez?)
            const email = req.body.email
            const username = req.body.username
            let password
            const selectedUser = await userExists({ email: email })
            try {
                password = await bcrypt.hash(req.body.password, 10)
                console.log("hash de senha gerado: ", password)
            } catch (error) {
                res.status(400).json({message: error})
            }
            // caso o email seja novo (condição redundante (segurança extra) pois a rota "/register" só será acessada caso a verificação por código (rota anterior) seja bem sucedida)
            if (!selectedUser) {
                const newUser = new User({
                    // email será auto preenchido puxando no localStorage
                    username: username,
                    email: email,
                    password: password
                })
                const savedUser = await newUser.save()

                res.status(200).json({
                    message: "Usuário cadastrado com sucesso",
                    response: savedUser
                })
            } else if (selectedUser) {
                res.status(409).json({ message: "E-mail já cadastrado" });
            }
        } catch (error) { res.status(400).json({message: error}) }
    })

    function createToken(userId) {
        const payload = {
            userId: userId
        }
        // atencao: alterar pra 1h
        const token = jwt.sign(payload, secretKey, { expiresIn: '1m' })
        return token
    }
}