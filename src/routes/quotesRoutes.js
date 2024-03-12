import { Quotes } from "../models/Quotes.js"
import { selectQuote, quoteExists } from "./commonFunctions.js"
import { requireUserToken } from "./middleware.js"


export const quotesRoutes = (app) => {
  //resultados perPage para todas as rotas com limite de resultado. padrao: 5
  const perPage = 5
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

  app.get("/quotes_quantity", async (req, res) => {
    const quotesQtd = await Quotes.countDocuments()
    console.log(quotesQtd)
    res.status(200).json(quotesQtd)
  })

  // toda rota/ serviço que nao tiver "all" no nome retornará até 5 itens
  //todas as quotes SEM limite
  app.get("/all_quotes", async (req, res) => {
    try {
      const response = await Quotes.find()
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  //busca especifica SEM limite
  app.post("/search_all_quotes", async (req, res) => {
    try {
      const foundQuote = await selectQuote(req.body)
      res.status(200).json(foundQuote)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  //todas as quotes COM limite de 5 por page
  app.get(`/get_quotes`, async (req, res) => {
    try {
      const sort = req.query.sort === "ascending" ? 1 : -1
      const page = req.query.page ? parseInt(req.query.page) : 1
      console.log("page: ", page)
      const skipItems = (page - 1) * perPage
      const response = await Quotes.find().sort({uploadDate: sort}).skip(skipItems).limit(perPage)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })


  //busca especifíca COM limite de 5 por page
  app.get("/search_quotes", async (req, res) => {
    try {
      console.log("req.query abaixo: ")
      console.log(req.url.query)
      const sort = req.query.sort === "ascending" ? 1 : -1
      console.log("sort:", sort)
      const page = req.query.page ? parseInt(req.query.page) : 1
      const skipItems = (page - 1) * perPage
      const foundQuote = await selectQuote(req.body, sort, skipItems, perPage)
      res.status(200).json(foundQuote)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  app.patch("/edit_quote", requireUserToken, async (req, res) => {
    try {
      const selectedQuote = await selectQuote(req.body)
      if (selectedQuote) {
        const response = await functionEditQuote(selectedQuote, req.body)
        response ? res.status(200).send(true) : res.status(400).send(false)
      } else {
        res.status(400).send(false)
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  app.delete("/delete_quote/:quoteId/:userId", requireUserToken, async (req, res) => {
    try {
      const quoteId = { _id: req.params.quoteId }
      const userId = req.params.userId
      const selectedQuote = await selectQuote(quoteId)
      console.log(selectedQuote[0])
      if (selectedQuote[0].uploadByUser === userId) {
        const response = await Quotes.deleteMany(quoteId)
        console.log(response.deletedCount)
        console.log(response)
        if (response.deletedCount > 0) {
          console.log("quote deletada")
          res.status(200).send(selectedQuote[0])
        }
      } else {
        console.log("nao deletada")
        res.status(400).send(false)
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  app.post("/add_quote", requireUserToken, async (req, res) => {
    const quote = req.body
    try {
      const newQuote = new Quotes(quote)
      const savedQuote = await newQuote.save()
      res.status(200).json(savedQuote)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })
}