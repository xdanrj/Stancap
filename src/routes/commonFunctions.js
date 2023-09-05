import { User } from "../models/User.js"
import { Quotes } from "../models/Quotes.js"

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
//SEL3CT US3R AQUI
export async function selectUser(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  let message = "Mensagem inicial padrão: se você está vendo isso, contate o desenvolvedor."

  const foundUser = await User.find(query)
  const quantity = foundUser.length

  if (!User.schema.obj
    .hasOwnProperty(property)) {
    message = "Nome de propriedade inexistente"
  }
  else {
    if (quantity > 0) {
      message = "Sucesso"
    } else {
      message = "Nenhum usuário encontrado"
    }
  }
  return { query: query, quantity: quantity, message: message, response: foundUser }
}

// Essa função permite selecionar qualquer usuário usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
// US3R 3XISTS AQUI
export async function userExists(proprietyTarget) {
  const user = await User.findOne(proprietyTarget)
  if (user) {
    return user
  }
  else {
    return false
  }
}

// SEL3CT QU0T3 AQUI
export async function selectQuote(body) {
  console.log("body: ", body)
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = { [property]: target }

  let message = "Mensagem inicial padrão: se você está vendo isso, contate o desenvolvedor."

  const foundQuote = await Quotes.find(query)
  const quantity = foundQuote.length

  if (!Quotes.schema.obj
    .hasOwnProperty(property)) {
    message = "Nome de propriedade inexistente"
  }
  else if (property == "password") {
    message = "Acesso negado"
  }
  else if (quantity > 0) {
    message = "Sucesso"
  }
  else if (quantity === 0) {
    message = "Nenhuma quote encontrada"
}
return { query: query, quantity: quantity, message: message, response: foundQuote }
}



// Essa função permite selecionar qualquer quote usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
// QU0T3 3X1STS AQUI
export async function quoteExists(proprietyTarget) {
  const quote = await Quotes.findOne({ proprietyTarget })
  if (quote) {
    return quote
  }
  else {
    return false
  }
}