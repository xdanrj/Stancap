import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css"

import loginAndRegisterServices from "../../services/loginAndRegisterServices"

const loginAndRegisterService = new loginAndRegisterServices()

function LoginForm() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState([])

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.login(loginData)

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
    const handleLoginChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value })
        console.log(loginData)
    }

    return (
        <Form onSubmit={handleSubmitLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>

                <Form.Control
                    name="email"
                    type="email"         
                    onChange={handleLoginChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha:</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    onChange={handleLoginChange}
                />
            </Form.Group>
            <Button type="submit">Enviar</Button>
        </Form>
    )
}

export default LoginForm