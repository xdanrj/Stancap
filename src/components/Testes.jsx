import { useState } from "react"
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "../CommonStyles/CommonStyles";
import { passwordValidation, usernameValidation } from "../Validations/RegisterValidations";
import loginAndRegisterServices from "../services/loginAndRegisterServices";
import { useAlertMsg } from "./Alert/AlertContext";
const loginAndRegisterService = new loginAndRegisterServices()

export default function Testes() {
  const [email, setEmail] = useState([])
    const [code, setCode] = useState([])
    const [registerData, setRegisterData] = useState([])

    // visibilidade dos Forms
    const [sendCodeForm, setSendCodeForm] = useState(true)
    const [checkCodeForm, setCheckCodeForm] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)
    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData, [e.target.name]: e.target.value,
            email: email.email
        })
        console.log("registerData: ", registerData)
    }
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
        const dataValidation = ( passwordValidation(registerData.password)).response && (await usernameValidation(registerData.username)).response
        console.log(registerData)
        console.log(dataValidation)
        if (dataValidation.response) {
            const response = await loginAndRegisterService.register(registerData)
            if (response === true) {
                alert('Usuário cadastrado com sucesso')
                await loginAndRegisterService.login({
                    email: email.email,
                    password: registerData.password
                })
                navigate('/quotes')
            }
        } else {
            console.log(dataValidation.message)
            useAlert(dataValidation.message)
        }
    } catch (error) {
        console.log(error)
        useAlert(error)
    }
}

  return (
    <>
    <>
                    <h4>ÁREA DE TESTES: Você poderá logar usando e-mail ou username</h4>
                    <Form onSubmit={handleSubmitRegister}>
                        <FloatingLabel label="E-mail">
                            <Form.Control style={{ color: 'grey' }}
                                className="mb-3"
                                name="email"
                                type="email"
                                value={email.email}
                                disabled
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Username">
                            <Form.Control
                                className="mb-3"
                                name="username"
                                type="text"
                                onChange={handleRegisterChange}
                                placeholder=""
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Senha">
                            <Form.Control
                                className="mb-3"
                                name="password"
                                type="password"
                                onChange={handleRegisterChange}
                                placeholder=""
                            />
                        </FloatingLabel>
                        <Button type="submit">Registrar</Button>
                    </Form>
                </>
    </>
  )
}