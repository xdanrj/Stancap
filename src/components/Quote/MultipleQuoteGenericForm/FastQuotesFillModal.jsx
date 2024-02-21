import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { FloatingLabel } from "../../../CommonStyles/CommonStyles"
import { ButtonContainer, ModalTitle, ModalBody } from "../../Modal/ModalContextStyles"


export function FastQuotesFillModal(props) {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }


    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered >
                <Modal.Header>
                    <ModalTitle>Preencher falas automaticamente</ModalTitle>
                </Modal.Header>

                <ModalBody style={{ height: "500px" }}>
                    <p>Preencha os campos de "Autor" e "Quote" automaticamente colando o log da conversa.</p>
                    <p>Exemplo de formato válido: </p>
                    <p className="mb-0">"[1/12 12:30] João: Olá, tudo bem?</p>
                    <p>[1/12 12:32] Ana: Sim. E você?"</p>
                    <FloatingLabel label="Diálogo na íntegra" >
                        <Form.Control
                            as="textarea"
                            style={{ resize: "vertical" }}
                            rows={3}
                            name="rawuserinput"
                            placeholder="Diálogo na íntegra"
                            onChange={props.handleRawChatLog}
                            value={props.rawChatLog}>
                        </Form.Control>
                    </FloatingLabel>
                    <Button className="mt-2" onClick={props.convertRawChatLog}>Converter</Button>
                </ModalBody>
            </Modal>


        </>
    )
}
