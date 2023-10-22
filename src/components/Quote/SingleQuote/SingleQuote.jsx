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
    const [imagePaths, setImagePaths] = useState([])

    useEffect(() => {
        const loadImagePaths = async () => {
            const paths = await Promise.all(
                singleQuotes.map(data =>
                    sourceLogoSelector(data.source)))
            setImagePaths(paths)
        }
        loadImagePaths()
    }, [singleQuotes])

    console.log(imagePaths)
    const handleQuoteInfoClick = (data) => {
        setQuoteInfoData(data)
        setShowQuoteInfo(true)
    }
    return (
        <>
            {singleQuotes.map((data, index) => {
                const imgPath = imagePaths[index]
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                {
                                    imgPath ? (
                                        <SourceLogo src={imgPath} />) : (
                                        <SourceLogo src={`../src/images/Blank.png`} />)
                                }
                                <InfoIcon onClick={() => handleQuoteInfoClick(data)} />

                            </QuoteHeader>
                            <>
                                <Paragraph>
                                    ‟{data.quotes[0].quote}”
                                </Paragraph>
                                <ParagraphAutor>
                                    —{data.author ? data.author : "Autor desconhecido"}
                                </ParagraphAutor>
                                <ParagraphDate>
                                    ({data.date ? data.date : "Data desconhecida"})
                                </ParagraphDate>
                            </>
                        </QuoteContainer>
                    </div>
                )
            })}
            {<QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
        </>
    )
}