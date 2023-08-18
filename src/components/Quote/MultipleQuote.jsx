import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import { SourceLogo, OLDQuoteContainer } from "./QuoteStyles";

import { QuoteContainer, BallonContainer, Ballon, Paragraph, ParagraphAutor } from "./MultipleQuoteStyles";
const quoteService = new quoteServices()

export default function MultipleQuote() {
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
            <QuoteContainer>
                <SourceLogo src="../src/images/Stancap.png" />
                {quotesResponse.map((data) => {
                    data.date = dayjs().format("DD/MM/YYYY")
                    return (
                        <>
                            {data.quotes.map((quote, index) => (
                                <>
                                    <BallonContainer key={index} iseven={index % 2 === 0}>
                                        <Ballon >
                                            <ParagraphAutor>
                                                {quote.author}
                                            </ParagraphAutor>
                                            <Paragraph >
                                                {quote.quote}
                                            </Paragraph>
                                        </Ballon>
                                    </BallonContainer>
                                </>
                            ))}
                        </>
                    )
                })}
            </QuoteContainer>
        </>
    )
}