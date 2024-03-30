import React, { useEffect, useState } from "react"
import CdButton from "./CdButton/CdButton"
import { Form, FormGroup } from "react-bootstrap"

export default function Testes() {
    const handleClick = () => {
        console.log("ACAO")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("entrou SUBMIT")
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                <CdButton onClick={handleClick}>
                    texto botao
                </CdButton>
                </FormGroup>
            </Form>
        </>
    )
}