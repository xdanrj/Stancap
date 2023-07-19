import { Quotes } from "../models/Quotes.js"

export const quotesRoutes = (app) => {

    app.get("/all_quotes", async (req, res) => {
        const response = Quotes.find()
    })

    app.post("/add_quote", async (req,res) => {
        const quote = req.body
        try {
            const newQuote = new Quotes(quote)
            const savedQuote = await newQuote.save()
            res.send({message: "Quote adicionada com sucesso", response: savedQuote})
        } catch (error) {
            res.send({message: error})
        }
    })
}