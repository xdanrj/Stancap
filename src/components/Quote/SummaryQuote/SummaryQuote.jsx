import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAutor, MdbIcon } from "./SummaryQuoteStyles";
import { Col, Row } from "react-bootstrap";
import quoteEditingServices from "../../../services/quoteServices"
import { useNavigate } from "react-router-dom";
import QuoteInfo from "./QuoteInfo/QuoteInfo";

const quoteService = new quoteEditingServices()

export default function SummaryQuote() {
    const navigate = useNavigate()
    const [quotesResponse, setQuotesResponse] = useState([])
    const [quotesResponseArray, setQuotesResponseArray] = useState([])
    

    useEffect(() => {
        async function fetchQuotes() {
            const username = localStorage.getItem("username")
            let query = { "uploadByUser": localStorage.getItem("username") }

            const response = await quoteService.getQuote(query)
            console.log(response)
            console.log(response.data.response)
            setQuotesResponse(response.data.response)
            setQuotesResponseArray(response.data.response.response)
        }
        fetchQuotes()

    }, []);

    const handleEditQuote = async (quoteId) => {
        try {
            navigate(`/edit_quote/${quoteId}`)
        } catch (error) {
            alert(error)
        }
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
                                    <MdbIcon icon="pencil-alt" onClick={() => handleEditQuote(data._id)} />
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