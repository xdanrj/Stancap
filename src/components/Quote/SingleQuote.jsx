import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";

import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate, FooterLine, SourceLogo } from "./SingleQuoteStyles"

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
        <>
            {quotesResponse.map((data, index) => {
                data.date = dayjs().format("DD/MM/YYYY")
                return (
                    <QuoteContainer key={index}>
                        <SourceLogo src="../src/images/Stancap.png" />
                        <>
                            <Paragraph>
                                ‟{data.quotes[0].quote}”
                            </Paragraph>
                            <ParagraphAutor>
                                —{data.author}
                            </ParagraphAutor>
                            <ParagraphDate>
                                ({data.date})
                            </ParagraphDate>
                        </>
                    </QuoteContainer>
                )
            })}
        </>
    )
}