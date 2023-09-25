import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { MdbIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import AlertComponent from "../../Alert/AlertComponent";
import MultipleQuoteValidations from "./Validations";
const validation = new MultipleQuoteValidations()

export default function MultipleQuoteInputs(props) {
    const [qtdQuotes, setQtdQuotes] = useState(1)
    const [iconVisible, setIconVisible] = useState([{ 0: true }])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertTextState, setAlertTextState] = useState("")

    const sendAlert = (alertText) => {
        setAlertVisible(!alertVisible)
        setAlertTextState(alertText)
    }

    const addQuoteInput = (index) => {
        //console.log(props.multipleQuotesValue[index].quote)
        const isInputsEmpty = validation.isEmpty(props.multipleQuotesValue[index])
        if (isInputsEmpty) {
            sendAlert("Um ou mais campos vazios!")
        } else {
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
    }
    const removeQuoteInput = (index) => {

        //setQtdQuotes(qtdQuotes - 1)
        const qtdQuotesCopy = [...qtdQuotes]
        const updatedQtdQuotes = qtdQuotesCopy.splice(index, 1)
        setQtdQuotes(updatedQtdQuotes)

        const updatedIconVisible = [...iconVisible]

        updatedIconVisible[index - 1] = !updatedIconVisible[index - 1]

        setIconVisible(updatedIconVisible)

        props.multipleQuotesValue.splice(index, 1)
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
                            index !== 0 ? (
                                <MdbIcon icon="trash-alt" onClick={() => { removeQuoteInput(index) }} />
                            ) : (<></>)
                        }
                        {
                            alertVisible && (
                                <AlertComponent text={alertTextState} />)
                        }
                    </div>
                ))}
        </>
    )
}
