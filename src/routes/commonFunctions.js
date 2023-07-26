import { User } from "../models/User.js"

// Função que seleciona o usuário através de qualquer propriedade. Usa sempre o primeiro objeto da requisição ( {propriedade: valorDaPropriedade} ). Serve para selecionar o usuário caso a rota não explicite a propriedade selecionada.
export async function selectUser(body) {
  let property = Object.keys(body)[0]
  let target = body[property]
  let query = {[property]: target}

  let message = "Mensagem inicial padrão: se você está vendo isso, contate o desenvolvedor."

  const foundUser = await User.find(query)
  const quantity = foundUser.length
  
  if (!User.schema.obj
      .hasOwnProperty(property)) {
      message = "Nome de propriedade inexistente"
  }
  else if (property == "password") {
      message = "Acesso negado"
  } else {
      if (quantity > 0) {
          message = "Sucesso"
      } else {
          message = "Nenhum estudante encontrado"
      }
  }
  return { query: query, quantity: quantity, message: message, response: foundUser }
}



// Essa função permite selecionar qualquer usuário usando qualquer propriedade como filtro. Recebe como parâmetro um único OBJETO (propriedade: valorPropriedade)
export async function userExists(proprietyTarget) {
    console.log(`proprietyTarget: ${proprietyTarget}`)
    const user = await User.findOne({ proprietyTarget })
    if (user) {
      return user
    }
    else {
      return false
    }
  }

