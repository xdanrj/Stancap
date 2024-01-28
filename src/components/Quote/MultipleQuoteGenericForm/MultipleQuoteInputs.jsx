import { React, useState, useEffect } from "react"
import { Form, Col, Row } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormControl } from "../../../CommonStyles/CommonStyles";
import { MdbIcon, FormGroupMultipleQuote } from "./MultipleQuoteGenericFormStyles";
import { useAlertMsg } from "../../Alert/AlertContext";

export default function MultipleQuoteInputs(props) {

    const useAlert = useAlertMsg()
    const [iconVisible, setIconVisible] = useState([true])
    const [multipleQuotes, setMultipleQuotes] = useState([])

    useEffect(() => {
        /*if (props.multipleQuotes.length === 0) {
            props.setMultipleQuotes([{ quote: "", author: "" }])
        }*/
        setMultipleQuotes(props.multipleQuotes)

    }, [])

    const addQuoteInput = (index) => {
        if (!(multipleQuotes[index].quote) || !(multipleQuotes[index].author)) {
            useAlert("Um ou mais campos vazios!")
        } else {
            setMultipleQuotes([...multipleQuotes, { quote: "", author: "" }])

            let updatedIconVisible = [...iconVisible]

            updatedIconVisible[index] = false
            updatedIconVisible[index + 1] = true
            setIconVisible(updatedIconVisible)
        }
    }
    const removeQuoteInput = (index) => {
        //deleta valores da array
        let updatedmultipleQuotes = [...multipleQuotes]
        updatedmultipleQuotes.splice(index, 1)
        setMultipleQuotes(updatedmultipleQuotes)

        // altera a visibilidade dos icones
        let updatedIconVisible = [...iconVisible]
        updatedIconVisible[index - 1] = true
        updatedIconVisible.splice(index, 1)
        setIconVisible(updatedIconVisible)
    }
    console.log(multipleQuotes)
    console.log(typeof (multipleQuotes))
    return (
        <>
            {multipleQuotes.map((_, index) => (
                <div key={index}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FloatingLabel label="Quote">
                                    <Form.Control
                                        name="quote"
                                        placeholder="Quote"
                                        value={multipleQuotes[index].quote}
                                        onChange={(e) => onChange(e, index)}
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
                                        value={multipleQuotes[index].author}
                                        onChange={(e) => onChange(e, index)}
                                    />
                                </FloatingLabel>
                            </FormGroup>
                        </Col>
                    </Row>

                    {iconVisible[index] && (
                        <MdbIcon icon="plus-circle" onClick={() => addQuoteInput(index)} />
                    )}

                    {!(multipleQuotes.length === 1) && (
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