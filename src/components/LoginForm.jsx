import React from "react"
import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./LoginForm.css"



function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Senha:', password);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>

                <Form.Control
                    type="email"         
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha:</Form.Label>

                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </Form.Group>
            <Button type="submit">Enviar</Button>
        </Form>

    )
}

export default LoginForm