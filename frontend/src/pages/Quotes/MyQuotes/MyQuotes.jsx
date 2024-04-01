import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MinimalQuoteContainer, InternalContainer, Paragraph, ParagraphAuthor, MdbIcon } from "./MyQuotesStyles";
import { Col, Row, Button } from "react-bootstrap";
import quoteEditingServices from "../../../services/quoteServices"
import { useNavigate } from "react-router-dom";
import QuoteInfo from "../../../components/Quote/QuoteInfo/QuoteInfo";
import { useAlertMsg } from "../../../components/Alert/AlertContext"
import { MyQuotesDiv } from "./MyQuotesStyles";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import PageSelector from "../../../components/PageSelector/PageSelector";
const quoteService = new quoteEditingServices()

export default function MyQuotes() {
    const useAlert = useAlertMsg()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [quotesResponse, setQuotesResponse] = useState([])
    const [userId, setUserId] = useState([localStorage.getItem("userId")][0])
    const [deletedQuotes, setDeletedQuotes] = useState([])
    const [quotesQtd, setQuotesQtd] = useState(0)
    const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })

    useEffect(() => {
        Object.fromEntries(searchParams)
        if (!searchParams.has("page")) {
            searchParams.set("page", "1")
            navigate({ search: searchParams.toString() })
        }
        fetchQuotesBySearch()
    }, [location.search])

    async function fetchQuotesBySearch() {
        const searchParamsQuery = Object.fromEntries(searchParams)
        const queryWithUserId = { ...searchParamsQuery, "uploadByUser": userId }
        const response = await quoteService.searchQuotes(queryWithUserId)
        setQuotesQtd(response.quotesQtd)
        response.foundQuote ? setQuotesResponse(response.foundQuote) : useAlert(response.message, 1000)
    }

    const handleEditQuote = async (quoteId, quoteType) => {
        try {
            searchParams.set("type", quoteType)
            searchParams.set("_id", quoteId)
            console.log(searchParams.toString())
            navigate({ pathname: "/edit_quote", search: searchParams.toString() })
        } catch (error) {
            useAlert(error)
        }
    }

    const handleDeleteQuote = async (quoteId) => {
        try {
            console.log("quoteId: ", quoteId)
            console.log("userId: ", userId)
            const response = await quoteService.deleteQuote(quoteId, userId)
            console.log(response)
            if (response) {
                setDeletedQuotes(deletedQuotes => [...deletedQuotes, response])
                useAlert("Quote excluída com sucesso", 500)
            } else {
                useAlert("Erro ao tentar excluir quote", 1000)
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
                useAlert("Exclusão desfeita", 500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <MyQuotesDiv>
                <Row className="justify-content-center">
                    <SearchBar searchParams={searchParams} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Col xs={12} sm={8} md={6} lg={5}>
                        {
                            quotesResponse.length > 0 ? (
                                quotesResponse.map((data) => (
                                    <div key={data._id}>
                                        <MinimalQuoteContainer>
                                            <InternalContainer>
                                                <Paragraph>{data.quotes[0].quote && data.quotes[0].quote} </Paragraph>
                                                <ParagraphAuthor>—{data.quoteType === "single" ? data.author : data.quotes[0].author}</ParagraphAuthor>
                                                {deletedQuotes.find((obj) => obj._id === data._id) ?
                                                    <>
                                                        <MdbIcon className="col-3" fas icon="undo-alt" onClick={() => handleUndoDeleteQuote(data._id)} />
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
                        <PageSelector searchParams={searchParams} quotesQtd={quotesQtd} setQuotesQtd={setQuotesQtd} />
                    </Col>
                </Row >
            </MyQuotesDiv>
        </>
    )
}