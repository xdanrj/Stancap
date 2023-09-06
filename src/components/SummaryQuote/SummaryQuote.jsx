import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, Paragraph, ParagraphAutor } from "./SummaryQuoteStyles";
import quoteEditingServices from "../../services/quoteServices";

export default function SummaryQuote() {
    const [quotesResponse, setQuotesResponse] = useState([])
    const [quotesResponseArray, setQuotesResponseArray] = useState([])

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
    
    return (
        <>
            {
                quotesResponse.quantity > 0 ? (
                    quotesResponseArray.map((data) => (
                        <div key={data._id}>
                            <MinimalQuoteContainer>
                                <Paragraph>{data.quotes[0].quote}</Paragraph>
                                <ParagraphAutor>—{data.author}</ParagraphAutor>
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