import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import { sourceLogoSelector } from "../SourceCommonFunctions";
import { QuoteHeader, QuoteContainer, SourceLogo } from "../../../CommonStyles/CommonStyles";
import Ballons from "./Ballons/Ballons";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import InfoIcon from "../InfoIcon/InfoIcon";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export default function MultipleQuotes({ multipleQuotes }) {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])
    //const [authorsColors, setAuthorsColors] = useState([])
    const navigate = useNavigate()

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

    
    /*useEffect(() => {
        const loadAuthorsColors = async () => {
            let uniqueAuthors = await multipleQuotes.map((mainObj) => {
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
            setAuthorsColors(uniqueAuthorsColors)
            console.log(uniqueAuthorsColors)
        }
        loadAuthorsColors()
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
                         <Ballons data={data} multipleQuotes={multipleQuotes}/>
                            {/*
                            {data.quotes.map((quote, index) => (
                                <Ballon key={index} ballonside={index % 2 === 0} >
                                    {console.log(quote)}
                                    <ParagraphAuthor authorcolor={authorsColors.find(obj => obj.author === quote.author)?.color}>
                                        {quote.author}
                                    </ParagraphAuthor>
                                    <Paragraph>
                                        {quote.quote}
                                    </Paragraph>
                                </Ballon>
                            ))} */}
                        </QuoteContainer>
                    </div>
                )
            })}
            {<QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
        </>
    )
}
