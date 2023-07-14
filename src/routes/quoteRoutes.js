import twilio from "twilio"
import { Quotes } from "../models/Quotes"
import jwt from "jsonwebtoken"

export const quoteRoutes = (app) => {
    app.post("/add_quote", (req, res) => {
        try {

        } catch (error) { res.send(error.message) }
    })
}