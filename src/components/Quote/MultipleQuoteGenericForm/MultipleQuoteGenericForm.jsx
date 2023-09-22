import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import MultipleQuoteInputs from "./MultipleQuoteInputs";
import dayjs from "dayjs";

import quoteEditingServices from "../../../services/quoteServices"
import MultipleQuoteValidations from "./Validations";

const quoteEditingService = new quoteEditingServices()

export default function MultipleQuoteGenericForm(props) {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    const [quotes, setQuotes] = useState([])
    const [multipleQuotes, setMultipleQuotes] = useState([])
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
                console.log(response.quotes[0].quote)
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
                    quotes: multipleQuotes,
                    tags: tags,
                    uploadDate: dayjs().format(),
                    uploadByUser: localStorage.getItem("username")
                }
                response = await quoteEditingService.addQuote(updatedQuoteData)
            } else if (props.type === "editQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    quotes: multipleQuotes,
                    tags: tags
                }
                const response = await quoteEditingService.editQuote(props.quoteIdToEdit, updatedQuoteData)
            }
            
            if (response === true) {
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
        if (name === "quotes") {
            setQuotes((prevQuoteData) => ({
                ...prevQuoteData,
                ["quote"]: value
            }))
        }
        setQuoteData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleMultipleQuoteChange = (e, index) => {
        const validation = new MultipleQuoteValidations(e.target)
        console.log(validation.showEventTarget())
        const { name, value } = e.target
        const updatedMultipleQuotes = [...multipleQuotes]
        if (!updatedMultipleQuotes[index]) {
            updatedMultipleQuotes[index] = {}
        }

        updatedMultipleQuotes[index] = {
            ...updatedMultipleQuotes[index],
            [name]: value
        }
        setMultipleQuotes(updatedMultipleQuotes);
        console.log(index)
        console.log(multipleQuotes)
    }

    return (
        <>
            <Form onSubmit={handleSubmitQuote}>
                <MultipleQuoteInputs onChange={handleMultipleQuoteChange} quoteValue={multipleQuotes.quote} authorValue={multipleQuotes.author} />
                <Row>
                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Data">
                                <CenteredFormControl name="date" placeholder="Data" onChange={handleGenericChange} value={quoteData.date}>
                                </CenteredFormControl>
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