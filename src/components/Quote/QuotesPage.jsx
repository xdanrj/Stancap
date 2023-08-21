import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import SingleQuote from "./SingleQuote";
import MultipleQuote from "./MultipleQuote";
import GlobalStyles from "../../GlobalStyles/GlobalStyles";

import { QuotesPageGeral } from "./QuoteStyles";
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
        <>
        <QuotesPageGeral>
            <GlobalStyles />
            <SingleQuote/>
            </QuotesPageGeral>
            </>
    )
}
export default QuotesPage


/*
  {quotesResponse.map((data, index) => {
                if (data.quotes.length === 1) {
                    return (
                        <SingleQuote key={index}/>
                    )
                }
                else if (data.quotes.length > 1) {
                    return (
                        <MultipleQuote key={index}/>
                    )
                } else {
                    return (
                        <h1>Nenhuma quote encontrada</h1>
                    )
                }
            })}

*/
