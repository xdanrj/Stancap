import { React, useState, useEffect } from "react"
import { Form, Col, Row } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { MdbIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import AlertComponent from "../../Alert/AlertComponent";
import MultipleQuoteValidations from "../../../Validations/MultipleQuoteValidations";
const validation = new MultipleQuoteValidations()

export default function MultipleQuoteInputs(props) {
    //console.log(props.multipleQuotesValue)

    const [iconVisible, setIconVisible] = useState([true])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertTextState, setAlertTextState] = useState("")
    console.log(iconVisible)
    useEffect(() => {
        if (props.multipleQuotesValue.length === 0) {
            props.setMultipleQuotes([{ quote: "", author: "" }])
        }
    }, [])

    const sendAlert = (alertText) => {
        setAlertVisible(!alertVisible)
        setAlertTextState(alertText)
    }
    /*
                const updatedIconVisible = [...iconVisible]
                const newIndex = iconVisible.length
                const newObject = { [newIndex]: true }
                updatedIconVisible[index] = !updatedIconVisible[index]
                updatedIconVisible.push(newObject)
                setIconVisible(updatedIconVisible)*/
    const addQuoteInput = (index) => {
        const isInputsEmpty = validation.isEmpty(props.multipleQuotesValue[index])

        if (isInputsEmpty) {
            sendAlert("Um ou mais campos vazios!")
        } else {
            props.setMultipleQuotes([...props.multipleQuotesValue, { quote: "", author: "" }])

            const updatedIconVisible = [...iconVisible]
            if (index === 0) {
                console.log("condicao: index [0]")
                updatedIconVisible[0] = false
                updatedIconVisible[1] = true
            } else {
                console.log("condicao else")
                updatedIconVisible[index - 1] = false
                updatedIconVisible[index + 1] = true

            }
            setIconVisible(updatedIconVisible)

        }
    }
    const removeQuoteInput = (index) => {
        const updatedMultipleQuotesValue = [...props.multipleQuotesValue]
        updatedMultipleQuotesValue.splice(index, 1)
        props.setMultipleQuotes(updatedMultipleQuotesValue)

        const updatedIconVisible = [...iconVisible]
        updatedIconVisible.splice(index, 1)
        setIconVisible(updatedIconVisible)
        /*
        updatedIconVisible[index - 1] = !updatedIconVisible[index - 1]
        setIconVisible(updatedIconVisible)*/
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
                                        value={props.multipleQuotesValue[index].quote}
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
                                        value={props.multipleQuotesValue[index].author}
                                        onChange={(e) => props.onChange(e, index)}
                                    />
                                </FloatingLabel>
                            </FormGroup>
                        </Col>
                    </Row>

                    {iconVisible[index] && (
                        <MdbIcon icon="plus-circle" onClick={() => addQuoteInput(index)} />
                    )}

                    {
                        <MdbIcon
                            icon="trash-alt"
                            onClick={() => removeQuoteInput(index)}
                        />
                    }

                    {alertVisible && <AlertComponent text={alertTextState} />}
                </div>
            ))}
        </>
    )
}