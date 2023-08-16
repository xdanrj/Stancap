import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";

import SingleQuote from "./SingleQuote";
import MultipleQuote from "./MultipleQuote";
import GlobalStyles from "../../GlobalStyles/GlobalStyles";
import { QuoteContainerBody } from "./QuoteStyles";
const quoteService = new quoteServices()

function QuotesPage() {
    const [quotesResponse, setQuotesResponse] = useState([])
    useEffect(() => {
        async function fetchQuotes() {
            const quoteService = new quoteServices()
            const response = await quoteService.getAllQuotes()
            setQuotesResponse(response)
        }
        fetchQuotes()
    }, [])

    return (
        <div>
            <GlobalStyles />
            <QuoteContainerBody>
                {quotesResponse.map((data) => {
                    if (data.quotes.length === 1) {
                        return (
                            <SingleQuote />
                        )
                    }
                    else if (data.quotes.length > 1) {
                        return (
                            <MultipleQuote />
                        )
                    } else {
                        return (
                            <h1>Nenhuma quote encontrada</h1>
                        )
                    }
                })}
            </QuoteContainerBody>
        </div >
    )
}
export default QuotesPage
