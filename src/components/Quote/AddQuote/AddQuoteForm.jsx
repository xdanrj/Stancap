import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup } from "./AddQuoteFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import dayjs from "dayjs";

import quoteEditingServices from "../../../services/quoteServices"
import { IpAccessControlListMappingListInstance } from "twilio/lib/rest/api/v2010/account/sip/domain/ipAccessControlListMapping";

const quoteEditingService = new quoteEditingServices()

function AddQuoteForm() {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas

    const [quotes, setQuotes] = useState([])
    const [author, setAuthor] = useState()
    const [date, setDate] = useState()
    const [source, setSource] = useState()
    const [context, setContext] = useState()
    const [tags, setTags] = useState([])
    const [quoteData, setQuoteData] = useState({})

    const handleSubmitQuote = async (e) => {
        e.preventDefault();
        try {
            console.log(quotes)

            const updatedQuoteData = {...quoteData,
                quotes: quotes,
                tags: tags,
                uploadDate: dayjs().format(),
                uploadByUser: localStorage.getItem("username")
            }

            const response = await quoteEditingService.addQuote(updatedQuoteData)
            console.log(updatedQuoteData)
            if (response === true) {
                alert('Quote criada com sucesso')
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
        const newQuote = {quote: e.target.value}
        setQuotes({ ...quotes, ...newQuote })
    }

    return (
        <>
            <Form onSubmit={handleSubmitQuote}>
                <Row>
                    <FormGroup>
                        <FloatingLabel label="Quote">
                            <Form.Control name="quotes" placeholder="Quote" onChange={handleSingleQuoteChange}>
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

            </Form>

        </>
    )
}

export default AddQuoteForm