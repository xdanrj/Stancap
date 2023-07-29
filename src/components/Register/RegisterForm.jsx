import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./GeralRegisterForm.css"

import loginAndRegisterServices from "../../services/loginAndRegisterServices"

// RASCUNHO: <Form.Group className="mb-3" controlId="formBasicUsername">
const loginAndRegisterService = new loginAndRegisterServices()

function RegisterForm() {
    const navigate = useNavigate()

    // definição dos valores
    const [loginForm, setLoginForm] = useState([])
    const [email, setEmail] = useState()
    const [code, setCode] = useState()

    // visibilidade dos Forms
    const [sendCodeForm, setSendCodeForm] = useState(true)
    const [checkCodeForm, setCheckCodeForm] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)

    const handleSubmitSendCode = async (e) => {
        e.preventDefault()
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

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.register(loginForm)

            if (response === true) {
                alert('Logado com sucesso')
                navigate('/quotes')
            }
            else {
                alert(response)
            }
        } catch (error) {
            alert(error.response.data.error)
        }

    }

    // handleChange de todos os inputs
    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }

    return (
        <>
            {sendCodeForm && (
                <Form onSubmit={handleSubmitSendCode}>
                    <Form.Group className="mb-3" controlId="formSendCode">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            onChange={handleChange}
                        />
                        <Button type="submit">Enviar código</Button>
                    </Form.Group>
                </Form>
            )}

            {checkCodeForm && (
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        name="code"
                        type="text"
                        onChange={handleChange}
                    />
                    <Button type="submit">Verificar</Button>
                </Form>
            )}

            {registerForm && (
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        onChange={handleChange}
                    />
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <Button type="submit">Registrar</Button>
                </Form>
            )}
        </>
    )
}

export default RegisterForm