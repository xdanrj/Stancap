import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { MdbIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";



export default function MultipleQuoteInputs(props) {
    const [qtdQuotes, setQtdQuotes] = useState(1)
    const [iconVisible, setIconVisible] = useState([{ 0: true }])

    const addQuoteInput = (index) => {
        setQtdQuotes(qtdQuotes + 1)

        const updatedIconVisible = [...iconVisible]

        const newIndex = iconVisible.length
        const newObject = { [newIndex]: true }

        updatedIconVisible[index] = !updatedIconVisible[index]

        updatedIconVisible.push(newObject)

        setIconVisible(updatedIconVisible)
        //console.log(qtdQuotes)
        console.log(updatedIconVisible)
        //console.log(iconVisible)
    }
    const removeQuoteInput = (index) => {

        setQtdQuotes(qtdQuotes - 1)

        const updatedIconVisible = [...iconVisible]

        updatedIconVisible[index - 1] = !updatedIconVisible[index - 1]

        setIconVisible(updatedIconVisible)

        //console.log(qtdQuotes)
        console.log(updatedIconVisible)
    }

    return (
        <>
            {
                Array.from({ length: qtdQuotes }, (_, index) => (
                    <div key={index}>
                        <Row>
                            <Col>
                                <FormGroupMultipleQuote>
                                    <FloatingLabel label="Quote">

                                        <Form.Control index={index} name="quote" placeholder="Quote" value={props.quoteValue}
                                            onChange={(e) =>
                                                props.onChange(e, index)
                                                
                                            }
                                        >
                                        </Form.Control>
                                    </FloatingLabel>
                                </FormGroupMultipleQuote>
                            </Col>
                            <Col>
                                <FormGroupMultipleQuote>
                                    <FloatingLabel label="Autor">
                                        <Form.Control name="author" placeholder="Autor" value={props.authorValue}
                                            onChange={(e) =>
                                                props.onChange(e, index)}
                                        >
                                        </Form.Control>
                                    </FloatingLabel>
                                </FormGroupMultipleQuote>
                            </Col>
                        </Row>

                        {
                            iconVisible[index] ? (
                                <MdbIcon icon="plus-circle" onClick={() => addQuoteInput(index)} />
                            ) : (<></>)
                        }
                        {
                            index !== 0 && iconVisible[index] ? (
                                <MdbIcon icon="trash-alt" onClick={() => { removeQuoteInput(index) }} />
                            ) : (<></>)
                        }
                    </div>
                ))}
        </>
    )
}

// <Icon icon="trash-alt" onClick={() => removeQuote()} />