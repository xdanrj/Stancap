import { Quotes } from "../models/Quotes.js"
import { selectQuote, quoteExists } from "./commonFunctions.js"
import requireToken from "./middleware.js"

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

  app.get("/all_quotes", async (req, res) => {
    try {
      const response = await Quotes.find()
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({message: error})
    }
  })

  app.post("/search_quote", async (req, res) => {
    try {
      const foundQuote = await selectQuote(req.body)
      res.status(200).json(foundQuote)
    } catch (error) {
      res.status(400).json({message: error})
    }
  })

  app.patch("/edit_quote", requireToken, async (req, res) => {
    try {
      const selectedQuote = await selectQuote(req.body)
      if (selectedQuote) {
        const response = await functionEditQuote(selectedQuote, req.body)
        response ? res.status(200).send(true) : res.status(400).send(false)
      } else {
        res.status(400).send(false)
      }
    } catch (error) {
      res.status(400).json({message: error})
    }
  })

  app.delete("/delete_quote/:quoteId/:userId", requireToken, async (req, res) => {
    try {
      const quoteId = {_id: req.params.quoteId}
      const userId = req.params.userId
      const selectedQuote = await selectQuote(quoteId)
      if(selectedQuote[0].uploadByUser === userId){
        const response = await Quotes.deleteMany(quoteId)
        console.log(response.deletedCount)
        console.log(response)
        if(response.deletedCount > 0) {
          console.log("quote deletada")
          res.status(200).send(true)
        }
      } else {
        console.log("nao deletada")
        res.status(400).send(false)
      }
      //console.log(selectedQuote[0])
      /*if (response) {
        
      } else {
        
      }*/
    } catch (error) {
      res.status(400).json({message: error})
    }
  })

  app.post("/add_quote", requireToken, async (req, res) => {
    const quote = req.body
    try {
      const newQuote = new Quotes(quote)
      const savedQuote = await newQuote.save()
      res.status(200).json(savedQuote)
    } catch (error) {
      res.status(400).json({message: error})
    }
  })
}