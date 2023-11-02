import { User } from "../models/User.js"
import { Quotes } from "../models/Quotes.js"

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
export async function selectUser(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  const foundUser = await User.find(query)
  const quantity = foundUser.length

  return foundUser
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

  const foundQuote = await Quotes.find(query)

  if (property == "password") {
    return false
  } else {
    return foundQuote
  }
}

// Essa função permite selecionar qualquer quote usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
export async function quoteExists(proprietyTarget) {
  const quote = await Quotes.findOne({ proprietyTarget })
  if (quote) {
    return quote
  }
  else {
    return false
  }
}