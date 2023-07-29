import { useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Testes() {
    const [caixaUm, setCaixaUm] = useState(true)
    const [caixaDois, setCaixaDois] = useState(false)


    const handleCaixaUm = async (e) => {
        e.preventDefault();
        alert('FOI')
        setCaixaUm(false)
        setCaixaDois(true)
    }

    const handleCaixaDois = async (e) => {
        e.preventDefault();
        alert('FOI')
        setCaixaUm(true)
        setCaixaDois(false)
    }

    return (
        <>
            {caixaUm && (
                <Form onSubmit={handleCaixaUm}>
                    <Form.Group className="mb-3" controlId="CaixaUm">
                        <Form.Label>Caixa UM:</Form.Label>
                        <Form.Control
                            name="um"
                            type="text"
                        />
                        <Button type="submit">Botao UM</Button>
                    </Form.Group>
                </Form>
            )}

            {caixaDois && (

                <Form onSubmit={handleCaixaDois}>
                    <Form.Group className="mb-3" controlId="CaixaDois">
                        <Form.Label>Caixa DOIS:</Form.Label>
                        <Form.Control
                            name="dois"
                            type="text"
                        />
                        <Button type="submit">Botao DOIS</Button>
                    </Form.Group>
                </Form>
            )}

        </>
    )
}

export default Testes