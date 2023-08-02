import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./GeralRegisterForm.css"

import loginAndRegisterServices from "../../services/loginAndRegisterServices"

const loginAndRegisterService = new loginAndRegisterServices()

function RegisterForm() {
    const navigate = useNavigate()

    // definição dos valores
    const [loginData, setLoginData] = useState([])
    const [email, setEmail] = useState([])
    const [code, setCode] = useState([])
    const [registerData, setRegisterData] = useState([])

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
            const response = await loginAndRegisterService.checkCode( { email, code } )

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

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.register(registerData)
            
            if (response === true) {
                alert('Usuário cadastrado com sucesso')
                // envia para a pagina de login
                navigate('/login')
            }
    } catch (error) {
        alert(error.response.data.error)
    }
    }

    // handleChange de todos os inputs
    const handleEmailChange = (e) => {
        setEmail({...email, [e.target.name]: e.target.value })
    }
    const handleCodeChange = (e) => {
        setCode({ ...code, [e.target.name]: e.target.value })
    }
    const handleRegisterChange = (e) => {
        setRegisterData( {...registerData, [e.target.name]: e.target.value, 
        email: email.email} )
        console.log("registerData: ", registerData)
    }

    return (
        <>
            {sendCodeForm && (
                <>
                <Form onSubmit={handleSubmitSendCode}>
                    <Form.Group className="mb-3" controlId="formSendCode">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            onChange={handleEmailChange}
                        />
                        <Button type="submit">Enviar código</Button>
                    </Form.Group>
                </Form>
                </>
            )}

            {checkCodeForm && (
                <>
                <Form onSubmit={handleSubmitCheckCode}>
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        name="code"
                        type="text"
                        onChange={handleCodeChange}
                    />
                    <Button type="submit">Verificar</Button>
                </Form>
                </>
            )}

            {registerForm && (
                <>
                <h4>Você poderá logar usando e-mail ou username</h4>
                <Form onSubmit={handleSubmitRegister}>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={email.email}
                        disabled
                    />
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        onChange={handleRegisterChange}
                    />
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={handleRegisterChange}
                    />
                    <Button type="submit">Registrar</Button>
                </Form>
                </>
            )}
        </>
    )
}

export default RegisterForm