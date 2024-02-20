import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { FloatingLabel } from "../../../CommonStyles/CommonStyles"
import { ButtonContainer, ModalTitle, ModalBody } from "../../Modal/ModalContextStyles"


export function FastQuotesFillModal(props) {
    const [rawChatLog, setRawChatLog] = useState(``)
    const [chatLogResult, setChatLogResult] = useState([])
    const [show, setShow] = useState(false)

    const handleRawChatLog = (e) => {
        const {name, value} = e.target.value
        setRawChatLog((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(rawChatLog)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
        <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header>
            <ModalTitle>Preencher falas automaticamente</ModalTitle>
        </Modal.Header>

        <ModalBody>
            <p>Preencha os campos de "Autor" e "Quote" automaticamente colando o log da conversa.</p>
            
            <FloatingLabel label="Diálogo na íntegra" >
                <Form.Control
                    name="rawuserinput"
                    placeholder="Diálogo na íntegra"
                    onChange={handleRawChatLog}
                    value={rawChatLog}>
                </Form.Control>
            </FloatingLabel>
        </ModalBody>
        </Modal>
    

        </>
    )
}
