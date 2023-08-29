import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup } from "./AddQuoteFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";

import quoteEditingServices from "../../../services/quoteServices"

const quoteEditingService = new quoteEditingServices()

function AddQuoteForm() {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    const [quoteData, setQuoteData] = useState({
        quotes: [],
        autor: "",
        date: "",
        source: "",
        tags: []
    })
    const [quotes, setQuotes] = useState()
    const [autor, setAutor] = useState()
    const [date, setDate] = useState()
    const [source, setSource] = useState()
    
    

    const handleAddQuote = async (e) => {
        e.preventDefault();
        /*try {
            const response = await quoteEditingService.addQuote(quoteData)
        } catch (error) {
            alert(error)
        }*/
        console.log("tags logo abaixo: ")
        console.log(tags)
    }

    const handleGenericChange = (e) => {
        const { name, value } = e.target
        setQuoteData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleQuoteChange = (e) => {
        setQuotes( { ...quotes, [e.target.name]: e.target.value } )
    }


    return (
        <>
            <Form onSubmit={handleAddQuote}>
                <Row>
                    <FormGroup>
                        <FloatingLabel label="Quote">
                            <Form.Control name="quote" placeholder="Quote" onChange={handleQuoteChange}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroup>

                    <Col>
                        <FormGroup>
                            <FloatingLabel label="Autor">
                                <Form.Control name="autor" placeholder="Autor" onChange={handleGenericChange}>
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
                    <TagSelectorComponent />
                    </FormGroup>

                </Row>
                <Button type="submit">Criar quote</Button>
            </Form>
        
        </>
    )
}

export default AddQuoteForm