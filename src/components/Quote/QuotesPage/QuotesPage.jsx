import React, { useEffect, useState } from "react"
import { useParams, useLocation, useSearchParams } from "react-router-dom"
import quoteEditingServices from "../../../services/quoteServices"
import SingleQuote from "../SingleQuote/SingleQuote"
import MultipleQuote from "../MultipleQuote/MultipleQuote"
import { sizes } from "../../../CommonStyles/screenSizes"
import { SearchBar } from "../../SearchBar/SearchBar"
import { useAlertMsg } from "../../Alert/AlertContext"
import { Col, Row, Container } from "react-bootstrap"
import userServices from "../../../services/userServices"
import { useModalBox } from "../../Modal/ModalContext"
import { QuotesPageFirstVisitModal } from "./QuotesPageFirstVisitModal/QuotesPageFirstVisitModal"
import PageSelector from "../../PageSelector/PageSelector"
import { useNavigate } from "react-router-dom"
import { QuoteLoading } from "../../LoadingSkeleton/LoadingSkeleton"

export default function QuotesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const useAlert = useAlertMsg()
  const [quotesPageFirstVisitModalVisible, setQuotesPageFirstVisitModalVisible] = useState(localStorage.getItem("hadVisitedQuotesPageBefore"))
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [quotesQtd, setQuotesQtd] = useState(0)
  const [loading, setLoading] = useState(true)
  const quoteService = new quoteEditingServices()
  const userService = new userServices()

  async function getQuotes(queryObj) {
    console.log(queryObj)
    const { quotes, message, quotesQtd } = await quoteService.getQuotes(queryObj)
    console.log(quotes)
    console.log(quotesQtd)
    return { quotes, message, quotesQtd }
  }

  useEffect(() => {
    const currentSingleQuotesArray = []
    const currentMultipleQuotesArray = []
    // FORMATAÇÃO PRÉ DIVISÃO DE TIPOS DE QUOTE:
    if (quotesResponse) {
      if (Array.isArray(quotesResponse)) {
        quotesResponse.forEach((data) => {
          if (data.quotes.length === 1) {
            currentSingleQuotesArray.push(data)
          }
          else if (data.quotes.length > 1) {
            currentMultipleQuotesArray.push(data)
          }
        })
        setSingleQuotesArray(currentSingleQuotesArray)
        setMultipleQuotesArray(currentMultipleQuotesArray)
      }
    }
    console.log(quotesResponse)
  }, [quotesResponse])

  return (
    <>
      {!quotesPageFirstVisitModalVisible && (<QuotesPageFirstVisitModal />)}

      <SearchBar loading={loading} setLoading={setLoading} getQuotes={getQuotes} setQuotesResponse={setQuotesResponse} quotesQtd={quotesQtd} setQuotesQtd={setQuotesQtd} />
      <Row className="justify-content-center">
        <Col xs={12} sm={9} md={7} lg={6} xl={5} >
          {
            loading ? (
              <>
                <QuoteLoading count={5} />
              </>
            ) : (
              quotesResponse?.length > 0 && (
              <>
                <SingleQuote singleQuotes={singleQuotesArray} />
                <MultipleQuote multipleQuotes={multipleQuotesArray} />
              </>
              ) || 
              <>
              <h3>Nenhuma quote encontrada</h3>
              </>
            )
          }
        </Col>
      </Row>
      <PageSelector searchParams={searchParams} quotesQtd={quotesQtd} />
    </>
  )
}

// {quotesResponse.length < 1 && (
//   <>
//     <h2>Nenhuma quote encontrada</h2>
//   </>
// )}