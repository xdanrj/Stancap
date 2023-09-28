import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import {NormalDate} from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../CommonFunctions";
import { QuoteContainer, QuoteHeader, Ballon, Paragraph, ParagraphAutor, SourceLogo, InfoIcon } from "./MultipleQuoteStyles";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")

    const handleQuoteInfoClick = (data) => {
        setQuoteInfoData(data)
        setShowQuoteInfo(true)
    }

    return (
        <>
            {multipleQuotes.map((data) => {
                data.date = NormalDate()
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                <SourceLogo src={sourceLogoSelector(data.source)} />
                                <InfoIcon onClick={() => handleQuoteInfoClick(data)} />
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
                <QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo}/>
            
            }
        </>
    )
}
