import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import dotenv from "dotenv"

import "./QuoteContainer.css"

import { SourceLogo, QuoteContainerBody } from "./QuoteStyles";
import { MDBCard, MDBCardBody, MDBCol } from "mdb-react-ui-kit"
import { MDBContainer, MDBRow, MDBTypography, Paragraph, Footer } from "./QuoteStyles";

const quoteService = new quoteServices()

function QuoteContainer() {
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
            <QuoteContainerBody>
                {quotesResponse.map((data) => {
                    data.date = dayjs().format("DD/MM/YYYY")
                    console.log("data.quotes.length: ", data.quotes.length)
                    if (data.quotes.length === 1) {
                        return (
                            <MDBContainer fluid="true" key={data._id}>
                                <MDBRow>
                                    <MDBCol md="9" lg="7" xl="5">
                                        <MDBCard className="bg-dark text-white">
                                            <SourceLogo src="../src/images/Stancap.png" />
                                            <MDBCardBody>
                                                <MDBTypography blockquote>
                                                    <Paragraph>
                                                        {data.quotes[0].quote}
                                                    </Paragraph>
                                                    <Footer>
                                                        {data.author} {data.date}
                                                    </Footer>
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        )
                    }
                    else if (data.quotes.length > 1) {
                        console.log("data.quotes logo abaixo: ")
                        console.log(data.quotes)
                        return (
                            <MDBContainer className="py-5 h-100 position-relative text-center" key={data._id}>
                                <MDBRow className="justify-content-center align-items-center h-100">
                                    <MDBCol md="9" lg="7" xl="5">
                                        <MDBCard className="bg-dark text-white">
                                            <SourceLogo src="../src/images/Stancap.png" />
                                            <MDBCardBody>
                                                {data.quotes.map((quote, index) => (
                                                    <MDBTypography
                                                        blockquote
                                                        className="blockquote-custom pt-4 rounded-5 fs-6" key={index}>
                                                        <Paragraph >
                                                            {quote.quote}
                                                        </Paragraph>
                                                        <Footer>
                                                            {quote.author}
                                                        </Footer>
                                                    </MDBTypography>
                                                ))}
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        )
                    } else {
                        return (
                            <h1>Nenhuma quote encontrada</h1>
                        )
                    }
                })}
            </QuoteContainerBody>
        </div >
    )
}
export default QuoteContainer
