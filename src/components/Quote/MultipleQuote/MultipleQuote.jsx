import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import dayjs from "dayjs";
import { sourceLogoSelector } from "../CommonFunctions";
import { QuoteContainer, QuoteHeader, Ballon, Paragraph, ParagraphAutor, SourceLogo, InfoIcon } from "./MultipleQuoteStyles";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoId, setQuoteInfoId] = useState("")

    return (
        <>
            {multipleQuotes.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY")
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                <SourceLogo src={sourceLogoSelector(data.source)} />
                                <InfoIcon onClick={() => setQuoteInfoId(data._id)}/>
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
                    </div>
                )
            })}
            {
                <QuoteInfo quoteData={} />
            }
        </>
    )
}
