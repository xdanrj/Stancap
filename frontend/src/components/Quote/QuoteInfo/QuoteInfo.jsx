import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../Formatting/DateFormatting";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph, ClickabeTextParagraph } from "./QuoteInfoStyles";
import quoteEditingServices from "../../../services/quoteServices";
import userServices from "../../../services/userServices";
import _ from "lodash";
import Sources from "../Sources";

export default function QuoteInfo({ show, setShow, rawData }) {
    const handleClose = () => setShow(false)
    const Source = new Sources()
    const quoteService = new quoteEditingServices()
    const userService = new userServices()
    const [data, setData] = useState({})
    useEffect(() => {
        console.log(rawData)
        async function formatData() {
            const updatedData = { ...rawData }
            updatedData.uploadByUser = await userService.getUsername(rawData.uploadByUser)
            updatedData.source = Source.getLabel(rawData.source)            
            console.log(updatedData)
            setData(updatedData)
        }
        formatData()
    }, [rawData])

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Detalhes da Quote</ModalTitle>
                </Modal.Header>

                <ModalBody>
                    <TextTitle>Source</TextTitle>
                    <ClickabeTextParagraph>{data.source ||
                        "Source não especificada"}
                    </ClickabeTextParagraph>

                    <TextTitle>Data de upload</TextTitle>
                    <TextParagraph>{
                        NormalDateAndHour(data.uploadDate) ||
                        "Data não especificada"}
                    </TextParagraph>

                    {
                        data.lastEditDate && (
                            <>
                                <TextTitle>Última edição</TextTitle>
                                <TextParagraph>{
                                    NormalDateAndHour(data.lastEditDate) ||
                                    "Data não especificada"}
                                </TextParagraph>
                            </>
                        )
                    }

                    <TextTitle>Upload por</TextTitle>
                    <TextParagraph>{
                        data.uploadByUser ||
                        "Usuário não especificado (isso não deveria acontecer, contate o dev)"}
                    </TextParagraph>

                    <TextTitle>Contexto</TextTitle>
                    <TextParagraph>{
                        data.context ||
                        "Contexto não especificado"}
                    </TextParagraph>
                    <TextTitle>Tags</TextTitle>
                    <TextParagraph>{data.tags?.join(" • ") || "Nenhuma tag adicionada (isso não deveria acontecer, contate o dev"}</TextParagraph>

                    {data.quoteType === "multiple" && (
                        <>
                            <TextTitle>Data</TextTitle>
                            <TextParagraph>{
                                data.date || "Data não especificada"}</TextParagraph>
                        </>
                    )}
                </ModalBody>
            </Modal>
        </>
    )
}