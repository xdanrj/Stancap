import { User } from "../models/User.js";
import userExists from "./commonFunctions.js";

export const loginAndRegisterRoutes = (app) => {

    app.post("/login", async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await userExists({ email: email })

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
            let exist = userExists({ email: email })
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

            const exist = userExists({ email: email })

            if (!exist) {

                const verification_check = await client.verify.v2.services(verifySid)
                    .verificationChecks
                    .create({ to: email, code: otpCode })

                const verificationCheckStatus = verification_check.status

                //caso o codigo verificado por email seja aprovado, cria o User por enquanto apenas com o email:
                if (verificationCheckStatus == "approved") {
                    const newUser = new User({
                        email: email
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
            // na rota anterior o email verificado sera guardado no localstorage
            const email = req.body.email
            const username = req.body.username
            const password = req.body.password
            const selectedUser = await userExists({ email: email })
            // caso o email seja novo:
            if (!selectedUser) {
                const newUser = new User(
                    // filter
                    { email: email },
                    // update
                    { username: username },
                    { password: password },
                    // options
                    { new: true }
                )
                const savedUser = await newUser.save()

                res.send({
                    message: "Usuário cadastrado com sucesso",
                    response: savedUser
                })

            } else {
                res.send({ message: "E-mail já registrado" });
            }
        } catch (error) {
            res.send({ message: error.message })
            console.log(error)
        }
    })

    function createToken(userId) {
        const payload = {
            userId: userId
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return token
    }

}