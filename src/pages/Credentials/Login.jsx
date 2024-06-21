import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Row, Col, Container, FormGroup, InputGroup } from "react-bootstrap";
import { FloatingLabel } from "../../CommonStyles/CommonStyles";
import { useAlertMsg } from "../../components/Alert/AlertContext";
import { MDBIcon } from "mdb-react-ui-kit";
import { ring } from "ldrs";
ring.register()
import loginAndRegisterServices from "../../services/loginAndRegisterServices";

export default function LoginForm() {
  const useAlert = useAlertMsg()
  const location = useLocation()
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState([])
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    try {
      const response = await loginAndRegisterService.login(loginData)
      console.log(response)
      if (response.userToken) {
        localStorage.setItem("userToken", response.userToken)
        localStorage.setItem("userId", response.userId)
        localStorage.setItem("username", response.username)
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
    setLoading(false)
  }
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const changePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      <h2 className="mb-4">Login</h2>
      {loading ? (<><l-ring color='white'/></> 
      ) : (
      <Form onSubmit={handleSubmitLogin}>
        <Row className="justify-content-center">
          <Col xs={6} sm={3} md={3} lg={2} xl={2}>
            <FloatingLabel label="E-mail">
              <Form.Control
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleLoginChange}
                className="mb-3">
              </Form.Control>
            </FloatingLabel>

            <InputGroup>
              <FloatingLabel label="Senha">
                <Form.Control
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Senha"
                  onChange={handleLoginChange}>
                </Form.Control>
              </FloatingLabel>
              <Button onClick={changePasswordVisibility}><MDBIcon far icon={passwordVisible ? "eye-slash" : "eye"} /></Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex flex-column align-items-center">
          <Button type="submit" size="sm" className="my-2">Logar</Button>

          <Button href='/new_password' size="sm" className="mb-2">Esqueci minha senha</Button>

          <Button href='/register' size="sm" className="">Criar conta</Button>
        </div>
      </Form>
      )}
    </>
  )
}