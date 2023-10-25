import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "../../../CommonStyles/CommonStyles";

import loginAndRegisterServices from "../../../services/loginAndRegisterServices"
import { useAlertMsg } from "../../Alert/AlertContext";
const loginAndRegisterService = new loginAndRegisterServices()

export default function NewPasswordForm() {
    const navigate = useNavigate()
    const useAlert = useAlertMsg()
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
                useAlert(response)
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
                useAlert(response)
            }
        } catch (error) { alert(error) }
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.password == newPassword.confirmPassword) {
                const response = await loginAndRegisterService.newPassword({ ...email, password: newPassword.password })
                console.log("response: ", response)
                if (response === true) {
                    alert('Senha alterada com sucesso')
                    navigate('/quotes')
                }
            } else {
                useAlert(response)
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
                        <FloatingLabel label="E-mail">
                            <Form.Control
                                className="mb-3"
                                name="email"
                                type="email"
                                onChange={handleEmailChange}
                                placeholder="E-mail">
                            </Form.Control>
                        </FloatingLabel>
                        <Button type="submit">Enviar código</Button>
                    </Form>
                </>
            )}

            {checkCodeForm && (
                <>
                    <Form onSubmit={handleSubmitCheckCode}>
                        <FloatingLabel label="Código">
                            <Form.Control
                                className="mb-3"
                                name="code"
                                type="text"
                                onChange={handleCodeChange}
                                placeholder="Código"
                            ></Form.Control>
                        </FloatingLabel>
                        <Button type="submit">Verificar</Button>
                    </Form>
                </>
            )}
            {newPasswordForm && (
                <>
                    <Form onSubmit={handleSubmitNewPassword}>

                        <FloatingLabel label="Nova senha">
                            <Form.Control
                                className="mb-3"
                                name="password"
                                type="password"
                                onChange={handleNewPasswordChange}
                                placeholder="Nova senha"
                            ></Form.Control>
                        </FloatingLabel>

                        <FloatingLabel label="Nova senha (novamente)">
                            <Form.Control
                                className="mb-3"
                                name="confirmPassword"
                                type="password"
                                onChange={handleNewPasswordChange}
                                placeholder="Nova senha (novamente)"></Form.Control>
                        </FloatingLabel>

                        <Button type="submit" disabled={!isPasswordMatching}>Alterar senha</Button>
                    </Form>
                </>
            )}
        </>
    )
}