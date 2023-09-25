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
    console.log(props.multipleQuotesValue)
    const [iconVisible, setIconVisible] = useState([{ 0: true }])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertTextState, setAlertTextState] = useState("")

    useEffect(() => {
        if (props.multipleQuotesValue.length === 0) {
            props.setMultipleQuotes([{ quote: "", author: "" }])
        }
    }, [])

    const sendAlert = (alertText) => {
        setAlertVisible(!alertVisible)
        setAlertTextState(alertText)
    }

    const addQuoteInput = (index) => {
        const isInputsEmpty = validation.isEmpty(props.multipleQuotesValue[index])
        if (isInputsEmpty) {
            sendAlert("Um ou mais campos vazios!")
        } else {
            const updatedIconVisible = [...iconVisible]

            const newIndex = iconVisible.length
            const newObject = { [newIndex]: true }

            updatedIconVisible[index] = !updatedIconVisible[index]

            updatedIconVisible.push(newObject)

            setIconVisible(updatedIconVisible)

            console.log(updatedIconVisible)
        }
    }
    const removeQuoteInput = (index) => {
        const updatedIconVisible = [...iconVisible]
        updatedIconVisible[index - 1] = !updatedIconVisible[index - 1]
        setIconVisible(updatedIconVisible)
        console.log(updatedIconVisible)
    }

    return (
        <>
            {props.multipleQuotesValue.map((_, index) => (
                <div key={index}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FloatingLabel label="Quote">
                                    <Form.Control
                                        name="quote"
                                        placeholder="Quote"
                                        value={props.quoteValue}
                                        onChange={(e) => props.onChange(e, index)}
                                    />
                                </FloatingLabel>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FloatingLabel label="Autor">
                                    <Form.Control
                                        name="author"
                                        placeholder="Autor"
                                        value={props.authorValue}
                                        onChange={(e) => props.onChange(e, index)}
                                    />
                                </FloatingLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                    {index !== 0 && (
                        <MdbIcon
                            icon="trash-alt"
                            onClick={() => removeQuoteInput(index)}
                        />
                    )}
                    <MdbIcon icon="plus-circle" onClick={addQuoteInput} />
                    {alertVisible && <AlertComponent text={alertTextState} />}
                </div>
            ))}
        </>
    )
}