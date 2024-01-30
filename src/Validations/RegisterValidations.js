import quoteEditingServices from "../services/quoteServices"
const quoteService = new quoteEditingServices()

export function passwordValidation(senha) {
    if (/^.{1,4}$/.test(senha)) {
        return {
            response: false,
            message: "A senha precisa ter no mínimo 5 caracteres"
        }
    } else {
        return { response: true }
    }
}

export function usernameValidation(username) {
    const allUsernames = (quoteService.allUsers())
    for (let i = 0; i < allUsernames.length; i++) {
        if (allUsernames[i] === username) {
            return {
                response: false,
                message: "Esse nome de usuário já existe"
            }
        } else {
            return { response: true }
        }
    }
}

