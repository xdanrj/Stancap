import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import quoteEditingServices from "../../../services/quoteServices";
import SingleQuote from "../SingleQuote/SingleQuote";
import MultipleQuote from "../MultipleQuote/MultipleQuote";
import { size } from "../../../CommonStyles/device";
import { SearchBar } from "../../SearchBar/SearchBar";
import { useAlertMsg } from "../../Alert/AlertContext";
import { Col, Row, Container } from "react-bootstrap";
import userServices from "../../../services/userServices";
import { QuotesPageDiv } from "./QuotesPageStyles";
import { useModalBox } from "../../Modal/ModalContext";
import { QuotesPageFirstVisitModal } from "./QuotesPageFirstVisitModal/QuotesPageFirstVisitModal";
import PageSelector from "../../PageSelector/PageSelector";
import { useNavigate } from "react-router-dom";

export default function QuotesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const useAlert = useAlertMsg()
  const [quotesPageFirstVisitModalVisible, setQuotesPageFirstVisitModalVisible] = useState(localStorage.getItem("hadVisitedQuotesPageBefore"))
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])
  const [actualPage, setActualPage] = useState()
  const quoteService = new quoteEditingServices()
  const userService = new userServices()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get("page") === null) {
      searchParams.set("page", "1")
      navigate({search: searchParams.toString()})
      
    }
    let params = {}
    for (let param of searchParams) {
      params[param[0]] = param[1]
    }
    console.log(params)
    setActualPage(params?.page)   
  }, [])

  async function fetchAllQuotes() {
    const response = await quoteService.getQuotes()
    setQuotesResponse(response)
  }

  async function fetchQuotesBySearch(searchQuery) {
    console.log(searchQuery)
    console.log(searchQuery.query)
    const response = await quoteService.searchQuotes(searchQuery.query, actualPage)
    response ? setQuotesResponse(response) : useAlert(` ${searchQuery.label} não encontrado.`, 1000)
    setQuotesResponse(response)
  }

  useEffect(() => {
    const currentSingleQuotesArray = []
    const currentMultipleQuotesArray = []

    // TRATAMENTOS/ FORMATAÇÃO PRÉ DIVISÃO DE TIPOS DE QUOTE:
    if (quotesResponse) {
      const setUploadersNames = async () => {
        quotesResponse.map(async (data) => {
          data.uploadByUser = await userService.getUsername(data.uploadByUser)
        })
      }
      setUploadersNames()

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
  }, [quotesResponse])

  /* function getCurrentScreenSize() {
     const screenWidth = window.innerWidth;
     if (screenWidth >= parseInt(size.desktop)) {
       return "desktop";
     } else if (screenWidth >= parseInt(size.laptopL)) {
       return "laptopL";
     } else if (screenWidth >= parseInt(size.laptop)) {
       return "laptop";
     } else if (screenWidth >= parseInt(size.tablet)) {
       return "tablet";
     } else if (screenWidth >= parseInt(size.mobileL)) {
       return "mobileL";
     } else if (screenWidth >= parseInt(size.mobileM)) {
       return "mobileM";
     } else {
       return "mobileS";
     }
   }
   const currentSize = getCurrentScreenSize()
   log("Tamanho atual da tela:", currentSize)
 */
  return (
    <>

      {!quotesPageFirstVisitModalVisible && (<QuotesPageFirstVisitModal />)}

      <QuotesPageDiv>
        <SearchBar fetchQuotesBySearch={fetchQuotesBySearch} fetchAllQuotes={fetchAllQuotes} actualPage={actualPage} setActualPage={setActualPage}/>

        <Row className="justify-content-center">
          <Col xs={12} sm={9} md={7} lg={6} xl={5} >
            <SingleQuote singleQuotes={singleQuotesArray} />
            <MultipleQuote multipleQuotes={multipleQuotesArray} />
          </Col>
        </Row>
      </QuotesPageDiv>
      <PageSelector /*page={actualPage}*/ />
    </>
  )
}