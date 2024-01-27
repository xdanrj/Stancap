import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import quoteEditingServices from "../../services/quoteServices";
import SingleQuote from "./SingleQuote/SingleQuote";
import MultipleQuote from "./MultipleQuote/MultipleQuote";
import { size } from "../../CommonStyles/device";
import { SearchBar } from "../SearchBar/SearchBar";
import { useAlertMsg } from "../Alert/AlertContext";
import { Col, Row, Container } from "react-bootstrap";

export default function QuotesPage() {
  const useAlert = useAlertMsg()
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])
  const quoteService = new quoteEditingServices()
  const { queryprop, queryvalue } = useParams()
  let urlQuery

  if (queryprop && queryvalue) {
    urlQuery = { [queryprop]: queryvalue }
  }

  async function fetchAllQuotes() {
    const response = await quoteService.getAllQuotes()
    setQuotesResponse(response)
  }

  async function fetchQuotesBySearch(searchQuery) {
    const response = await quoteService.getQuote(searchQuery["query"])
    response ? setQuotesResponse(response) : useAlert(` ${searchQuery.label} não encontrado.`)
    setQuotesResponse(response)
    console.log(searchQuery)
  }

  useEffect(() => {
    fetchAllQuotes()
  }, [])
  useEffect(() => {
    const currentSingleQuotesArray = []
    const currentMultipleQuotesArray = []

    // TRATAMENTOS/ FORMATAÇÃO PRÉ DIVISÃO DE TIPOS DE QUOTE:

  const setUploadersNames = async () => {
    quotesResponse.map(async (data) => {
      data.uploadByUser = await quoteService.getUploaderUsername(data.uploadByUser)
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

  }, [quotesResponse])

  /*
    function getCurrentScreenSize() {
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
      <SearchBar searchFunction={fetchQuotesBySearch} urlQuery={urlQuery} />

      <Row className="justify-content-center">
        <Col md={7} lg={6} xl={5} >
          <SingleQuote singleQuotes={singleQuotesArray} />
          <MultipleQuote multipleQuotes={multipleQuotesArray} />
        </Col>
      </Row>
    </>
  )
}