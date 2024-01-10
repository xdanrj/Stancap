import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
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
        e.preventDefault();
        try {
            const response = await loginAndRegisterService.login(loginData)
            if (response === true) {
                alert('Logado com sucesso')
                navigate('/quotes')
            }
            else {
                console.log("Caiu no else")
                console.log(response)
                useAlert(response)
            }
        } catch (error) {
            console.log("entrou no catch")
            useAlert(error)
        }
    }
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        console.log(loginData)
    }

    return (
        <>
            <Form onSubmit={handleSubmitLogin}>
                
                <Form.Group className="mb-2">
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
                </Form.Group>

                <Row>
                    <Col className="mb-2">
                        <Button type="submit" size="sm">Logar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button href="/new_password" size="sm" >Esqueci minha senha</Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}