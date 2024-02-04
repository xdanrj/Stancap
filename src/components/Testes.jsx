import { useState } from "react"
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "../CommonStyles/CommonStyles";
import { passwordValidation, usernameValidation } from "../Validations/RegisterValidations";
import loginAndRegisterServices from "../services/loginAndRegisterServices";
import { useAlertMsg } from "./Alert/AlertContext";

export default function Testes() {
    const useAlert = useAlertMsg()
    const [email, setEmail] = useState("email@teste.com")
    const [registerData, setRegisterData] = useState([])
    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData, [e.target.name]: e.target.value,
            email: email
        })
        console.log("registerData: ", registerData)
    }
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const dataValidation = (passwordValidation(registerData.password)).response && (await usernameValidation(registerData.username)).response
            console.log(registerData)
            console.log(dataValidation)
            if (dataValidation.response) {
                alert('TESTADO: Usuário cadastrado com sucesso')
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
                            value={email}
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