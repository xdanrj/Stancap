import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup } from "../../../CommonStyles/CommonStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import dayjs from "dayjs";

import quoteEditingServices from "../../../services/quoteServices"

const quoteEditingService = new quoteEditingServices()

export default function GenericQuoteForm(props) {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    const [quotes, setQuotes] = useState([])
    const [tags, setTags] = useState([])
    const [quoteData, setQuoteData] = useState({
        quotes: [],
        author: '',
        date: '',
        source: '',
        context: '',
        tags: [],
    })

    useEffect(() => {

        async function getQuoteToEdit() {
            if (props.quoteIdToEdit) {
                console.log("entrou na condicao certa")
                const apiResponse = await quoteEditingService.getQuote(props.quoteIdToEdit)
                const response = await apiResponse.data.response.response[0]
                console.log(response)
                setQuoteData((prevData) => ({
                    ...prevData,
                    quotes: response.quotes[0].quote,
                    author: response.author,
                    date: response.date,
                    source: response.source,
                    context: response.context,
                    tags: response.tags
                }))
            }
        }

        getQuoteToEdit()

    }, [])

    const handleSubmitQuote = async (e) => {
        e.preventDefault();
        let response
        try {
            if (props.type === "addQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    quotes: quotes,
                    tags: tags,
                    uploadDate: dayjs().format(),
                    uploadByUser: localStorage.getItem("username")
                }
                response = await quoteEditingService.addQuote(updatedQuoteData)
            } else if (props.type === "editQuote") {
                console.log(props.type)
                const response = await quoteEditingService.editQuote(props.quoteIdToEdit, quoteData)
            }

            if (response === true) {
                console.log(props.texts.submitSuccess)
                alert(props.texts.submitSuccess)
            } else {
                alert(response)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleGenericChange = (e) => {
        const { name, value } = e.target

        setQuoteData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSingleQuoteChange = (e) => {
        const newQuote = { quote: e.target.value }
        setQuotes({ ...quotes, newQuote })
    }

    return (
        <>
            <Form onSubmit={handleSubmitQuote}>
                <Row>
                    <FormGroup>
                        <FloatingLabel label="Quote">
                            <Form.Control name="quotes" placeholder="Quote" onChange={handleSingleQuoteChange} value={quoteData.quotes}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroup>

                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Autor">
                                <Form.Control name="author" placeholder="Autor" onChange={handleGenericChange} value={quoteData.author}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Data">
                                <Form.Control name="date" placeholder="Data" onChange={handleGenericChange} value={quoteData.date}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Source">
                                <Form.Control name="source" placeholder="Source" onChange={handleGenericChange} value={quoteData.source}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Contexto (Opcional)">
                                <Form.Control name="context" placeholder="Contexto (Opcional)" onChange={handleGenericChange} value={quoteData.context}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                    <FormGroup>
                        <TagSelectorComponent tags={quoteData.tags} setTags={setTags} />
                    </FormGroup>
                </Row>

                <Button type="submit">{props.texts.submitButton}</Button>
            </Form>
        </>
    )
}