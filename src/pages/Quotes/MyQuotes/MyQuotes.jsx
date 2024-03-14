import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAuthor, MdbIcon } from "./MyQuotesStyles";
import { Col, Row, Button } from "react-bootstrap";
import quoteEditingServices from "../../../services/quoteServices"
import { useNavigate } from "react-router-dom";
import QuoteInfo from "../../../components/Quote/QuoteInfo/QuoteInfo";
import { useAlertMsg } from "../../../components/Alert/AlertContext"
import { MyQuotesDiv } from "./MyQuotesStyles";
const quoteService = new quoteEditingServices()

export default function MyQuotes() {
    const useAlert = useAlertMsg()
    const navigate = useNavigate()
    const [quotesResponse, setQuotesResponse] = useState([])
    const [quotesResponseArray, setQuotesResponseArray] = useState([])
    const [userId, setUserId] = useState([localStorage.getItem("userId")])
    const [deletedQuotes, setDeletedQuotes] = useState([])

    useEffect(() => {
        setDeletedQuotes([])
        //TODO: rever funcao de editquote
        async function fetchQuotes() {
            let query = { "uploadByUser": userId }
            const response = await quoteService.getQuotes(query)
            setQuotesResponse(response)
            setQuotesResponseArray(response)
        }
        fetchQuotes()
    }, [])

    const handleEditQuote = async (quoteId, quoteType) => {
        try {
            navigate(`/edit_quote/${quoteType}/${quoteId}`)
        } catch (error) {
            useAlert(error)
        }
    }

    const handleDeleteQuote = async (quoteId) => {
        try {
            console.log(quoteId)
            console.log(userId[0])
            const response = await quoteService.deleteQuote(quoteId, userId[0])
            console.log(response)
            if (response) {
                setDeletedQuotes(deletedQuotes => [...deletedQuotes, response])
                useAlert("Quote excluída com sucesso", 1000)
            } else {
                useAlert("Erro ao tentar excluir quote")
            }
        } catch (error) {
            useAlert(error)
            console.log(error)
        }
    }
    const handleUndoDeleteQuote = async (quoteId) => {
        try {
            const recoveredQuote = deletedQuotes.find((obj) => obj._id === quoteId)
            console.log(recoveredQuote)
            if (recoveredQuote) {
                await quoteService.addQuote(recoveredQuote)
                setDeletedQuotes(deletedQuotes.filter(item => item._id !== quoteId))
                useAlert("Exclusão desfeita")
            }
        } catch (error) {

        }
    }
    console.log(quotesResponseArray)

    return (
        <>
        <MyQuotesDiv>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5}>
                    {
                        quotesResponse.length > 0 ? (
                            quotesResponseArray.map((data) => (
                                <div key={data._id}>
                                    <MinimalQuoteContainer>
                                        <InternalContainer>
                                            <Paragraph>{data.quotes[0].quote && data.quotes[0].quote} </Paragraph>
                                            <ParagraphAuthor>—{data.quoteType == "single" ? data.author : data.quotes[0].author}</ParagraphAuthor>
                                            {deletedQuotes.find((obj) => obj._id === data._id) ?
                                                <>                                                  
                                                    <MdbIcon className="col-3"  fas icon="undo-alt" onClick={() => handleUndoDeleteQuote(data._id)}/>                                                    
                                                </>
                                                :
                                                <>
                                                    <MdbIcon icon="info-circle" />
                                                    <MdbIcon icon="trash-alt" onClick={() => handleDeleteQuote(data._id)} />
                                                    <MdbIcon icon="pencil-alt" onClick={() => handleEditQuote(data._id, data.quoteType)} />

                                                </>
                                            }
                                        </InternalContainer>
                                    </MinimalQuoteContainer>
                                </div>
                            ))
                        ) : (
                            <h4>Você ainda não criou nenhuma quote</h4>
                        )
                    }
                </Col>
            </Row >
            </MyQuotesDiv>
        </>
    )
}