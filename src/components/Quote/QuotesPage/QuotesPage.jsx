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
import { QuotesPageFirstVisitModalBox } from "./QuotesPageFirstVisitModalBox";

export default function QuotesPage() {
  const useAlert = useAlertMsg()
  const [quotesPageFirstVisitModalBoxVisible, setQuotesPageFirstVisitModalBoxVisible] = useState(localStorage.getItem("hadVisitedQuotesPageBefore"))
  console.log(quotesPageFirstVisitModalBoxVisible)
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])
  const [urlQuery, setUrlQuery] = useState({})
  const params = useParams()
  const quoteService = new quoteEditingServices()
  const userService = new userServices()
  const useModal = useModalBox()

  useEffect(() => {
    console.log(params)
    setUrlQuery(params)
  }, [params])


  async function fetchAllQuotes() {
    const response = await quoteService.getAllQuotes()
    setQuotesResponse(response)
  }

  async function fetchQuotesBySearch(searchQuery) {
    console.log(searchQuery)
    console.log(searchQuery.query)
    const response = await quoteService.getQuote(searchQuery.query)
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

      {!quotesPageFirstVisitModalBoxVisible && (<QuotesPageFirstVisitModalBox />)}

      <QuotesPageDiv>
        <SearchBar fetchQuotesBySearch={fetchQuotesBySearch} fetchAllQuotes={fetchAllQuotes} urlQuery={urlQuery} />

        <Row className="justify-content-center">
          <Col xs={12} sm={9} md={7} lg={6} xl={5} >
            <SingleQuote singleQuotes={singleQuotesArray} />
            <MultipleQuote multipleQuotes={multipleQuotesArray} />
          </Col>
        </Row>
      </QuotesPageDiv>
    </>
  )
}