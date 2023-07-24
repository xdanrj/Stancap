import twilio from "twilio"
import { User } from "../models/User.js";
import userExists from "./commonFunctions.js";

export const loginAndRegisterRoutes = (app) => {
    //variaveis globais para funcionamento da API Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SID
    const client = twilio(accountSid, authToken)
    const secretKey = process.env.SECRET_KEY

    app.post("/login", async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await userExists(email)

            if (user.password == password) {
                const token = createToken(user._id)
                res.send({ email: email, token: token })

            } else if (user.password != password) {
                res.send({ message: "Login/Senha incorreto(s)" })
            }

        } catch (error) { res.send({ error: error }) }

    })

    app.post("/send_code", async (req, res) => {
        try {
            let email = req.body.email
            //verifica se o email ja existe no DB
            let exist = await userExists({ email: email })
            console.log("exist: ", exist)
            if (exist) {
                return res.status(409)
                    .send({ message: "E-mail já cadastrado" });
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
                res.status(202).json({
                    message: "Código de verificação enviado para o e-mail",
                    response: verificationStatus
                })
            }
        } catch (error) { res.send(error.message) }
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
                    const newUser = new User({
                        email: email,
                        verifiedUser: true
                    })
                    const savedUser = await newUser.save()

                    res.status(202).json({
                        message: "E-mail verificado com sucesso",
                        response: savedUser
                    })
                } else {
                    res.status(202).json({
                        message: "Código por e-mail não verificado: tente novamente"
                    })
                }
            }
        } catch (error) { res.send(error.message) }
    })


    app.post("/register", async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const selectedUser = await User.findOne({ email: email })
            // caso o email exista e seja verificado:
            if (selectedUser) {
                if (selectedUser.verifiedUser === true) {
                    const newUser = await User.findOneAndUpdate(
                        // filter
                        { email: email },
                        // update
                        { password: password },
                        // options
                        { new: true }
                    )
                    const savedUser = await newUser.save()

                    res.send({
                        message: "Usuário cadastrado com sucesso",
                        response: savedUser
                    })
                } else if (selectedUser.verifiedUser === false) {
                    res.send({ message: "E-mail não verificado: abortar cadastro" });
                }
            } else {
                res.send({ message: "E-mail não encontrado" });
            }
        } catch (error) { res.send(error.message) }
    })

    function createToken(userId) {
        const payload = {
            userId: userId
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return token
    }

}