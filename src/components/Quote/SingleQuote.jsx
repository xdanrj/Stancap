import React, { useEffect, useState } from "react"
import quoteServices from "../../services/quoteServices";
import dayjs from "dayjs";
import { SourceLogo, QuoteContainerBody } from "./QuoteStyles";
import { MDBCardBody, MDBCol } from "mdb-react-ui-kit"
import { MDBContainer, MDBRow, MDBTypography, Paragraph, Footer, MDBCard, SecondaryParagraph } from "./QuoteStyles";

const quoteService = new quoteServices()
export default function SingleQuote() {
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
                    </MDBContainer >
                )
            })}
        </div>
    )
}