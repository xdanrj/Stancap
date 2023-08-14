import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import dotenv from "dotenv"

import "./QuoteContainer.css"

import { SourceLogo, QuoteContainerBody } from "./QuoteStyles";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit"

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
                            <MDBContainer className="py-5 h-100 position-relative text-center" key={data._id}>
                                <MDBRow className="justify-content-center align-items-center h-100">
                                    <MDBCol md="9" lg="7" xl="5">
                                        <MDBCard className="bg-dark text-white">
                                            <SourceLogo src="../src/images/Stancap.png" />
                                            <MDBCardBody>
                                                <MDBTypography
                                                    blockquote
                                                    className="blockquote-custom pt-4 rounded-5 fs-6">
                                                    <p className="mb-0 mt-2 font-italic">
                                                        {data.quotes[0].quote}
                                                    </p>
                                                    <footer className="blockquote-footer pt-4 mt-4 border-top text-white">
                                                        {data.author} {data.date}
                                                    </footer>
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
                                                        <p className="mb-0 mt-2 font-italic" >
                                                            {quote.quote}
                                                        </p>
                                                        <footer className="blockquote-footer pt-4 mt-4 border-top text-white">
                                                            {quote.author}
                                                        </footer>
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
