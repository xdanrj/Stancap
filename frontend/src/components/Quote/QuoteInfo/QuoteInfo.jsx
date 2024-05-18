import React, { useEffect, useState } from "react"
import { NormalDate, NormalDateAndHour } from "../../../Formatting/DateFormatting";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph } from "./QuoteInfoStyles";
import quoteEditingServices from "../../../services/quoteServices";
import userServices from "../../../services/userServices";
import _ from "lodash";

export default function QuoteInfo({ show, setShow, quoteData }) {
    const handleClose = () => setShow(false)
    const quoteService = new quoteEditingServices()
    const userService = new userServices()
    const [data, setData] = useState({})
    useEffect(() => {
        console.log(quoteData)
        async function formatData() {
            const updatedData = { ...quoteData }
            // updatedData.uploadByUser = await userService.getUsername(quoteData.uploadByUser)
            // updatedData.source = SourceNames.find(obj => obj.value === quoteData.source)?.name
            setData(updatedData)
        }
        formatData()
    }, [quoteData])

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <ModalTitle>Detalhes da Quote</ModalTitle>
                </Modal.Header>

                <ModalBody>

                    <TextTitle>Source</TextTitle>
                    <TextParagraph>{data.source ||
                        "Source não especificada"}
                    </TextParagraph>

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