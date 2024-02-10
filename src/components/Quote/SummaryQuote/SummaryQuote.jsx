import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAutor, MdbIcon } from "./SummaryQuoteStyles";
import { Col, Row } from "react-bootstrap";
import quoteEditingServices from "../../../services/quoteServices"
import { useNavigate } from "react-router-dom";
import QuoteInfo from "./QuoteInfo/QuoteInfo";
import { useAlertMsg } from "../../Alert/AlertContext";

const quoteService = new quoteEditingServices()

export default function SummaryQuote() {
    const useAlert = useAlertMsg()
    const navigate = useNavigate()
    const [quotesResponse, setQuotesResponse] = useState([])
    const [quotesResponseArray, setQuotesResponseArray] = useState([])
    const [userId, setUserId] = useState([localStorage.getItem("userId")])

    useEffect(() => {
        async function fetchQuotes() {
            let query = { "uploadByUser": userId }
            const response = await quoteService.getQuote(query)
            setQuotesResponse(response)
            setQuotesResponseArray(response)
        }
        fetchQuotes()
    }, [])

    const handleEditQuote = async (quoteId, quoteType) => {
        try {
            navigate(`/edit_quote/${quoteType}/${quoteId}`)
        } catch (error) {
            useAlert(error)
        }
    }

    const handleDeleteQuote = async (quoteId) => {
        try {
            console.log(quoteId)
            const response = await quoteService.deleteQuote(quoteId, {userId: userId[0]})
            if (response) {
                useAlert("Quote deletada com sucesso")
            } else {
                useAlert("Erro ao tentar deletar quote")
            }
        } catch (error) {
            useAlert(error)
            console.log(error)
        }
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5}>
                    {
                        quotesResponse.length > 0 ? (
                            quotesResponseArray.map((data) => (
                                <div key={data._id}>
                                    <MinimalQuoteContainer>
                                        <InternalContainer>
                                            <Paragraph>{data.quotes[0].quote} </Paragraph>
                                            <ParagraphAutor>—{data.quoteType == "single" ? data.author : data.quotes[0].author}</ParagraphAutor>
                                            <MdbIcon icon="info-circle" />
                                            <MdbIcon icon="trash-alt" onClick={() => handleDeleteQuote({ _id: data._id })} />
                                            <MdbIcon icon="pencil-alt" onClick={() => handleEditQuote(data._id, data.quoteType)} />                                           
                                        </InternalContainer>
                                    </MinimalQuoteContainer>
                                </div>
                            ))
                        ) : (
                            <h4>Você ainda não criou nenhuma quote</h4>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}