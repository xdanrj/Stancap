import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import { SourceLogo, QuoteContainerBody } from "./QuoteStyles";
import { MDBCardBody, MDBCol } from "mdb-react-ui-kit"
import { MDBContainer, MDBRow, MDBTypography, Paragraph, Footer, MDBCard, SecondaryParagraph } from "./QuoteStyles";


const quoteService = new quoteServices()

export default function MultipleQuote() {
    const [quotesResponse, setQuotesResponse] = useState([])
    useEffect(() => {
        async function fetchQuotes() {
            const quoteService = new quoteServices()
            const response = await quoteService.getAllQuotes()
            setQuotesResponse(response)
        }
        fetchQuotes()
    }, [])
    return (
        <div>
            {quotesResponse.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY")
                console.log("data.quotes.length: ", data.quotes.length)
                return (
                    < MDBContainer key={data._id} >
                        <MDBCard className="bg-dark text-white">
                            <SourceLogo src="../src/images/Stancap.png" />
                            <MDBCardBody>
                                {data.quotes.map((quote, index) => (
                                    <MDBTypography
                                        blockquote
                                        className="blockquote-custom pt-4 rounded-5 fs-6">
                                        <SecondaryParagraph key={index} isEven={index % 2 === 0}>
                                            {quote.quote}
                                        </SecondaryParagraph>
                                        {quote.author}
                                    </MDBTypography>
                                ))}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                )
            })}
        </div>
    )
}