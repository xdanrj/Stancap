import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../../Formatting/DateFormatting";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal, ModalTitle, ModalBody, ProprietyTitle, ProprietyValue } from "./QuoteInfoStyles";


export default function QuoteInfo(props) {
    const handleClose = () => props.setShow(false)

    useEffect(() => {
        console.log(props.quoteData)
    }, [])

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Detalhes da Quote</ModalTitle>
                </Modal.Header>

                <ModalBody>

                    <ProprietyTitle>Source</ProprietyTitle>
                    <ProprietyValue>{props.quoteData.source}</ProprietyValue>

                    <ProprietyTitle>Data de upload</ProprietyTitle>
                    <ProprietyValue>{NormalDateAndHour(props.quoteData.uploadDate)}</ProprietyValue>

                    <ProprietyTitle>Upload por</ProprietyTitle>
                    <ProprietyValue>{props.quoteData.uploadByUser}</ProprietyValue>

                    <ProprietyTitle>Contexto</ProprietyTitle>
                   <ProprietyValue>{props.quoteData.context}</ProprietyValue>
                </ModalBody>
            </Modal>
        </>
    )
}