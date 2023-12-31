import { useState } from "react"
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DisabledFormControl, FloatingLabel } from "../../../CommonStyles/CommonStyles";
import { PasswordValidation } from "../../../Validations/PasswordValidations";
import loginAndRegisterServices from "../../../services/loginAndRegisterServices"
import { useAlertMsg } from "../../Alert/AlertContext";
const loginAndRegisterService = new loginAndRegisterServices()

function RegisterForm() {
    const navigate = useNavigate()
    const useAlert = useAlertMsg()

    // definição dos valores
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
            console.log(email)
            const response = await loginAndRegisterService.sendCode(email)
            if (response === true) {
                alert('Código enviado com sucesso')
                setSendCodeForm(false)
                setCheckCodeForm(true)
            }
            else {
                console.log(response)
                
                useAlert(response)
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
                useAlert(response)
            }
        } catch (error) { useAlert(error.response.data.error) }
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const dataValidation = PasswordValidation(registerData.password)
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
            useAlert(error.response.data.error)
        }
    }
    const handleEmailChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }
    const handleCodeChange = (e) => {
        setCode({ ...code, [e.target.name]: e.target.value })
    }
    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData, [e.target.name]: e.target.value,
            email: email.email
        })
        console.log("registerData: ", registerData)
    }

    return (
        <>
            {sendCodeForm && (
                <>
                    <Form onSubmit={handleSubmitSendCode}>
                        <FloatingLabel label="E-mail">
                            <Form.Control
                                className="mb-3"
                                name="email"
                                type="email"
                                onChange={handleEmailChange}
                                placeholder="E-mail" />
                        </FloatingLabel>
                        <Button type="submit">Enviar código</Button>
                    </Form>
                </>
            )}

            {checkCodeForm && (
                <>
                    <Form onSubmit={handleSubmitCheckCode}>
                        <FloatingLabel label="Código">
                            <Form.Control
                                className="mb-3"
                                name="code"
                                type="text"
                                onChange={handleCodeChange}
                                placeholder=""
                            />
                        </FloatingLabel>
                        <Button type="submit">Verificar</Button>
                    </Form>
                </>
            )}

            {registerForm && (
                <>
                    <h4>Você poderá logar usando e-mail ou username</h4>
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
            )}
        </>
    )
}

export default RegisterForm