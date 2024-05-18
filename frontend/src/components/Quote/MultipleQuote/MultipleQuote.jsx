import React, { useEffect, useState } from "react";
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import Sources from "../Sources";
import { QuoteHeader, QuoteContainer, SourceLogo } from "../../../CommonStyles/CommonStyles";
import Ballons from "./Ballons/Ballons";
const quoteService = new quoteEditingServices();
import QuoteInfo from "../QuoteInfo/QuoteInfo";
import InfoIcon from "../InfoIcon/InfoIcon";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export default function MultipleQuotes({ multipleQuotes }) {
    const Source = new Sources()
    const [showQuoteInfo, setShowQuoteInfo] = useState(false)
    const [quoteInfoData, setQuoteInfoData] = useState("")
    const [imagePaths, setImagePaths] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let paths = []
        const loadImagePaths = async () => {
            multipleQuotes.map((data) => {
                paths.push(Source.logoSelector(data.source))
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
                                        <SourceLogo src={imagePaths[index].path} onClick={() => navigate(`/quotes?source=${imagePaths[index].source}`)} />
                                    ) : (<></>)
                                }
                                <InfoIcon handleQuoteInfoClick={handleQuoteInfoClick} data={data} />
                            </QuoteHeader>
                            <Ballons data={data} multipleQuotes={multipleQuotes} />
                        </QuoteContainer>
                    </div>
                )
            })}
            {<QuoteInfo quoteData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
        </>
    )
}
