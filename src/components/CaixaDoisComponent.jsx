import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Testes() {

    return (
        <>
            <Form onSubmit={handleSubmitSendCode}>
                <Form.Group className="mb-3" controlId="CaixaDois">
                    <Form.Label>Caixa DOIS:</Form.Label>
                    <Form.Control
                        name="dois"
                        type="text"
                    />
                    <Button type="submit">Botao DOIS</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default Testes