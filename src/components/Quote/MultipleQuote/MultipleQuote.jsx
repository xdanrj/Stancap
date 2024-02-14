import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, QuoteContainer, SourceLogo } from "../../../CommonStyles/CommonStyles";
import { Ballon, Paragraph, ParagraphAutor } from "./MultipleQuoteStyles";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import InfoIcon from "../InfoIcon/InfoIcon";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])

    useEffect(() => {
        let paths = []
        const loadImagePaths = async () => {
            multipleQuotes.map((data) => {
                paths.push(sourceLogoSelector(data.source))
            })
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
                data.date = NormalDate()
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                {
                                    imagePaths[index] ? (
                                        <SourceLogo src={imagePaths[index].path} onClick={() => navigate(`/quotes/source/${imagePaths[index].source}`)} />
                                    ) : (<></>)
                                }
                                <InfoIcon handleQuoteInfoClick={handleQuoteInfoClick} data={data} />
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
