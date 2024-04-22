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
export async function selectUser(searchQuery) {
  let property = Object.keys(searchQuery)[0]
  let target = searchQuery[property]
  let query = { [property]: target }

  if (property !== "_id") {
    return false
  }

  let foundUser = await User.find(searchQuery).lean()
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

export async function selectQuote(searchQueryArg, sort, skipItems = null, limit = null) {
  console.log("qqqqqqqqqqqqqqqqq")
  console.log(searchQueryArg)
  const searchQueryKeys = Object.keys(searchQueryArg)
  const searchQuery = searchQueryArg
  console.log("searchQuery:", searchQuery)
  //let propertiesQuery = _.without(searchQueryKeys, "type")[0]
  let quotesQtd
  let foundQuote
  let queriesToDo = {}
  let successQueries = []
  let failedQueries = []
  quotesQtd = await Quotes.find(searchQuery).countDocuments()
  console.log("searchQuery:", searchQuery)

  console.log("searchQuery: ", searchQuery)
  if (searchQueryKeys.includes("uploadByUsername")) {
    console.log("entrou no if upuser")
    let foundUser = await User.find({ username: searchQuery.uploadByUsername })
    foundUser = foundUser[0]
    if (foundUser) {
      const userId = _.pick(foundUser, "_id")
      const userIdStr = userId._id.toString()
      delete searchQuery.uploadByUsername
      let uploadByUsernameQuery = { uploadByUser: userIdStr }
      queriesToDo = { ...queriesToDo, ...uploadByUsernameQuery }
    } else {
      queriesToDo = { ...queriesToDo, ...{ "uploadByUsername": null } }
    }
  }

  if (searchQueryKeys.includes("tags")) {
    let tagsToSearch = searchQuery.tags.split(",")
    tagsToSearch = tagsToSearch.map(tag => tag.trim())
    delete searchQuery.tags
    let tagsQuery = { tags: { $in: tagsToSearch } }
    queriesToDo = { ...queriesToDo, ...tagsQuery }
  }

  queriesToDo = { ...queriesToDo, ...searchQuery }

  for (const [key, value] of Object.entries(queriesToDo)) {
    const result = await Quotes.find({ [key]: value }).sort({ uploadDate: sort }).skip(skipItems).limit(limit)
    if (result.length > 0) {
      successQueries.push(...result)
    } else {
      failedQueries.push({ [key]: value })
    }
  }
  console.log("failed pré assign: ", failedQueries)
  failedQueries = Object.assign({}, ...failedQueries)
  console.log("successQueries: ", successQueries)
  console.log("failedQueries: ", failedQueries)
  console.log("failedQueries KEYS: ", _.keys(failedQueries))

  let propsNotFound = []
  _.keys(failedQueries).forEach((failedQuery) => {
    propsNotFound.push(Object.entries(failedQuery).filter(([key, value]) => successQueries[key] !== value))
  })

  
  console.log("propsNotFound")
  console.log(propsNotFound)
  
  // if (propsNotFound.length > 0) {
  //   let txt = `Para o documento com _id ${doc._id}, as seguintes propriedades não correspondem: ${propsNotFound.join(" • ")}`
  //   console.log(txt)
  //   return { message: txt }
  // } else {
  //   let txt = `Para o documento com _id ${doc._id}, todas as propriedades correspondem.`
  //   console.log(txt)
  //   return { foundQuote: docs, message: txt }
  // }


  // return response

  // if (foundQuote.length > 0) {
  //   return { foundQuote, quotesQtd }
  // } else {
  //   console.log("failedqrs:", failedQueries)
  //   let finalFailedQueries = failedQueries.map((q) => getPropertyLabel(q) || q).join(" • ")
  //   return { message: `${finalFailedQueries} não encontrado(s)` }
  // }
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