export function PasswordValidation(senha) {
    if (/^.{1,4}$/.test(senha)) {
        return {
            validation: false,
            message: "A senha precisa ter no mínimo 5 caracteres"
        }
    } else {
        return {validation: true}
    }
}