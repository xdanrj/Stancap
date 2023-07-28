import React from "react"
import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css"

import { loginAndRegisterInstance } from "../services/loginAndRegisterServices";

//const loginAndRegisterService = new loginAndRegisterServices()

function LoginForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await loginAndRegisterInstance.login(form)
        
            if(response === true){
                alert('Logado com sucesso')
                navigate('/quotes')
            }
            else {
                alert(response)
            }
        } catch (error) {
            //alert(error.response.data.error)
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha:</Form.Label>

                <Form.Control
                    name="password"
                    type="password"
                    onChange={handleChange}
                />

            </Form.Group>
            <Button type="submit">Enviar</Button>
        </Form>

    )
}

export default LoginForm