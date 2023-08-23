import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import { SourceLogo } from "./QuoteStyles";

import { QuoteContainer, Ballon, Paragraph, ParagraphAutor } from "./MultipleQuoteStyles";
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
            {quotesResponse.map((data) => {
                return (
                    <>
                        <QuoteContainer>
                            <SourceLogo src="../src/images/Stancap.png" />
                            data.date = dayjs().format("DD/MM/YYYY")
                            {data.quotes.map((quote, index) => (
                                <>
                                    <Ballon key={index} ballonside={index % 2 === 0}>
                                        <ParagraphAutor>
                                            {quote.author}
                                        </ParagraphAutor>
                                        <Paragraph>
                                            {quote.quote}
                                        </Paragraph>
                                    </Ballon>
                                </>
                            ))}

                            )
                })}
                        </QuoteContainer>
                    </>
                )
            }