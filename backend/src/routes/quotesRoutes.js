import { Quotes } from "../models/Quotes.js"
import { selectQuote, quoteExists } from "./commonFunctions.js"
import { requireUserToken, reqLimit } from "./middleware.js"
import _ from "lodash"

export const quotesRoutes = (app) => {
  //resultados perPage para todas as rotas com limite de resultado. padrao: 5
  const perPage = 5
  async function functionEditQuote(selectedQuote, newBody) {
    console.log("NEWBODY")
    console.log(newBody)
    // const entries = Object.entries(body)
    // const data = Object.fromEntries(entries.slice(1))
    // const firstPropriety = entries[0]
    // const query = { [firstPropriety[0]]: firstPropriety[1] }

    if (selectedQuote.length > 1) {
      Quotes.updateMany(
        query,
        { ...newBody }
      )
    } else if (selectedQuote.length == 1) {
      await Quotes.updateOne(
        query,
        { ...data }
      )
    }
    return true
  }

  // toda rota/ serviço que nao tiver "all" no nome retornará até 5 itens
  //todas as quotes SEM limite
  app.get("/all_quotes", reqLimit(200), async (req, res) => {
    try {
      const response = await Quotes.find()
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  //busca especifica SEM limite
  app.post("/search_all_quotes", reqLimit(200), async (req, res) => {
    try {
      const response = await selectQuote(req.body)
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  //todas as quotes COM limite de 5 por page
  app.get(`/get_quotes`, reqLimit(200), async (req, res) => {
    try {
      const sort = req.query.sort === "ascending" ? 1 : -1
      const page = req.query.page ? parseInt(req.query.page) : 1
      const skipItems = (page - 1) * perPage
      const quotesQtd = await Quotes.countDocuments()
      const response = await Quotes.find().sort({ uploadDate: sort }).skip(skipItems).limit(perPage)
      res.status(200).json({ response, quotesQtd })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })


  //busca especifíca COM limite de 5 por page
  app.get("/search_quotes", reqLimit(200), async (req, res) => {
    try {
      const searchquery = _.omit(req.query, ['page', 'sort'])
      const sort = req.query.sort === "ascending" ? 1 : -1
      const page = req.query.page ? parseInt(req.query.page) : 1
      const skipItems = (page - 1) * perPage
      const response = await selectQuote(searchquery, sort, skipItems, perPage)
      console.log("ppp")
      console.log(response)
      res.status(200).json(response)
    } catch (error) {
      console.log("errorota:", error)
      res.status(400).json({ message: error })
    }
  })

  app.patch("/edit_quote", reqLimit(40), requireUserToken, async (req, res) => {
    try {
      console.log("req.query: ", req.query)
      console.log("rqbody: ", req.body)
      const selectedQuote = await selectQuote(req.query)
      if (selectedQuote) {
        const response = await functionEditQuote(selectedQuote, req.body)
        response ? res.status(200).send(true) : res.status(400).send({ message: "Erro ao editar quote" })
      } else {
        res.status(400).send(false)
      }
    } catch (error) {
      res.status(400).json({ message: error })
    }
  })

  app.delete("/delete_quote", reqLimit(25), requireUserToken, async (req, res) => {
    try {
      const quoteId = { _id: req.query.quoteId }
      const userId = req.query.userId
      let findingQuote = (await selectQuote(quoteId)).foundQuote
      let selectedQuote = findingQuote[0]

      if (selectedQuote.uploadByUser === userId) {
        const response = await Quotes.deleteMany(quoteId)
        if (response.deletedCount > 0) {
          res.status(200).send({ selectedQuote })
        }
      } else {
        res.status(400).send({ message: "Você não tem permissão para excluir essa quote" })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })

  app.post("/add_quote", reqLimit(50), requireUserToken, async (req, res) => {
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