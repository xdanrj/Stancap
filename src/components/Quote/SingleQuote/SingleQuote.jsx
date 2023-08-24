import React, { useEffect, useState } from "react"
import quoteServices from "../../../services/quoteServices";
import dayjs from "dayjs";

import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate, FooterLine, SourceLogo } from "./SingleQuoteStyles"

const quoteService = new quoteServices()

export default function SingleQuotes({ singleQuotes }) {
    return (
        <>
            {singleQuotes.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY")
                return (
                    <QuoteContainer key={data.id}>
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