import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../../services/quoteServices";
import { NormalDate } from "../../../Formatting/DateFormatting";
import Sources from "../Sources";
import { QuoteHeader, SourceLogo, QuoteContainer } from "../../../CommonStyles/CommonStyles";
import { Paragraph, ParagraphAuthor, ParagraphDate } from "./SingleQuoteStyles"

import QuoteInfo from "../QuoteInfo/QuoteInfo";
import { useNavigate } from "react-router-dom";
import InfoIcon from "../InfoIcon/InfoIcon";
import { QuoteLoading } from "../../LoadingSkeleton/LoadingSkeleton";

export default function SingleQuotes({ singleQuotes }) {
  const Source = new Sources()
  const [showQuoteInfo, setShowQuoteInfo] = useState(false)
  const [quoteInfoData, setQuoteInfoData] = useState("")
  const [imagePaths, setImagePaths] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let paths = []
    const loadImagePaths = async () => {
      singleQuotes.map((data) => {
        paths.push(Source.logoSelector(data.source))
      })
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
                  imagePaths.length < 1 ? (
                    <>
                    <div className="bg-primary"></div>
                    </>
                  ) : (
                    imagePaths[index] && (
                      <SourceLogo src={imagePaths[index].path} onClick={() => navigate(`?source=${imagePaths[index].source}`)} />
                    )
                  )
                }
                <InfoIcon handleQuoteInfoClick={handleQuoteInfoClick} data={data} />
              </QuoteHeader>
              <>
                <Paragraph>
                  ‟{data.quotes[0].quote}”
                </Paragraph>
                <ParagraphAuthor onClick={() => navigate(`/quotes?author=${data.author}`)}>
                  —{data.author ? data.author : "Autor desconhecido"}
                </ParagraphAuthor>
                <ParagraphDate>
                  ({data.date ? data.date : "Data desconhecida"})
                </ParagraphDate>
              </>
            </QuoteContainer>
          </div>
        )
      })}
      {<QuoteInfo rawData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
    </>
  )
}