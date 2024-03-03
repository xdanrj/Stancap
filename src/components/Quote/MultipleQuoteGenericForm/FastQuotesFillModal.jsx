import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { FloatingLabel } from "../../../CommonStyles/CommonStyles"
import { ButtonContainer, ModalTitle, ModalBody } from "../../Modal/ModalContextStyles"

export function FastQuotesFillModal(props) {
    const [show, setShow] = useState(false)
    
    const handleClose = () => {
        props.setShow(false)
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <ModalTitle>Preencher falas automaticamente</ModalTitle>
                </Modal.Header>

                <ModalBody>
                    <p>Preencha os campos de "Autor" e "Quote" automaticamente colando o log da conversa.</p>
                    <p className="mb-0">Exemplo de formato válido: </p>
                    <p className="mb-0">"[1/12 12:30] João: Olá, tudo bem?</p>
                    <p>[1/12 12:32] Ana: Sim. E você?"</p>
                    <FloatingLabel className="mt-5 text-white">Cole o diálogo abaixo:</FloatingLabel>
                        <Form.Control
                            as="textarea"
                            style={{ resize: "vertical" }}
                            rows={3}
                            name="rawuserinput"
                            onChange={props.handleRawChatLog}
                            value={props.rawChatLog}>
                        </Form.Control>                    
                    <Button className="mt-2" onClick={props.convertRawChatLog}>Converter</Button>
                </ModalBody>
            </Modal>
        </>
    )
}
