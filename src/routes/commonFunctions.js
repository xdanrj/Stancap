import { User } from "../models/User.js"
import { Quotes } from "../models/Quotes.js"
import mongoose from "mongoose"
import _ from "lodash"

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
export async function selectUser(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  if (property == "password") {
    return false
  }

  let foundUser = await User.find(query).lean()
  if (foundUser) {
    return _.pick(foundUser[0], "_id")
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

export async function selectQuote(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  if (property == "password") {
    return false
  }

  const foundQuote = await Quotes.find(query)
  if (foundQuote.length > 0) {
    return foundQuote
  } else {
    return false
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