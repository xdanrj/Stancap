import React from "react"

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import "./QuoteContainer.css"

const quoteService = new quoteServices()


async function QuoteContainer() {
    const serviceResponse = await quoteService.getAllQuotes()
    const quotes = serviceResponse.data.response
    console.log(quotes)
    console.log("tipo de quotes", typeof(quotes))
    return (
        <>
        {quotes.map(quote => (
        <Card className="bg-secondary" key={quote.id}>
            <Card.Text>QuoteID: {quote.id}</Card.Text>
            <Card.Text>QuoteTexto: {quote.quotes}</Card.Text>

        </Card>
        ))}
        </>
    )
}

export default QuoteContainer