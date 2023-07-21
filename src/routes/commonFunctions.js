import { User } from "../models/User"

// recebe como parametro um unico objeto (propriedade: valorPropriedade)
export default async function userExists(proprietyTarget) {
    const user = await User.findOne({ proprietyTarget })
    if (user) {
      return user
    }
    else {
      return false
    }
  }

