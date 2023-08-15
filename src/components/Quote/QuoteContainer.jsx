import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import dotenv from "dotenv"

import "./QuoteContainer.css"

import { SourceLogo, QuoteContainerBody } from "./QuoteStyles";
import { MDBCardBody, MDBCol } from "mdb-react-ui-kit"
import { MDBContainer, MDBRow, MDBTypography, Paragraph, Footer, MDBCard, SecondaryParagraph } from "./QuoteStyles";
import GlobalStyles from "../../GlobalStyles/GlobalStyles";

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
            <GlobalStyles />
            <QuoteContainerBody>
                {quotesResponse.map((data) => {
                    data.date = dayjs().format("DD/MM/YYYY")
                    console.log("data.quotes.length: ", data.quotes.length)
                    if (data.quotes.length === 1) {
                        return (
                            <MDBContainer key={data._id}>
                                <MDBRow>
                                    <MDBCol md="9" lg="7" xl="5">
                                        <MDBCard>
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
                        return (
                            <MDBContainer key={data._id}>
                                <MDBRow>
                                    <MDBCol md="9" lg="7" xl="5">
                                        <MDBCard className="bg-dark text-white">
                                            <SourceLogo src="../src/images/Stancap.png" />
                                            <MDBCardBody>
                                                {data.quotes.map((quote, index) => (
                                                    <MDBTypography
                                                        blockquote
                                                        className="blockquote-custom pt-4 rounded-5 fs-6" key={index}>
                                                        <SecondaryParagraph>
                                                            {quote.quote}
                                                        </SecondaryParagraph>
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
