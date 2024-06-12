import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAuthor, MdbIcon } from "./MyQuotesStyles";
import { Col, Row, Button } from "react-bootstrap";
import quoteEditingServices from "../../../services/quoteServices"
import { useNavigate } from "react-router-dom";
import QuoteInfo from "../../../components/Quote/QuoteInfo/QuoteInfo";
import { useAlertMsg } from "../../../components/Alert/AlertContext"
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import PageSelector from "../../../components/PageSelector/PageSelector";
import { MinimalQuoteLoading } from "../../../components/LoadingSkeleton/LoadingSkeleton";
const quoteService = new quoteEditingServices()

export default function MyQuotes() {
  const useAlert = useAlertMsg()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [quotesResponse, setQuotesResponse] = useState([])
  const [userId, setUserId] = useState([localStorage.getItem("userId")][0])
  const [deletedQuotes, setDeletedQuotes] = useState([])
  const [quotesQtd, setQuotesQtd] = useState(0)
  const [showQuoteInfo, setShowQuoteInfo] = useState(false)
  const [quoteInfoData, setQuoteInfoData] = useState("")
  const [loading, setLoading] = useState(true)

  async function getQuotes() {
    try {
      const searchParamsQuery = Object.fromEntries(searchParams)
      const queryWithUserId = { ...searchParamsQuery, "uploadByUser": userId }
      const { quotes, quotesQtd, message } = await quoteService.getQuotes(queryWithUserId)
      console.log(quotes)
      localStorage.setItem("userQuotesQtd", quotesQtd)
      setQuotesQtd(quotesQtd)
      setQuotesResponse(quotes)
    } catch (error) {
      (error.message && useAlert(error.message)) || useAlert(message)
    }
  }

  const handleEditQuote = async (quoteId, quoteType) => {
    try {
      searchParams.set("type", quoteType)
      searchParams.set("_id", quoteId)
      console.log(searchParams.toString())
      navigate({ pathname: "/edit_quote", search: searchParams.toString() })
    } catch (error) {
      useAlert(error)
    }
  }

  const handleDeleteQuote = async (quoteId) => {
    try {
      console.log("quoteId: ", quoteId)
      console.log("userId: ", userId)
      const response = await quoteService.deleteQuote(quoteId, userId)
      console.log(response)
      if ("selectedQuote" in response) {
        setDeletedQuotes(deletedQuotes => [...deletedQuotes, response.selectedQuote])
        useAlert("Quote excluída com sucesso", 500)
      } else {
        useAlert(response.message, 1000)
      }
    } catch (error) {
      useAlert(error)
      console.log(error)
    }
  }
  const handleUndoDeleteQuote = async (quoteId) => {
    try {
      const recoveredQuote = deletedQuotes.find((obj) => obj._id === quoteId)
      console.log(recoveredQuote)
      if (recoveredQuote) {
        await quoteService.addQuote(recoveredQuote)
        setDeletedQuotes(deletedQuotes.filter(item => item._id !== quoteId))
        useAlert("Exclusão desfeita", 500)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleQuoteInfoClick = (data) => {
    setQuoteInfoData(data)
    setShowQuoteInfo(true)
  }

  return (
    <>
      <Row className="justify-content-center">
        <SearchBar loading={loading} setLoading={setLoading} setQuotesResponse={setQuotesResponse} quotesQtd={quotesQtd} setQuotesQtd={setQuotesQtd} />
        <Col xs={12} sm={9} md={7} lg={6} xl={5}>
          {
            loading ? (
              <>
                <MinimalQuoteLoading count={5} />
              </>
            ) : (
              quotesResponse?.length > 0 && ( quotesResponse.map((data) => (
                <div key={data._id}>
                  <MinimalQuoteContainer>
                    <InternalContainer>
                      <Paragraph>{data.quotes[0]?.quote && data.quotes[0].quote} </Paragraph>
                      <ParagraphAuthor>—{data.quoteType === "single" ? data.author : data.quotes[0].author}</ParagraphAuthor>
                      {deletedQuotes.find((obj) => obj._id === data._id) ?
                        <>
                          <MdbIcon className="col-3" fas icon="undo-alt" onClick={() => handleUndoDeleteQuote(data._id)} />
                        </>
                        :
                        <>
                          <MdbIcon icon="info-circle" onClick={() => handleQuoteInfoClick(data)} />
                          <MdbIcon icon="trash-alt" onClick={() => handleDeleteQuote(data._id)} />
                          <MdbIcon icon="pencil-alt" onClick={() => handleEditQuote(data._id, data.quoteType)} />
                        </>
                      }
                    </InternalContainer>
                  </MinimalQuoteContainer>
                </div>
              ))
            )) ||
            <>
            <h3>Você não criou nenhuma quote</h3>
            </>
          }
          {<QuoteInfo rawData={quoteInfoData} show={showQuoteInfo} setShow={setShowQuoteInfo} />}
          <PageSelector searchParams={searchParams} quotesQtd={quotesQtd} setQuotesQtd={setQuotesQtd} />
        </Col>
      </Row >
    </>
  )
}