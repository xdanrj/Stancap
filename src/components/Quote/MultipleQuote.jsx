import React, { useEffect, useState } from "react";
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";

import { QuoteContainer, Ballon, Paragraph, ParagraphAutor, SourceLogo } from "./MultipleQuoteStyles";
const quoteService = new quoteServices();

export default function MultipleQuote() {
    const [quotesResponse, setQuotesResponse] = useState([]);
    useEffect(() => {
        async function fetchQuotes() {
            const quoteService = new quoteServices();
            const response = await quoteService.getAllQuotes();
            setQuotesResponse(response);
        }
        fetchQuotes();
    }, []);

    return (
        <>
            {quotesResponse.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY");
                return (
                    <QuoteContainer key={data.id}>
                        <SourceLogo src="../src/images/Stancap.png" />
                        {data.quotes.map((quote, index) => (
                            <Ballon key={index} ballonside={index % 2 === 0}>
                                <ParagraphAutor>
                                    {quote.author}
                                </ParagraphAutor>
                                <Paragraph>
                                    {quote.quote}
                                </Paragraph>
                            </Ballon>
                        ))}
                    </QuoteContainer>
                );
            })}
        </>
    );
}
