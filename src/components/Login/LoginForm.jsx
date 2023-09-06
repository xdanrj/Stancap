import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";

import { Form } from "react-bootstrap";
import { FloatingLabel, FormGroup } from "../../CommonStyles/CommonStyles";


import loginAndRegisterServices from "../../services/loginAndRegisterServices"

const loginAndRegisterService = new loginAndRegisterServices()

function LoginForm() {
    const location = useLocation()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState([])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const emailParam = searchParams.get("email")

        if (emailParam) {
            setLoginData({ ...loginData, [email]: emailParam })
        }
    }, [location.search])

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
            alert(error)
        }
    }
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        console.log(loginData)
    }

    return (
        <>
            <h1 id="aga">login</h1>
            <Form onSubmit={handleSubmitLogin}>
                <FormGroup>
                    <FloatingLabel label="E-mail">
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            onChange={handleLoginChange}>
                        </Form.Control>
                    </FloatingLabel>
                </FormGroup>

                <FormGroup>
                    <FloatingLabel label="Senha">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={handleLoginChange}>
                        </Form.Control>
                        </FloatingLabel>
                </FormGroup>
                <Button href="/new_password">Esqueci minha senha</Button>
                <Button type="submit">Enviar</Button>
            </Form>
        </>
    )
}

export default LoginForm