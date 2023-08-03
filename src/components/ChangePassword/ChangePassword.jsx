import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

function ChangePasswordForm() {
    const navigate = useNavigate()

    // definição dos valores
    const [email, setEmail] = useState()
    const [code, setCode] = useState()
    const [newPassword, setNewPassword] = useState()

    // visibilidade dos Forms
    const [sendCodeForm, setSendCodeForm] = useState(true)
    const [checkCodeForm, setCheckCodeForm] = useState(false)
    const [newPasswordForm, setNewPasswordForm] = useState(false)

    const handleSubmitSendCode = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.sendCode(email)
            if (response === true) {
                alert('Código enviado com sucesso')
                setSendCodeForm(false)
                setCheckCodeForm(true)
            }
            else {
                alert(response)
            }
        } catch (error) { alert(error.response.data.error) }
    }

    const handleSubmitCheckCode = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.checkCode({ email, code })
            if (response === true) {
                alert('Código verificado com sucesso')
                setCheckCodeForm(false)
                setRegisterForm(true)
            }
            else {
                alert(response)
            }
        } catch (error) { alert(error.response.data.error) }
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.newPassword({ email, password: newPassword.newPassword})
            
        } catch (error) { alert(error.response.data.error) }
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

    return (
        <>
            {sendCodeForm && (
                <>
                    <Form onSubmit={handleSubmitSendCode}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                onChange={handleEmailChange}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </>
            )}

            {checkCodeForm && (
                <>
                    <Form onSubmit={handleSubmitCheckCode}>
                        <Form.Group>
                            <Form.Label>Código:</Form.Label>
                            <Form.Control
                                name="code"
                                type="text"
                                onChange={handleCodeChange}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </>
            )}
            {newPasswordForm && (
                <>
                    <Form onSubmit={handleSubmitNewPassword}>
                        <Form.Group>
                            <Form.Label>Nova senha:</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                onChange={handleNewPasswordChange}
                            ></Form.Control>

                            <Form.Label>Nova senha (novamente):</Form.Label>
                            <Form.Control
                                name="confirmPassword"
                                type="password"
                                onChange={handleNewPasswordChange}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </>
            )}
        </>
    )
}