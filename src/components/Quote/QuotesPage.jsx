import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import quoteEditingServices from "../../services/quoteServices";
import SingleQuote from "./SingleQuote/SingleQuote";
import MultipleQuote from "./MultipleQuote/MultipleQuote";
import { size } from "../../CommonStyles/device";
import { SearchBar } from "../SearchBar/SearchBar";
import { useAlertMsg } from "../Alert/AlertContext";

export default function QuotesPage() {
  const useAlert = useAlertMsg()
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])
  const quoteService = new quoteEditingServices()
  const {queryprop, queryvalue} = useParams()
  const urlQuery = {[queryprop]: queryvalue}
  console.log(urlQuery)

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
  console.log("Tamanho atual da tela:", currentSize)

  return (
    <>
      <SearchBar searchFunction={fetchQuotesBySearch} urlQuery={urlQuery}/>

      <SingleQuote singleQuotes={singleQuotesArray} />
      <MultipleQuote multipleQuotes={multipleQuotesArray} />
    </>
  )
}