import twilio from "twilio"
import { User } from "../models/User.js"

export const registerRoutes = (app) => {
  //variaveis globais para funcionamento da API Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const verifySid = process.env.TWILIO_VERIFY_SID
  const client = twilio(accountSid, authToken);

  app.post("/send_email", async (req, res) => {
    try {
      let exist
      let email = req.body.email
      //verifica se o email ja existe no DB
      exist = await User.findOne({ email: email })
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

  app.post("/check_email", async (req, res) => {
    try {
      let email = req.body.email
      let otpCode = req.body.code

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

  app.post("/change_password_send", async (req, res) => {
    try {
      const email = req.body.email

      // procura no banco de dados se o usuario existe
      const exist = await User.findOne({ email: email }).count()

      if (exist == 1) { // verifica se algum usuario foi encontrado
        // funcao que envia o codigo para o email
        const verification = await client.verify.v2.services(verifySid)
        .verifications.create({
          channelConfiguration: {
            template_id: 'd-ab018621f4d84d32a83a746a5f69053e',
            from: 'stancapdb@gmail.com',
            from_name: 'Stancap'
          }, to: email, channel: 'email'
        }) 
        res.status(200).send({ message: "Código de verificação enviado para o e-mail" })
      } else if (exist == 0) { // verifica se algum usuario foi encontrado
        res.status(404).send({ message: "E-mail não encontrado" })
      }

    } catch (error) { res.status(500).send(error) }
  })

  app.post("/change_password_check", async (req, res) => {
    try {
      const otpCode = req.body.code
      const email = req.body.email
      const newPassword = req.body.newPassword

      const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({ to: email, code: otpCode })

      if (verification_check.status == "approved") { // verificacao se o codigo esta certo
        const user = await User.updateOne({ email: email }, { $set: { password: newPassword } })
        res.status(202).send({ message: "Senha alterada com sucesso" })
      } else {
        res.status(401).send({ message: "Código de verificação incorreto" })
      }
    } catch (error) { res.status(500).send(error) }
  })

}