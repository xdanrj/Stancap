import React, { useEffect, useState } from "react"
import CdButton from "./CdButton/CdButton"
import { Form } from "react-bootstrap"

export default function Testes() {
    const handleClick = () => {
        console.log("clicou")
    }
    const handleSubmit = () => {
        console.log("entrou submit")
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <CdButton type="submit">
                    texto botao
                </CdButton>
            </Form>
        </>
    )
}