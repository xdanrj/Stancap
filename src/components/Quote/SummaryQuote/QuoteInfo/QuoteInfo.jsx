import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { ModalTitle, ModalBody } from "./QuoteInfoStyles";


export default function QuoteInfo(props) {
    const [show, setShow] = useState(true)
    const handleClose = () => setShow(false)
    //const handleShow = () => setShow(true)

    const [data, setData] = useState()

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Titulo aqui</ModalTitle>
                </Modal.Header>
                <ModalBody>corpo do modal aqui</ModalBody>
            </Modal>
        </>
    )
}