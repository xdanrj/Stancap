import { React, useState, useEffect } from "react"
import { Form, Col, Row } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { MdbIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import AlertComponent from "../../Alert/AlertComponent";

export default function MultipleQuoteInputs(props) {
    console.log(props.multipleQuotesValue)

    const [iconVisible, setIconVisible] = useState([true])
   
    console.log(iconVisible)
    useEffect(() => {
        if (props.multipleQuotesValue.length === 0) {
            props.setMultipleQuotes([{ quote: "", author: "" }])
        }
    }, [])

    

    const addQuoteInput = (index) => {
        if (!(props.multipleQuotesValue[index].quote) || !(props.multipleQuotesValue[index].author)) {
            sendAlert("Um ou mais campos vazios!")
        } else {
            props.setMultipleQuotes([...props.multipleQuotesValue, { quote: "", author: "" }])

            let updatedIconVisible = [...iconVisible]

            updatedIconVisible[index] = false
            updatedIconVisible[index + 1] = true
            setIconVisible(updatedIconVisible)
        }
    }
    const removeQuoteInput = (index) => {
        //deleta valores da array
        let updatedMultipleQuotesValue = [...props.multipleQuotesValue]
        updatedMultipleQuotesValue.splice(index, 1)
        props.setMultipleQuotes(updatedMultipleQuotesValue)

        // altera a visibilidade dos icones
        let updatedIconVisible = [...iconVisible]
        updatedIconVisible[index - 1] = true
        updatedIconVisible.splice(index, 1)
        setIconVisible(updatedIconVisible)
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

                    {!(props.multipleQuotesValue.length === 1) && (
                        <MdbIcon
                            icon="trash-alt"
                            onClick={() => removeQuoteInput(index)}
                        />
                    )}

                    
                </div>
            ))}
        </>
    )
}