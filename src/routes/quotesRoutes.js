import { Quotes } from "../models/Quotes.js"
import { selectQuote, quoteExists } from "./commonFunctions.js"

export const quotesRoutes = (app) => {
  async function functionEditQuote(selectedQuote, body) {
    const entries = Object.entries(body)
    const data = Object.fromEntries(entries.slice(1))
    const firstPropriety = entries[0]
    const query = { [firstPropriety[0]]: firstPropriety[1] }

    if (selectedQuote.length > 1) {
      Quotes.updateMany(
        query,
        { ...data }
      )
    } else if (selectedQuote.length == 1) {
      await Quotes.updateOne(
        query,
        { ...data }
      )
    }
    return true
  }

  async function functionDeleteQuote(query) {
    await Quotes.deleteMany(query)
    return true
  }

  app.get("/all_quotes", async (req, res) => {
    try {
      const response = await Quotes.find()
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  })

  app.post("/search_quote", async (req, res) => {
    try {
      const foundQuote = await selectQuote(req.body)
      res.send(foundQuote)
    } catch (error) {
      res.send(error)
    }
  })

  app.patch("/edit_quote", async (req, res) => {
    console.log(req.body)
    try {
      const selectedQuote = await selectQuote(req.body)
      if (selectedQuote) {
        const response = await functionEditQuote(selectedQuote, req.body)
        response ? res.send(true) : res.send(false)
      } else {
        res.send(false)
      }
    } catch (error) {
      res.send(error)
    }
  })

  app.delete("/delete_quote", async (req, res) => {
    try {
      const response = await functionDeleteQuote(req.body)
      if (response) {
        res.send(true)
      } else {
        res.send(false)
      }
    } catch (error) {
      res.send(error)
    }
  })

  app.post("/add_quote", async (req, res) => {
    const quote = req.body
    try {
      const newQuote = new Quotes(quote)
      const savedQuote = await newQuote.save()
      res.send(savedQuote)
    } catch (error) {
      res.send(error)
    }
  })
}