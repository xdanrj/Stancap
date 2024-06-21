import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FloatingLabel } from "../../CommonStyles/CommonStyles"
import { passwordValidation, usernameValidation } from "../../Validations/RegisterValidations"
import loginAndRegisterServices from "../../services/loginAndRegisterServices"
import { useAlertMsg } from "../../components/Alert/AlertContext"
import { MDBIcon } from "mdb-react-ui-kit"
import { ring } from "ldrs";
ring.register()
const loginAndRegisterService = new loginAndRegisterServices()

function RegisterForm() {
  const navigate = useNavigate()
  const useAlert = useAlertMsg()
  // definição dos valores
  const [email, setEmail] = useState([])
  const [code, setCode] = useState([])
  const [registerData, setRegisterData] = useState([])
  // visibilidade dos Forms
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [sendCodeForm, setSendCodeForm] = useState(true)
  const [checkCodeForm, setCheckCodeForm] = useState(false)
  const [registerForm, setRegisterForm] = useState(false)
  const [retryState, setRetryState] = useState(60)
  const [checkHasClicked, setCheckHasClicked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendCode = async (e) => {
    e.preventDefault()
    setRetryState(60)
    const timer = setInterval(() => {
      setRetryState(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    try {
      setLoading(true)
      console.log("oba")
      const response = await loginAndRegisterService.sendCode({ email })
      console.log("oba2")
      if (response === true) {
        useAlert('Código enviado. Verifique seu e-mail')
        setSendCodeForm(false)
        setCheckCodeForm(true)
      }
      else {
        useAlert(response)
      }
    } catch (error) { useAlert(error) }
    setLoading(false)
  }

  const handleCheckCode = async (e) => {
    e.preventDefault()
    setCheckHasClicked(true)
    setRetryState(60)
    const timer = setInterval(() => {
      setRetryState(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    try {
      setLoading(true)
      const response = await loginAndRegisterService.checkCode({
        email, code
      })
      console.log(response)
      if (response.status) {
        useAlert(response.message)
        setCheckCodeForm(false)
        setRegisterForm(true)
      }
      else {
        useAlert(response.message)
      }
    } catch (error) { useAlert(error) }
    setLoading(false)
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const passwordResult = passwordValidation(registerData.password)
      const usernameResult = await usernameValidation(registerData.username)
      console.log(registerData)
      if (registerData.password !== registerData.password2) {
        useAlert("As senhas não estão iguais. \n Digite novamente.")
      } else {
        if (!passwordResult.response || !usernameResult.response) {
          const errorMessage = passwordResult.response ? usernameResult.message : passwordResult.message
          console.log(errorMessage)
          useAlert(errorMessage)
        } else {
          const loginData = {
            email,
            username: registerData.username,
            password: registerData.password
          }
          const response = await loginAndRegisterService.register(loginData)
          if (response === true) {
            alert('Usuário cadastrado com sucesso')
            const response = await loginAndRegisterService.login(loginData)
            if (response.userToken) {
              localStorage.setItem("userToken", response.userToken)
              localStorage.setItem("userId", response.userId)
              localStorage.setItem("username", response.username)
              console.log("logou")
            } else {
              alert('Falha no auto-login. Faça login manualmente.')
            }
            navigate('/quotes')
          } else {
            console.log(response)
            useAlert(response)
          }
        }
      }
    } catch (error) {
      console.log(error)
      useAlert(error)
    }
    setLoading(false)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleCodeChange = (e) => {
    setCode(e.target.value.trim())
    console.log(code)
  }
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
      email: email.email
    })
    console.log("registerData: ", registerData)
  }

  const changePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={8} sm={6} md={4} lg={3}>
          {loading ? (
            <l-ring color='white' />
          ) : (
            <>
              {sendCodeForm && (
                <>
                  <h2 className="mb-4">Criação de conta</h2>
                  <h5>Use um e-mail válido</h5>
                  <Form onSubmit={handleSendCode}>
                    <FloatingLabel label="E-mail">
                      <Form.Control
                        className="mb-3"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        placeholder="E-mail"
                      />
                    </FloatingLabel>
                    <Button type="submit">Enviar código</Button>
                  </Form>
                </>
              )}

              {checkCodeForm && (
                <>
                  <h2 className="mb-4">Cheque seu e-mail</h2>
                  <Form onSubmit={handleCheckCode}>
                    <div className="d-flex justify-content-center align-items-center">
                      <FloatingLabel label="Código" className="w-50">
                        <Form.Control
                          className="mb-3"
                          name="code"
                          type="number"
                          required
                          onChange={handleCodeChange}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </div>
                    {checkHasClicked && (
                      <Button className="m-2" onClick={(e) => handleSendCode(e)} disabled={retryState > 0}>
                        Reenviar {checkHasClicked && ` (${retryState})`}
                      </Button>
                    )}
                    <Button className="" type="submit">Verificar</Button>
                  </Form>
                </>
              )}

              {registerForm && (
                <>
                  <h5 className="mb-3">Você logará com seu e-mail</h5>
                  <Form onSubmit={handleSubmitRegister}>
                    <FloatingLabel label="E-mail" className="mb-8">
                      <Form.Control
                        style={{ color: 'grey' }}
                        className="mb-3"
                        name="email"
                        type="email"
                        value={email}
                        disabled
                      />
                    </FloatingLabel>
                    <h2 className="mb-3">Finalizando cadastro</h2>
                    <FloatingLabel label="Username">
                      <Form.Control
                        className="mb-3"
                        name="username"
                        type="text"
                        onChange={handleRegisterChange}
                        placeholder=""
                        required
                      />
                    </FloatingLabel>

                    <InputGroup className="mb-3">
                      <FloatingLabel label="Senha">
                        <Form.Control
                          className=""
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          onChange={handleRegisterChange}
                          placeholder=""
                          required
                        />
                      </FloatingLabel>
                      <Button onClick={changePasswordVisibility}><MDBIcon far icon={passwordVisible ? "eye-slash" : "eye"} /></Button>
                    </InputGroup>
                      <FloatingLabel label="Senha (novamente)">
                        <Form.Control
                          className="mb-3"
                          name="password2"
                          type={passwordVisible ? "text" : "password"}
                          onChange={handleRegisterChange}
                          placeholder=""
                          required
                        />
                      </FloatingLabel>
                    <Button type="submit">Registrar</Button>
                  </Form>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default RegisterForm