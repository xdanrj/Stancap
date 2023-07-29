import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./GeralRegisterForm.css"

import loginAndRegisterServices from "../../services/loginAndRegisterServices"


const loginAndRegisterService = new loginAndRegisterServices()

function SendCodeForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await loginAndRegisterServices.sendCode(form)
        
            if(response === true){
                alert(' com sucesso')
                
            }
            else {
                alert(response)
            }
        } catch (error) {
            alert(error.response.data.error)
        }
        
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    name="email"
                    type="email"         
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit">Enviar</Button>
        </Form>
    )
}

export default RegisterForm