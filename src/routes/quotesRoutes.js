import { Quotes } from "../models/Quotes.js"
import { selectQuote, quoteExists } from "./commonFunctions.js"

export const quotesRoutes = (app) => {

    async function functionEditQuote(query, body) {
        const entries = Object.entries(body)
        const data = Object.fromEntries(entries.slice(1))
    
        if (query.quantity > 1) {
          await Quotes.updateMany(
            query.query,
            { ...data }
          )
        }
        else if (query.quantity == 1) {
          await Quotes.updateOne(
            query.query,
            { ...data },
          )
        }
        return query
      }
    
      async function functionDeleteQuote(query) {
        if (query.quantity > 1) {
          await Quotes.deleteMany(
            query.query
          )
        }
        else if (query.quantity == 1) {
          await Quotes.deleteOne(
            query.query
          )
        }
        return query
      }

    app.get("/all_quotes", async (req, res) => {
        const response = Quotes.find()
        res.send({response: response})
    })

    app.get("/search_quote", async (req, res) => {
        try {
          const foundQuote = await selectQuote(req.body)
          res.send({response: foundQuote.response})
        } catch (error) {
          res.send(error.message)
        }
      })

      app.patch("/edit_quote", async (req, res) => {
        try {
          const selectedQuote = await selectQuote(req.body)
          const response = await functionEditQuote(selectedQuote, req.body)
          res.send(response)
        } catch (error) {
          res.send(error.message)
        }
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