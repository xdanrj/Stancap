import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { AddIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";

export default function MultipleQuoteInputs(props) {
    const [qtdQuotes, setQtdQuotes] = useState(1)

    const addMoreQuote = () => {
        setQtdQuotes(qtdQuotes + 1)
        console.log(qtdQuotes)
    }

    return (
        <>
        {Array.from({length: qtdQuotes}, (_, index) => (
            <div key={index}>
            <Row>
                <Col>
                    <FormGroupMultipleQuote>
                        <FloatingLabel label="Quote">
                            <Form.Control name="quote" placeholder="Quote" onChange={props.onChange} value={props.quoteValue}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroupMultipleQuote>
                </Col>
                <Col>
                    <FormGroupMultipleQuote>
                        <FloatingLabel label="QuoteAutor">
                            <Form.Control name="quoteautor" placeholder="QuoteAutor" onChange={props.onChange} value={props.authorValue}>
                            </Form.Control>
                        </FloatingLabel>
                    </FormGroupMultipleQuote>
                </Col>
            </Row>
            <AddIcon icon="plus-circle" onClick={() => addMoreQuote()}/>
            </div>
           
        ))}
        </>
    )
}