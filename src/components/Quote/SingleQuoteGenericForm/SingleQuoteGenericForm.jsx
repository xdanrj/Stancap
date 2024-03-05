import React from "react";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormGroup } from "../../../CommonStyles/CommonStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import { isValidDate } from "../../../Formatting/DateFormatting";
import { SourceNames } from "../SourceCommonFunctions";
import { useModalBox } from "../../Modal/ModalContext";
import { useAlertMsg } from "../../Alert/AlertContext";
import dayjs from "dayjs"

import quoteEditingServices from "../../../services/quoteServices"
const quoteEditingService = new quoteEditingServices()

export default function SingleQuoteGenericForm(props) {
    const useModal = useModalBox()
    const useAlert = useAlertMsg()
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
    const [selectedSource, setSelectedSource] = useState(quoteData.source)

    useEffect(() => {
        async function getQuoteToEdit() {
            if (props.quoteIdToEdit) {
                const apiResponse = await quoteEditingService.getQuotes(props.quoteIdToEdit)
                const response = await apiResponse[0]
                setQuoteData((prevData) => ({
                    ...prevData,
                    quotes: response.quotes[0].quote,
                    author: response.author,
                    date: response.date,
                    source: response.source,
                    context: response.context,
                    tags: response.tags
                }))
            }
        }
        getQuoteToEdit()
    }, [])

    const handleSourceSelect = (eventKey) => {
        if (eventKey) {
            setSelectedSource(eventKey)
            const foundSource = SourceNames.find(obj => obj.value === selectedSource)
        }
    }

    const finalSubmitQuote = async () => {
        try {
            console.log("entrou no finalsubmitquote")
            let response
            if (props.type === "addQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    quotes: quotes,
                    tags: tags,
                    uploadDate: dayjs(),
                    uploadByUser: localStorage.getItem("userId"),
                    quoteType: "single",
                    source: selectedSource
                }
                response = await quoteEditingService.addQuote(updatedQuoteData)
            } else if (props.type === "editQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    quotes: quotes,
                    tags: tags
                }
                response = await quoteEditingService.editQuote(props.quoteIdToEdit, updatedQuoteData)
            }
            if (response === true) {
                alert(props.texts.submitSuccess)
                window.location.reload()

            } else {
                useAlert(response)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleSubmitQuote = async (e) => {
        e.preventDefault()
        try {
            let paragraph
            let buttons = [{
                text: "Vou inserir", action: ["handleClose()"]
            },
            {
                text: "Deixa assim mesmo", action: [finalSubmitQuote]
            }]

            if (!(quoteData.date)) {
                paragraph = "Você se esqueceu da data. Não se lembra nem do ano?"
            }
            else if (!(quoteData.author)) {
                paragraph = "Você se esqueceu do autor."
                buttons = [{ text: "Vou inserir", action: ["handleClose()"] }, { text: "Não lembro o autor" }]
            }

            if (paragraph) {
                useModal({ title: "Faltam informações", paragraph: paragraph, buttons: buttons })
            }
            else {
                if (tags.length === 0) {
                    useAlert("Insira pelo menos uma tag.")
                } else if (!(isValidDate(quoteData.date))) {
                    useAlert("Insira pelo menos o ano ou mês/ano. Ex.: 2022 ou 05/2020.")
                } else {
                    finalSubmitQuote()
                }
            }

        } catch (error) {
            useAlert(error)
        }
    }

    const handleGenericChange = (e) => {
        const { name, value } = e.target
        if (name === "otherSourceName") {
            setQuoteData((prevData) => ({
                ...prevData,
                source: value
            }))
        }
        if (name === "quotes") {
            setQuotes((prevQuoteData) => ({
                ...prevQuoteData,
                ["quote"]: value
            }))
        }
        setQuoteData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5}>
                    <Form onSubmit={handleSubmitQuote}>
                        <Row>
                            <FormGroup>
                                <FloatingLabel label="Quote">
                                    <Form.Control required name="quotes" placeholder="Quote" onChange={handleGenericChange} value={quoteData.quotes}>
                                    </Form.Control>
                                </FloatingLabel>
                            </FormGroup>

                            <Col>
                                <FormGroup>
                                    <FloatingLabel label="Autor">
                                        <Form.Control name="author" placeholder="Autor" maxLength={50} onChange={handleGenericChange} value={quoteData.author}>
                                        </Form.Control>
                                    </FloatingLabel>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <FloatingLabel label="Data">
                                        <Form.Control name="date" placeholder="Data" onChange={handleGenericChange} value={quoteData.date}>
                                        </Form.Control>
                                    </FloatingLabel>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FloatingLabel label="Contexto (Opcional)">
                                        <Form.Control name="context" placeholder="Contexto (Opcional)" onChange={handleGenericChange} value={quoteData.context}>
                                        </Form.Control>
                                    </FloatingLabel>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Col>

                            <FormGroup>
                                <DropdownButton drop="down" align="end" title={selectedSource || "Source"}
                                    onSelect={handleSourceSelect}>
                                    {SourceNames.map((item) => (
                                        <Dropdown.Item key={item.value} eventKey={item.value}>{item.name}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider />
                                    <div className="px-1 pb-2">
                                        <FloatingLabel label="Outro">
                                            <Form.Control name="otherSourceName" placeholder="Outro" onChange={handleGenericChange} value={SourceNames.includes(quoteData.source) ? "" : quoteData.source}>
                                            </Form.Control>
                                        </FloatingLabel>
                                    </div>
                                </DropdownButton>
                            </FormGroup>
                        </Col>

                        <FormGroup>
                            <TagSelectorComponent tags={quoteData.tags} setTags={setTags} />
                        </FormGroup>

                        <Button type="submit">{props.texts.submitButton}</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}