import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../../services/quoteServices";
import dayjs from "dayjs";
import { sourceLogoSelector } from "../CommonFunctions";
import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate, FooterLine, SourceLogo } from "./SingleQuoteStyles"

const quoteService = new quoteEditingServices()

export default function SingleQuotes({ singleQuotes }) {
    return (
        <>
            {singleQuotes.map((data) => {
                const formatedDate = dayjs(data.date).format("DD/MM/YYYY")
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <SourceLogo src={sourceLogoSelector(data.source)} />
                            <>
                                <Paragraph>
                                    ‟{data.quotes[0].quote}”
                                </Paragraph>
                                <ParagraphAutor>
                                    —{data.author}
                                </ParagraphAutor>
                                <ParagraphDate>
                                    ({formatedDate})
                                </ParagraphDate>
                            </>
                        </QuoteContainer>
                    </div>
                )
            })}
        </>
    )
}