import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import SingleQuote from "./SingleQuote";
import MultipleQuote from "./MultipleQuote";
import GlobalStyles from "../../GlobalStyles/GlobalStyles";
import { size } from "../../GlobalStyles/device";

import { QuotesPageGeral } from "./QuoteStyles";
const quoteService = new quoteServices()

function QuotesPage() {
    const [quotesResponse, setQuotesResponse] = useState([])
    useEffect(() => {
        async function fetchQuotes() {
            const quoteService = new quoteServices()
            const response = await quoteService.getAllQuotes()
            setQuotesResponse(response)
        }
        fetchQuotes()

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
          const currentSize = getCurrentScreenSize();
          console.log("Tamanho atual da tela:", currentSize);
    }, [])

    return (
        <>
        
            <GlobalStyles />
            <QuotesPageGeral>
            <MultipleQuote/>
            </QuotesPageGeral>
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
