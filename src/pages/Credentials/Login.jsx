import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Row, Col, Container } from "react-bootstrap";
import { FloatingLabel } from "../../CommonStyles/CommonStyles";
import { useAlertMsg } from "../../components/Alert/AlertContext";
import loginAndRegisterServices from "../../services/loginAndRegisterServices";

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
        console.log("logou")
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
          <Col xs={5} sm={3} md={3} lg={2} xl={2}>
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

        <div className="d-flex flex-column align-items-center">
          <Button type="submit" size="sm" className="my-2">Logar</Button>
          <Link to='/new_password'>
            <Button size="sm" className="mb-2">Esqueci minha senha</Button>
          </Link>
          <Link to='/register'>
            <Button size="sm" className="">Criar conta</Button>
          </Link>
        </div>

      </Form>
    </>
  )
}