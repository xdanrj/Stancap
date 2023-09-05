import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer } from "./SummaryQuoteStyles";
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
            setQuotesResponseArray(quotesResponse.response)
        }
        fetchQuotes()
    }, []);
    return (
        <>
            {
                quotesResponse.quantity > 0 ? (
                    quotesResponseArray.map((data) => {
                        <div key={data._id}>
                            <MinimalQuoteContainer>
                                <p>{data.quotes[0].quote}</p>
                            </MinimalQuoteContainer>
                        </div>
                    })
                ) : (
                    <h1>{quotesResponse.message}</h1>
                )

            }
        </>
    )
}