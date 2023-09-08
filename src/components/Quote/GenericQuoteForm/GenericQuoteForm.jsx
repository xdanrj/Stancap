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

export default function AddQuoteForm() {
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

    const handleSubmitQuote = async (e) => {
        e.preventDefault();
        try {
            const updatedQuoteData = {
                ...quoteData,
                quotes: quotes,
                tags: tags,
                uploadDate: dayjs().format(),
                uploadByUser: localStorage.getItem("username")
            }
            const response = await quoteEditingService.addQuote(updatedQuoteData)
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
        const newQuote = { quote: e.target.value }
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
                                <Form.Control name="author" placeholder="Autor" onChange={handleGenericChange} value={quoteData.author}>
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
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Source">
                                <Form.Control name="source" placeholder="Source" onChange={handleGenericChange}>
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Contexto (Opcional)">
                                <Form.Control name="context" placeholder="Contexto (Opcional)" onChange={handleGenericChange}> 
                                </Form.Control>
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                    <FormGroup>
                        <TagSelectorComponent tags={tags} setTags={setTags} />
                    </FormGroup>
                </Row>

                <Button type="submit">Criar quote</Button>
            </Form>
        </>
    )
}