import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { ButtonContainer, ModalTitle, ModalBody } from "../../Modal/ModalContextStyles"

export function QuotesPageFirstVisitModalBox(props) {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    /* ({ title: "", paragraph: ["", "ㅤ", "", "ㅤ", ``] */

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <ModalTitle>Avisos importantes</ModalTitle>
                </Modal.Header>

                <ModalBody>
                    <p>Não leve nada daqui a sério. Todas as frases são para fins unicamente cômicos</p>
                    <p>Clique em qualquer ícone de source ou no autor da quote para fazer uma pesquisa específica</p>
                    <p>Alguns dialógos são grandes então clique em ᨆ para expandir</p>

                </ModalBody>
            </Modal>
        </>
    )
}