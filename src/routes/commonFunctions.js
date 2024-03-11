import { User } from "../models/User.js"
import { Quotes } from "../models/Quotes.js"
import mongoose from "mongoose"
import _ from "lodash"
import { ObjectId } from "mongodb"

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
export async function selectUser(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  if (property !== "_id") {
    return false
  }

  let foundUser = await User.find(query).lean()
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

//todo: verificar se sort order ta funfando
export async function selectQuote(body, order, skipItems=null, limit=null) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }  
  if (property == "password") {
    return false
  }

  if (property == "uploadByUser") {
    const foundUser = await User.find({username: query.uploadByUser})
    const userId = _.pick(foundUser[0], "_id")
    const userIdStr = userId._id.toString()  
    query = {uploadByUser: userIdStr}
  }
  
  let foundQuote
  if (limit !== null && skipItems !== null) {
    console.log("query abaixo")
    console.log(query)
    console.log(`limit: ${limit} // skipItems: ${skipItems}`)
    foundQuote = await Quotes.find(query).sort({uploadDate: order}).skip(skipItems).limit(limit)
    console.log('foundquote abaixo')
    console.log(foundQuote)
  } else {
    foundQuote = await Quotes.find(query)
  }

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