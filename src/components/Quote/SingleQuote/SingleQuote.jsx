import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, SourceLogo, InfoIcon } from "../../../CommonStyles/CommonStyles";
import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate } from "./SingleQuoteStyles"
const quoteService = new quoteEditingServices()
import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";
import { useNavigate } from "react-router-dom";

export default function SingleQuotes({ singleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadImagePaths = async () => {
            const promisses = await singleQuotes.map(async (data) => {
                return sourceLogoSelector(data.source)
            })
                const paths = await Promise.all(promisses)
                setImagePaths(paths)
        }
        loadImagePaths()
    }, [singleQuotes])

    const handleQuoteInfoClick = (data) => {
        setQuoteInfoData(data)
        setShowQuoteInfo(true)
    }
    return (
        <>
            {singleQuotes.map((data, index) => {               
                return (
                    <div key={data._id}>
                        <QuoteContainer>
                            <QuoteHeader>
                                {
                                    imagePaths[index] ? (
                                        <SourceLogo src={imagePaths[index].path} onClick={() => navigate(`/quotes/source/${imagePaths[index].source}`)}/>
                                    ) : (<></>)
                                }
                                <InfoIcon onClick={() => handleQuoteInfoClick(data)} />

                            </QuoteHeader>
                            <>
                                <Paragraph>
                                    ‟{data.quotes[0].quote}”
                                </Paragraph>
                                <ParagraphAutor onClick={() => navigate(`/quotes/author/${data.author}`)}>
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