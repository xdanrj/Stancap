import twilio from "twilio"
import { User } from "../models/User.js"
import { selectUser, userExists } from "./commonFunctions.js"
import requireToken from "./middleware.js"

export const userRoutes = (app) => {
  //variaveis globais para funcionamento da API Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const verifySid = process.env.TWILIO_VERIFY_SID
  const client = twilio(accountSid, authToken)
  const secretKey = process.env.SECRET_KEY

  async function functionEditUser(query, body) {
    const entries = Object.entries(body)
    const data = Object.fromEntries(entries.slice(1))

    if (query.quantity > 1) {
      await User.updateMany(
        query.query,
        { ...data }
      )
    }
    else if (query.quantity == 1) {
      await User.updateOne(
        query.query,
        { ...data },
      )
    }
    return query
  }

  // essa rota é realmente necessária?
  /*app.get("/all_users", requireToken, async (req, res) => {
    try {
      const response = await User.find()
      res.status(200).send(response)
    } catch (error) { res.status(400).json({ message: error }) }
  })*/

  app.post("/search_user", async (req, res) => {
    try {
      const foundUser = await selectUser(req.body)
      res.status(200).json(foundUser.username)
    } catch (error) {
      res.status(400).json({ message: error }) }
  })

  app.patch("/edit_user", requireToken, async (req, res) => {
    try {
      const selectedUser = await selectUser(req.body)
      const response = await functionEditUser(selectedUser, req.body)
      res.status(200).json(response)
    } catch (error) { res.status(400).json({ message: error }) }
  })

  app.post("/change_password_send", async (req, res) => {
    try {
      const email = req.body.email
      const selectedUser = await userExists({ email: email })
      if (selectedUser) {
        const verification = await client.verify.v2.services(verifySid)
          .verifications.create({
            channelConfiguration: {
              template_id: 'd-ab018621f4d84d32a83a746a5f69053e',
              from: 'stancapdb@gmail.com',
              from_name: 'Stancap'
            }, to: email, channel: 'email'
          })
        res.status(200).json({
          message: "Código de verificação enviado para o e-mail",
          response: selectedUser
        })
      } else {
        res.status(200).json({ message: "E-mail não encontrado" })
      }
    } catch (error) { res.status(400).json({ message: error }) }
  })

  app.post("/change_password_check", async (req, res) => {
    try {
      const otpCode = req.body.code
      const email = req.body.email
      const newPassword = req.body.newPassword

      const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({ to: email, code: otpCode })

      if (verification_check.status == "approved") {
        const selectedUser = await User.updateOne(
          { email: email },
          { password: newPassword })
        res.status(200).json({
          message: "Senha alterada com sucesso",
          response: selectedUser
        })
      } else {
        res.status(400).json({ message: "Código de verificação incorreto ou expirado" })
      }
    } catch (error) { res.status(400).json({ message: error }) }
  })
}