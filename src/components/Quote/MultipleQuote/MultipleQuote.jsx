import React, { useEffect, useState } from "react";
import quoteServices from "../../../services/quoteServices";
import dayjs from "dayjs";

import { QuoteContainer, QuoteHeader, Ballon, Paragraph, ParagraphAutor, SourceLogo, InfoIcon } from "./MultipleQuoteStyles";
const quoteService = new quoteServices();

export default function MultipleQuotes({ multipleQuotes }) {
    return (
        <>
            {multipleQuotes.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY");
                return (
                    <QuoteContainer key={data.id}>
                        <QuoteHeader>
                            <SourceLogo src="../src/images/Stancap.png" />
                            <InfoIcon />
                        </QuoteHeader>
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
