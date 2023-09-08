import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAutor, MdbIcon } from "./SummaryQuoteStyles";
import { Col, Row } from "react-bootstrap";
import quoteEditingServices from "../../services/quoteServices";

export default function SummaryQuote() {
    const [quotesResponse, setQuotesResponse] = useState([])
    const [quotesResponseArray, setQuotesResponseArray] = useState([])
    const [editingQuote, setEditingQuote] = useState({})

    useEffect(() => {
        async function fetchQuotes() {
            const username = localStorage.getItem("username")
            const quoteService = new quoteEditingServices()
            let query = { "uploadByUser": localStorage.getItem("username") }
            const response = await quoteService.getQuote(query)
            setQuotesResponse(response.data.response)
            setQuotesResponseArray(response.data.response.response)
        }
        fetchQuotes()

    }, []);

    const handleEditQuote = (quoteId) => {
        let queryAndBody = {_id: quoteId}
        quoteService.editQuote(queryAndBody)
    }

    return (
        <>
            {
                quotesResponse.quantity > 0 ? (
                    quotesResponseArray.map((data) => (
                        <div key={data._id}>
                            <MinimalQuoteContainer>
                                <InternalContainer>
                                    <Paragraph>{data.quotes[0].quote} </Paragraph>
                                    <ParagraphAutor>—{data.author}</ParagraphAutor>                                
                                    <MdbIcon icon="trash-alt" />
                                    <MdbIcon icon="pencil-alt" onClick={(handleEditQuote(data._id))} />
                                    <MdbIcon icon="info-circle" />
                                    </InternalContainer>
                            </MinimalQuoteContainer>
                        </div>
                    ))
                ) : (
                    <h1>{quotesResponse.message}</h1>
                )
            }
        </>
    )
}