import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import { SourceLogo, QuoteContainer } from "./QuoteStyles";
import { QuoteCard, Paragraph } from "./SingleQuoteStyles"

const quoteService = new quoteServices()
export default function SingleQuote() {
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
            {quotesResponse.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY")
                return (
                    < QuoteContainer key={data._id} >
                        <QuoteCard>
                            <SourceLogo src="../src/images/Stancap.png" />
                            <Paragraph>
                                {data.quotes[0].quote}
                            </Paragraph>
                            {data.author} {data.date}
                        </QuoteCard>
                    </QuoteContainer >
                )
            })}
        </div>
    )
}