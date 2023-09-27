import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { ModalTitle, ModalBody } from "./QuoteInfoStyles";


export default function QuoteInfo(props) {
    const handleClose = () => props.setShow(false)
    
    useEffect(() => {
        console.log(props.quoteData)
    }, [])

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>{props.quoteData.context}</ModalTitle>
                </Modal.Header>
                <ModalBody>corpo do modal aqui</ModalBody>
            </Modal>
        </>
    )
}