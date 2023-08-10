import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import "./QuoteContainer.css"

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
    const [quotes, setQuotes] = useState([])
    useEffect(() => {
        async function fetchQuotes() {
            const quoteService = new quoteServices()
            const response = await quoteService.getAllQuotes()
            setQuotes(response)
        }
        fetchQuotes()
    }, [])
    
    console.log(quotes)
    return (
        <div>
            <p>debaixo daqui é funcao</p>
            {quotes.map((data) => {
                data.date = dayjs().format("DD/MM/YYYY")
                return (
                    <section className="vh-100" key={data._id}>
                        <MDBContainer className="py-5 h-100">
                            <MDBRow className="justify-content-center align-items-center h-100">
                                <MDBCol md="9" lg="7" xl="5">
                                    <MDBCard className="bg-dark text-white">
                                        <MDBCardBody>
                                            <MDBTypography
                                                blockquote
                                                className="blockquote-custom px-3 pt-4 rounded-5 bg-primary"
                                            >
                                                <div className="blockquote-custom-icon bg-info shadow-1-strong">
                                                    <MDBIcon fas icon="quote-left text-white" />
                                                </div>
                                                <p className="mb-0 mt-2 font-italic">
                                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna
                                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                                    ullamco laboris nisi ut aliquip ex ea commodo."
                                                </p>
                                                <footer className="blockquote-footer pt-4 mt-4 border-top">
                                                    {data.author} {data.date}

                                                </footer>
                                            </MDBTypography>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>
                )
            })}

        </div>
    )
}
export default QuoteContainer
