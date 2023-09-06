import React, { useEffect, useState } from "react"
import quoteEditingServices from "../../services/quoteServices";
import SingleQuote from "./SingleQuote/SingleQuote";
import MultipleQuote from "./MultipleQuote/MultipleQuote";
import { size } from "../../CommonStyles/device";

//const quoteService = new quoteEditingServices()

function QuotesPage() {
  const [quotesResponse, setQuotesResponse] = useState([])
  const [singleQuotesArray, setSingleQuotesArray] = useState([])
  const [multipleQuotesArray, setMultipleQuotesArray] = useState([])

  useEffect(() => {
    async function fetchQuotes() {
      const quoteService = new quoteEditingServices()
      const response = await quoteService.getAllQuotes()
      setQuotesResponse(response)
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    const currentSingleQuotesArray = []
    const currentMultipleQuotesArray = []
    quotesResponse.forEach((data) => {
      if (data.quotes.length === 1) {
        currentSingleQuotesArray.push(data)
      }
      else if (data.quotes.length > 1) {
        currentMultipleQuotesArray.push(data)
      }
    });
    setSingleQuotesArray(currentSingleQuotesArray)
    setMultipleQuotesArray(currentMultipleQuotesArray)
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
  };
  const currentSize = getCurrentScreenSize();
  console.log("Tamanho atual da tela:", currentSize);
  // atencao: qnd terminar de corrigir o codigo, so taca o single e o multiple components no return()
  return (
    <>
      <SingleQuote singleQuotes={singleQuotesArray}/>
      <MultipleQuote multipleQuotes={multipleQuotesArray} />
    </>
  )
}

export default QuotesPage


/*
  {quotesResponse.map((data, index) => {
                if (data.quotes.length === 1) {
                    return (
                        <SingleQuote key={index}/>
                    )
                }
                else if (data.quotes.length > 1) {
                    return (
                        <MultipleQuote key={index}/>
                    )
                } else {
                    return (
                        <h1>Nenhuma quote encontrada</h1>
                    )
                }
            })}

*/
