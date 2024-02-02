import userServices from "../services/userServices"
const userService = new userServices()

export function passwordValidation(senha) {
    console.log(senha)
    if (/^.{1,4}$/.test(senha)) {
        return {
            response: false,
            message: "A senha precisa ter no mínimo 5 caracteres"
        }
    } else {
        return { response: true }
    }
}

export async function usernameValidation(username) {
    const allUsernames = (await userService.allUsers())
    for (let i = 0; i < allUsernames.length; i++) {
        if (allUsernames[i].toLowerCase() === username.toLowerCase()) {
            return {
                response: false,
                message: "Esse nome de usuário já existe"
            }
        }    
    }
    return { response: true }
}

