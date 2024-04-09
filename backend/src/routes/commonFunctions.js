import { User } from "../models/User.js"
import { Quotes } from "../models/Quotes.js"
import mongoose from "mongoose"
import _ from "lodash"

export const QuotesProperties =
  [{ label: "Autor", value: "author" },
  { label: "Tags", value: "tags" },
  { label: "Source", value: "source" },
  { label: "Upload por", value: "uploadByUsername" },
  { label: "Contexto", value: "context" }]

export function getPropertyLabel(rawValue) {
  let response
  const findLabel = QuotesProperties.find((prop) => prop.value === rawValue)
  findLabel ? response = findLabel.label : response = null
  return response
}

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
export async function selectUser(searchquery) {
  let property = Object.keys(searchquery)[0]
  let target = searchquery[property]
  let query = { [property]: target }

  if (property !== "_id") {
    return false
  }

  let foundUser = await User.find(searchquery).lean()
  if (foundUser) {
    return _.pick(foundUser[0], "username")
  } else {
    return false
  }
}

// Essa função permite selecionar qualquer usuário usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
export async function userExists(proprietyTarget) {
  const user = await User.findOne(proprietyTarget)
  if (user) {
    return user
  }
  else {
    return false
  }
}


export async function selectQuote(searchquery, sort, skipItems = null, limit = null) {
  const searchQueryKeys = Object.keys(searchquery)
  let property = _.without(searchQueryKeys, "sort", "page", "type")[0]
  let quotesQtd
  let foundQuote
  let tagsQuery
  quotesQtd = await Quotes.find(searchquery).countDocuments()

  if (searchQueryKeys.includes("uploadByUsername")) {
    const foundUser = await User.find({ username: searchquery.uploadByUsername })
    const userId = _.pick(foundUser[0], "_id")
    const userIdStr = userId._id.toString()
    delete searchquery.uploadByUsername

    quotesQtd = await Quotes.find(searchquery).countDocuments()
    foundQuote = { uploadByUser: userIdStr, searchquery}
  }

  if (searchQueryKeys.includes("tags")) {
    let tagsToSearch = searchquery.tags.split(",")
    tagsToSearch = tagsToSearch.map(tag => tag.trim())
    delete searchquery.tags

    tagsQuery = { tags: { $in: tagsToSearch }, ...searchquery }
    quotesQtd = await Quotes.find(tagsQuery).countDocuments()
    foundQuote = await Quotes.find(tagsQuery).sort({ uploadDate: sort }).skip(skipItems).limit(limit)
  }

  if (limit !== null && skipItems !== null) {
    foundQuote = await Quotes.find(searchquery).sort({ uploadDate: sort }).skip(skipItems).limit(limit)
  } else {
    foundQuote = await Quotes.find(searchquery)
  }

  if (foundQuote.length > 0) {
    return { foundQuote, quotesQtd }
  } else {
    let message = getPropertyLabel(property) ?
      `${getPropertyLabel(property)} não encontrado(a).` :
      `Propriedade "${property}" não encontrado(a).`

    return { message: message }
  }
}

// Essa função permite selecionar qualquer quote usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
export async function quoteExists(proprietyTarget) {
  const quote = await Quotes.findOne({ proprietyTarget })
  if (quote) {
    return true
  }
  else {
    return false
  }
}