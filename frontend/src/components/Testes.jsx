import React, { useEffect, useState } from "react"
import CdButton from "./CdButton/CdButton"
import { Form, FormGroup } from "react-bootstrap"

export default function Testes() {
    const handleClick = () => {
        console.log("clicou")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("entrou submit")
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                <CdButton type="submit" onClick={() => {}}>
                    texto botao
                </CdButton>
                </FormGroup>
            </Form>
        </>
    )
}