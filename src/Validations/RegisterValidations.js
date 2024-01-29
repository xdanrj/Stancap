import quoteEditingServices from "../services/quoteServices"
const quoteService = new quoteEditingServices()

export function passwordValidation(senha) {
    if (/^.{1,4}$/.test(senha)) {
        return {
            response: false,
            message: "A senha precisa ter no mínimo 5 caracteres"
        }
    } else {
        return {response: true}
    }
}

export function usernameValidation(username) {
    
    console.log(quoteService.allUsers())
}

