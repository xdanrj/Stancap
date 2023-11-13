import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../../Formatting/DateFormatting";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph } from "./QuoteInfoStyles";


export default function QuoteInfo(props) {
    const handleClose = () => props.setShow(false)

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Detalhes da Quote</ModalTitle>
                </Modal.Header>

                <ModalBody>

                    <TextTitle>Source</TextTitle>
                    <TextParagraph>{props.quoteData.source ?
                        props.quoteData.source :
                        "Source não especificada"}
                    </TextParagraph>

                    <TextTitle>Data de upload</TextTitle>
                    <TextParagraph>{props.quoteData.uploadDate ?
                        NormalDateAndHour(props.quoteData.uploadDate) :
                        "Data não especificada"}
                    </TextParagraph>

                    <TextTitle>Upload por</TextTitle>
                    <TextParagraph>{props.quoteData.uploadByUser ?
                        props.quoteData.uploadByUser :
                        "Usuário não especificado (isso não deveria acontecer, contate o dev)"}
                    </TextParagraph>

                    <TextTitle>Contexto</TextTitle>
                    <TextParagraph>{props.quoteData.context ?
                        props.quoteData.context :
                        "Contexto não especificado"}
                    </TextParagraph>
                </ModalBody>
            </Modal>
        </>
    )
}