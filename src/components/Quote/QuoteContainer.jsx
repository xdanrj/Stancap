import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import quoteServices from "../../services/quoteServices";
import "./QuoteContainer.css"

const quoteService = new quoteServices()

async function QuoteContainer() {
    const quotes = await quoteService.getAllQuotes()
    const [data, setData] = useState([])

    useEffect(async () => {
        
        setData(quotes)
        
    }, [])
   
    return (
        <>
        <h1>titulo estatico aqui</h1>
        {data.map(quote => <p key={quote._id}>{quote._id}</p>)}
        </>
    )
}
export default QuoteContainer


 /*
    <Card className="bg-secondary" key={quotes.id}>
            <Card.Text>QuoteID: {quotes.id}</Card.Text>
            <Card.Text>QuoteTexto: {quotes.quotes}</Card.Text>
        </Card>
    */