import { User } from "../models/User"


export default async function userExists(email) {
    const user = await User.findOne({ email: email })
    if (user) {
      return user
    }
    else {
      return false
    }
  }

