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

    useEffect(() => {
        async function fetchQuotes() {
            const username = localStorage.getItem("username")
            let query = { "uploadByUser": localStorage.getItem("username") }

            const response = await quoteService.getQuote(query)
            setQuotesResponse(response)
            setQuotesResponseArray(response)
        }
        fetchQuotes()
    }, []);

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
            const response = await quoteService.deleteQuote(quoteId)
            if (response) {
                useAlert("Quote deletada com sucesso")
            }
        } catch (error) {
            useAlert(error)
            console.log(error)
        }
    }

    return (
        <>
            {
                quotesResponse.length > 0 ? (
                    quotesResponseArray.map((data) => (
                        <div key={data._id}>
                            <MinimalQuoteContainer>
                                <InternalContainer>
                                    <Paragraph>{data.quotes[0].quote} </Paragraph>
                                    <ParagraphAutor>—{data.author}</ParagraphAutor>
                                    <MdbIcon icon="trash-alt" onClick={() => handleDeleteQuote({_id: data._id})} />
                                    <MdbIcon icon="pencil-alt" onClick={() => handleEditQuote(data._id, data.quoteType)} />
                                    <MdbIcon icon="info-circle" />
                                </InternalContainer>
                            </MinimalQuoteContainer>
                        </div>
                    ))
                ) : (
                    <h4>Você ainda não criou nenhuma quote</h4>
                )
            }

        </>
    )
}