import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer } from "./SummaryQuoteStyles";
import quoteEditingServices from "../../services/quoteServices";

export default function SummaryQuote() {
    const [quotesResponse, setQuotesResponse] = useState([])

    useEffect(() => {
        async function fetchQuotes() {
            const username = localStorage.getItem("username")
            console.log(`o username é: ${username}`)
            const quoteService = new quoteEditingServices()
            const query = {"uploadByUser": "a"}
            const response = await quoteService.getQuote(query)
            console.log(response)
            setQuotesResponse(response.data.response)
        }
        fetchQuotes()
    }, []);
    
    return (
        <>
            {quotesResponse.map((data) => {
                return (
                    <div key={data._id}>                        
                        <MinimalQuoteContainer>
                            <p>{data.quotes[0].quote}</p>
                        </MinimalQuoteContainer>
                    </div>
                )
            })}
        </>
    )
}