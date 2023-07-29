import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Testes() {

    return (
        <>
        <Form onSubmit={handleSubmitSendCode}>
            <Form.Group className="mb-3" controlId="CaixaUm">
                <Form.Label>Caixa UM:</Form.Label>
                <Form.Control
                    name="um"
                    type="text"
                />
                <Button type="submit">Botao UM</Button>
            </Form.Group>

            
        </Form>
        {caixaUm ? <CaixaUm/> : null}
        </>
    )
}

export default Testes