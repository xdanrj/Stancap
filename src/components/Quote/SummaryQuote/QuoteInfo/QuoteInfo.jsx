import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../../Formatting/DateFormatting";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph } from "./QuoteInfoStyles";


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

                    <TextTitle>Source</TextTitle>
                    <TextParagraph>{props.quoteData.source}</TextParagraph>

                    <TextTitle>Data de upload</TextTitle>
                    <TextParagraph>{NormalDateAndHour(props.quoteData.uploadDate)}</TextParagraph>

                    <TextTitle>Upload por</TextTitle>
                    <TextParagraph>{props.quoteData.uploadByUser}</TextParagraph>

                    <TextTitle>Contexto</TextTitle>
                   <TextParagraph>{props.quoteData.context}</TextParagraph>
                </ModalBody>
            </Modal>
        </>
    )
}