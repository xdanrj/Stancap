import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, QuoteContainer, SourceLogo } from "../../../CommonStyles/CommonStyles";
import { Ballon, Paragraph, ParagraphAuthor } from "./MultipleQuoteStyles";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import InfoIcon from "../InfoIcon/InfoIcon";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])
    const [ballonColors, setBallonColors] = useState([])
    const navigate = useNavigate()
    const colorPallet = ["#071e26", "#1e0726", "#260f07", "#0e2607", "#262207", "#070826", "#172607", "#072625", "#150726", "#1d2607"]

    useEffect(() => {
        let paths = []
        const loadImagePaths = async () => {
            multipleQuotes.map((data) => {
                paths.push(sourceLogoSelector(data.source))
            })
            setImagePaths(paths)
        }
        loadImagePaths()


        let uniqueAuthors = multipleQuotes.map((mainObj) => {
            return mainObj.quotes
            
        })
        console.log(uniqueAuthors)
        uniqueAuthors = _.uniqBy(_.flattenDeep(uniqueAuthors), "author").map((obj) => obj.author)
        
        const uniqueAuthorsColors = uniqueAuthors.map((authorName, index) => {
            return {
                author: authorName,
                color: colorPallet[index ? index : 0]
            }
        })
        setBallonColors(uniqueAuthorsColors)
        console.log(uniqueAuthorsColors)

    }, [multipleQuotes])

    /*const colorPallet = ["#071e26", "#1e0726", "#260f07", "#0e2607", "#262207", "#070826", "#172607", "#072625", "#150726", "#1d2607"]

    useEffect(() => {
        let uniqueAuthors = multipleQuotes.map((mainObj) => {
            return mainObj.quotes
            
        })
        console.log(uniqueAuthors)
        uniqueAuthors = _.uniqBy(_.flattenDeep(uniqueAuthors), "author").map((obj) => obj.author)
        
        const uniqueAuthorsColors = uniqueAuthors.map((authorName, index) => {
            return {
                author: authorName,
                color: colorPallet[index ? index : 0]
            }
        })
        setBallonColors(uniqueAuthorsColors)
        console.log(uniqueAuthorsColors)

    }, [multipleQuotes])*/

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
                                <Ballon key={index} ballonside={index % 2 === 0} balloncolor={ballonColors.find(obj => obj.author === quote.author).color}>
                                    {console.log(ballonColors.find(obj => obj.author === quote.author))}
                                    <ParagraphAuthor>
                                        {quote.author}
                                    </ParagraphAuthor>
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
