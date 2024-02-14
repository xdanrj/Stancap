import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../Formatting/DateFormatting";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph } from "./QuoteInfoStyles";
import quoteEditingServices from "../../../services/quoteServices";
import _ from "lodash";

export default function QuoteInfo(props) {
    const handleClose = () => props.setShow(false)
    const quoteService = new quoteEditingServices()
    const [quoteData, setQuoteData] = useState(props.quoteData)
    useEffect(() => {
        setQuoteData(props.quoteData)
    }, [props.quoteData])

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Detalhes da Quote</ModalTitle>
                </Modal.Header>

                <ModalBody>

                    <TextTitle>Source</TextTitle>
                    <TextParagraph>{quoteData.source ?
                        quoteData.source :
                        "Source não especificada"}
                    </TextParagraph>

                    <TextTitle>Data de upload</TextTitle>
                    <TextParagraph>{quoteData.uploadDate ?
                        NormalDateAndHour(quoteData.uploadDate) :
                        "Data não especificada"}
                    </TextParagraph>

                    <TextTitle>Upload por</TextTitle>
                    <TextParagraph>{quoteData.uploadByUser ?
                        quoteData.uploadByUser :
                        "Usuário não especificado (isso não deveria acontecer, contate o dev)"}
                    </TextParagraph>

                    <TextTitle>Contexto</TextTitle>
                    <TextParagraph>{quoteData.context ?
                        quoteData.context :
                        "Contexto não especificado"}
                    </TextParagraph>
                    <TextTitle>Tags</TextTitle>
                    <TextParagraph>{quoteData.tags ? quoteData.tags.join(" • ") : "Nenhuma tag adicionada (isso não deveria acontecer, contate o dev"}</TextParagraph>
                </ModalBody>
            </Modal>
        </>
    )
}