import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Row, Col, Container } from "react-bootstrap";
import { ButtonsFormGroup, FloatingLabel, FormGroup } from "../../../CommonStyles/CommonStyles";
import { useAlertMsg } from "../../Alert/AlertContext";
import loginAndRegisterServices from "../../../services/loginAndRegisterServices"

export default function LoginForm() {
    const useAlert = useAlertMsg()
    const location = useLocation()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState([])
    const loginAndRegisterService = new loginAndRegisterServices()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const emailParam = searchParams.get("email")

        if (emailParam) {
            setLoginData({ ...loginData, [email]: emailParam })
        }
    }, [location.search])

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await loginAndRegisterService.login(loginData)
            if (response === true) {
                alert('Logado com sucesso')
                navigate('/quotes')
            }
            else {
                useAlert(response)
            }
        } catch (error) {
            useAlert(error)
        }
    }
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    return (
        <>
        <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleSubmitLogin}>
                <Row className="justify-content-center">
                    <Col xs={10} sm={8} md={6} lg={3}>
                        <FloatingLabel label="E-mail">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                onChange={handleLoginChange}
                                className="mb-3">
                            </Form.Control>
                        </FloatingLabel>

                        <FloatingLabel label="Senha">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Senha"
                                onChange={handleLoginChange}>
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button type="submit" size="sm" className="my-2">Logar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button href="/new_password" size="sm" className="mb-2">Esqueci minha senha</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button href="/register" size="sm" className="">Criar conta</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}