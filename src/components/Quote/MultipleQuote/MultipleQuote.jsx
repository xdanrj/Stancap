import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, SourceLogo, InfoIcon } from "../../../CommonStyles/CommonStyles";
import { QuoteContainer, Ballon, Paragraph, ParagraphAutor } from "./MultipleQuoteStyles";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])

    useEffect(() => {
        const loadImagePaths = async () => {
            const paths = await Promise.all(
                multipleQuotes.map(async (data) => {
                    try {
                        return await sourceLogoSelector(data.source)
                    } catch (error) {
                        return "false"
                    }
                }))
            setImagePaths(paths)
        }
        loadImagePaths()
    }, [multipleQuotes])

    const handleQuoteInfoClick = (data) => {
        setQuoteInfoData(data)
        setShowQuoteInfo(true)
    }

    return (
        <>
            {multipleQuotes.map((data, index) => {
                const imgPath = imagePaths[index]
                data.date = NormalDate()
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                            {
                                    imgPath ? (
                                        <SourceLogo src={imgPath} />
                                    ) : (<></>)                                        
                                }
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
            {<QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
        </>
    )
}
