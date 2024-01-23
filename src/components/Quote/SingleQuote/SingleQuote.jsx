import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, SourceLogo } from "../../../CommonStyles/CommonStyles";
import { QuoteContainer, Paragraph, ParagraphAutor, ParagraphDate } from "./SingleQuoteStyles"

import QuoteInfo from "../SummaryQuote/QuoteInfo/QuoteInfo";
import { useNavigate } from "react-router-dom";
import InfoIcon from "../InfoIcon/InfoIcon";

export default function SingleQuotes({ singleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])
    const navigate = useNavigate()
    const quoteService = new quoteEditingServices()


    useEffect(() => {
        const loadImagePaths = async () => {
            const promisses = await singleQuotes.map(async (data) => {
                return sourceLogoSelector(data.source)
            })
            const paths = await Promise.all(promisses)
            setImagePaths(paths)
        }

        const setUploadersNames = async () => {
            singleQuotes.map(async (data) => {
                console.log(data.uploadByUser)
                console.log(typeof(data.uploadByUser))
                console.log(await quoteService.getUploaderUsername(data.uploadByUser))
                data.uploadByUser = await quoteService.getUploaderUsername(data.uploadByUser)
            })
        }
        loadImagePaths()
        setUploadersNames()
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
                                        <SourceLogo src={imagePaths[index].path} onClick={() => navigate(`/quotes/source/${imagePaths[index].source}`)} />
                                    ) : (<></>)
                                }
                                <InfoIcon handleQuoteInfoClick={handleQuoteInfoClick} data={data} />
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