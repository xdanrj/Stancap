import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup } from "./AddQuoteFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import dayjs from "dayjs";

import quoteEditingServices from "../../../services/quoteServices"

const quoteEditingService = new quoteEditingServices()

function AddQuoteForm() {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    const [quoteData, setQuoteData] = useState({
        quotes: [],
        tags: [],
        author: "",
        context: "",
        source: "",
        date: "",
        uploadDate: "",
        uploadByUser: ""
    })
    const [quotes, setQuotes] = useState()
    const [author, setAuthor] = useState()
    const [date, setDate] = useState()
    const [source, setSource] = useState()
    const [context, setContext] = useState()
    const [tags, setTags] = useState([])

    const handleSubmitQuote = async (e) => {
        e.preventDefault();
        try {

            const response = await quoteEditingService.addQuote(readyQuoteData)
        } catch (error) {
            alert(error)
        }
    }

    const handleGenericChange = (e) => {
        const { name, value } = e.target

        setQuoteData((prevData) => {
            if (name === "quotes") {
                return {
                    ...prevData,
                    quotes: { quote: value }
                }
            } else {
                return {
                    ...prevData,
                    [name]: value
                }
            }
        })
    }

    const handleQuoteChange = (e) => {
        setQuotes({ ...quotes, [e.target.name]: e.target.value })
    }

    const getNowtime = () => {
        console.log(dayjs().format()) 
    }

    return (
        <>
            <Form onSubmit={handleSubmitQuote}>
                <Row>
                    <FormGroup>
                        <FloatingLabel label="Quote">
                            <Form.Control name="quotes" placeholder="Quote" onChange={handleGenericChange}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroup>

                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Autor">
                                <Form.Control name="author" placeholder="Autor" onChange={handleGenericChange}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Data">
                                <Form.Control name="date" placeholder="Data" onChange={handleGenericChange}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>

                    <FormGroup>
                        <FloatingLabel label="Source">
                            <Form.Control name="source" placeholder="Source" onChange={handleGenericChange}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroup>

                    <FormGroup>
                        <FloatingLabel label="Contexto (Opcional)">
                            <Form.Control name="context" placeholder="Contexto (Opcional)" onChange={handleGenericChange}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroup>

                    <FormGroup>
                        <TagSelectorComponent tags={tags} setTags={setTags} />
                    </FormGroup>

                </Row>
                <Button type="submit">Criar quote</Button>
                <Button type="button" onClick={getNowtime}>horas</Button>
            </Form>

        </>
    )
}

export default AddQuoteForm