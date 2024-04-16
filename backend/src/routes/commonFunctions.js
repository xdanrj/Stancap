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
  let propertiesQuery = _.without(searchQueryKeys, "sort", "page", "type")[0]
  let quotesQtd
  let foundQuote
  let queriesToDo = []
  const successQueries = []
  const failedQueries = []
  quotesQtd = await Quotes.find(searchquery).countDocuments()
  //todo: fazer o biruleibe da roletagem de missingfields com queriestodo no final
  console.log("searchquery:", searchquery)
  if (searchQueryKeys.includes("uploadByUsername")) {
    let foundUser = await User.find({ username: searchquery.uploadByUsername })
    foundUser = foundUser[0]
    if (foundUser) {
      const userId = _.pick(foundUser, "_id")
      const userIdStr = userId._id.toString()
      delete searchquery.uploadByUsername
      let uploadByUsernameQuery = { uploadByUser: userIdStr }
      queriesToDo.push(uploadByUsernameQuery)
    } else {
      //todo: fazer um obj sem value pra key ser pega
      queriesToDo.push({"uploadByUsername": undefined})
    }
  }
  if (searchQueryKeys.includes("tags")) {
    let tagsToSearch = searchquery.tags.split(",")
    tagsToSearch = tagsToSearch.map(tag => tag.trim())
    delete searchquery.tags
    let tagsQuery = { tags: { $in: tagsToSearch } }
    queriesToDo.push(tagsQuery)
  }
  console.log("queriesToDo:", queriesToDo)

  for (const query of queriesToDo) {
    const result = await Quotes.find(query).sort({ uploadDate: sort }).skip(skipItems).limit(limit)
    if (result.length > 0) {
      successQueries.push(...result)
    } else {
      failedQueries.push(Object.keys(query))
    }
  }
  foundQuote = successQueries

  console.log("FFFFFFFFFFFFFFF")
  console.log(successQueries)
  if (foundQuote.length > 0) {
    return { foundQuote, quotesQtd }
  } else {
    console.log("failedqrs:", failedQueries)
    let finalFailedQueries = failedQueries.map((q) => getPropertyLabel(q) || q).join(" • ")
    return { message: `${finalFailedQueries} não encontrado(s)` }
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