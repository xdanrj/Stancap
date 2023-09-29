import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, SourceLogo, InfoIcon } from "../../../CommonStyles/CommonStyles";
import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate } from "./SingleQuoteStyles"
const quoteService = new quoteEditingServices()
import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";

export default function SingleQuotes({ singleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")

    const handleQuoteInfoClick = (data) => {
        setQuoteInfoData(data)
        setShowQuoteInfo(true)
    }
    return (
        <>
            {singleQuotes.map((data) => {
                data.date = NormalDate()
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                <SourceLogo src={sourceLogoSelector(data.source)} />
                                <InfoIcon onClick={() => handleQuoteInfoClick(data)} />
                            </QuoteHeader>
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
                    </div>
                )
            })}
            {<QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo}/>}
        </>
    )
}