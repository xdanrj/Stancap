import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


import loginAndRegisterServices from "../../services/loginAndRegisterServices"
const loginAndRegisterService = new loginAndRegisterServices()

function NewPasswordForm() {
    const navigate = useNavigate()

    // definição dos valores
    const [email, setEmail] = useState()
    const [code, setCode] = useState()
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' })

    // visibilidade dos Forms
    const [sendCodeForm, setSendCodeForm] = useState(true)
    const [checkCodeForm, setCheckCodeForm] = useState(false)
    const [newPasswordForm, setNewPasswordForm] = useState(false)

    const handleSubmitSendCode = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.newPasswordSendCode(email)
            if (response === true) {
                alert('Código enviado com sucesso')
                setSendCodeForm(false)
                setCheckCodeForm(true)
            }
            else {
                alert(response)
            }
        } catch (error) { alert(error) }
    }

    const handleSubmitCheckCode = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.newPasswordCheckCode({ email, code })
            if (response === true) {
                alert('Código verificado com sucesso')
                setCheckCodeForm(false)
                setNewPasswordForm(true)
            }
            else {
                alert(response)
            }
        } catch (error) { alert(error) }
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            console.log(`email: ${email.email} // newPassword.password: ${newPassword.password} // newPassword.confirmPassword: ${newPassword.confirmPassword}`)
            console.log("OBJETO EMAIL SECO: ", email)
            console.log("OBJETO NEWPASSWORD SECO: ", newPassword)
            if (newPassword.password == newPassword.confirmPassword) {

                const response = await loginAndRegisterService.newPassword({ ...email, password: newPassword.password })
                console.log("response: ", response)
                if (response === true) {
                    alert('Senha alterada com sucesso')
                    navigate('/quotes')
                }
            } else {
                alert(response)
            }
        } catch (error) { alert(error) }
    }

    const handleEmailChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }
    const handleCodeChange = (e) => {
        setCode({ ...code, [e.target.name]: e.target.value })
    }
    const handleNewPasswordChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value })
    }

    const isPasswordMatching = newPassword.password === newPassword.confirmPassword && newPassword.password !== ''

    return (
        <>
            {sendCodeForm && (
                <>
                    <Form onSubmit={handleSubmitSendCode}>
                        <Form.Label className="text-white">E-mail:</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="email"
                            type="email"
                            onChange={handleEmailChange}
                        ></Form.Control>
                        <Button type="submit">Enviar código</Button>
                    </Form>
                </>
            )}

            {checkCodeForm && (
                <>
                    <Form onSubmit={handleSubmitCheckCode}>
                        <Form.Label className="text-white">Código:</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="code"
                            type="text"
                            onChange={handleCodeChange}
                        ></Form.Control>
                        <Button type="submit">Verificar</Button>
                    </Form>
                </>
            )}
            {newPasswordForm && (
                <>
                    <Form onSubmit={handleSubmitNewPassword}>

                        <Form.Label className="text-white">Nova senha:</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="password"
                            type="password"
                            onChange={handleNewPasswordChange}
                        ></Form.Control>

                        <Form.Label className="text-white">Nova senha (novamente):</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="confirmPassword"
                            type="password"
                            onChange={handleNewPasswordChange}
                        ></Form.Control>

                        <Button type="submit" disabled={!isPasswordMatching}>Alterar senha</Button>
                    </Form>
                </>
            )}
        </>
    )
}

export default NewPasswordForm