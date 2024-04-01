import React from "react";
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormControl, CenteredFormGroup } from "../../../CommonStyles/CommonStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import MultipleQuoteInputs from "./MultipleQuoteInputs/MultipleQuoteInputs";
import { MDBIcon } from "mdb-react-ui-kit";
import dayjs from "dayjs";
import { SourceNames } from "../SourceCommonFunctions";
import { useAlertMsg } from "../../Alert/AlertContext";
import { useModalBox } from "../../Modal/ModalContext";
import { isValidDate } from "../../../Formatting/DateFormatting";
import quoteEditingServices from "../../../services/quoteServices"
import { FastQuotesFillModal } from "./FastQuotesFillModal";
import { useSearchParams } from "react-router-dom";

const quoteEditingService = new quoteEditingServices()

export default function MultipleQuoteGenericForm(props) {
    const useAlert = useAlertMsg()
    const useModal = useModalBox()
    const [cdBtn, setCdBtn] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [multipleQuotes, setMultipleQuotes] = useState([])
    const [tags, setTags] = useState([])
    const [quoteData, setQuoteData] = useState({
        quotes: [],
        date: '',
        source: '',
        context: '',
        tags: [],
    })
    const [showFastQuotesFillModal, setShowFastQuotesFillModal] = useState(false)
    const [rawChatLog, setRawChatLog] = useState(``)
    const [chatLogResult, setChatLogResult] = useState([])

    useEffect(() => {
        async function getQuoteToEdit() {
            if (searchParams.get("_id")) {
                const response = await quoteEditingService.searchQuotes({ _id: searchParams.get("_id") })
                const data = response.foundQuote[0]
                console.log(data)
                setMultipleQuotes(data.quotes)
                setTags(data.tags)

                setQuoteData((prevData) => ({
                    ...prevData,
                    date: data.date,
                    source: data.source,
                    context: data.context,
                    tags: data.tags
                }))
            }
        }
        getQuoteToEdit()
    }, [])

    const handleSourceSelect = (eventKey) => {
        console.log(eventKey)
        if (eventKey) {
            setQuoteData((prevData) => ({
                ...prevData,
                source: eventKey
            }))
        }
    }

    const finalSubmitQuote = async () => {
        let response
        try {
            if (multipleQuotes.length > 1) {
                if (props.type === "addQuote") {
                    const updatedQuoteData = {
                        ...quoteData,
                        quotes: multipleQuotes,
                        tags: tags,
                        uploadDate: dayjs().format(),
                        uploadByUser: localStorage.getItem("userId"),
                        quoteType: "multiple"
                    }
                    response = await quoteEditingService.addQuote(updatedQuoteData)
                } else if (props.type === "editQuote") {
                    const updatedQuoteData = {
                        ...quoteData,
                        quotes: multipleQuotes,
                        tags: tags
                    }
                    response = await quoteEditingService.editQuote(Object.fromEntries(searchParams), updatedQuoteData)
                }
                if (response.message) {
                    useAlert(response.message)

                } else {
                    alert(props.texts.submitSuccess)
                    window.location.reload()
                }
            } else {
                useAlert("Diálogos precisam de no mínimo 2 falas")
            }
        } catch (error) {
            useAlert(error)
        }
    }

    const handleSubmitQuote = async (e) => {
        e.preventDefault()
        setCdBtn(true)
        setTimeout(() => {
            setCdBtn(false)
        }, 1000)
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

            if (paragraph) {
                useModal({ title: "Faltam informações", paragraph: paragraph, buttons: buttons })
            } else {
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
            setMultipleQuotes((prevQuoteData) => ({
                ...prevQuoteData,
                ["quote"]: value
            }))
        }
        setQuoteData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleMultipleQuoteChange = (e, index) => {
        const { name, value } = e.target
        const updatedMultipleQuotes = [...multipleQuotes]
        if (!updatedMultipleQuotes[index]) {
            updatedMultipleQuotes[index] = {}
        }

        updatedMultipleQuotes[index] = {
            ...updatedMultipleQuotes[index],
            [name]: value
        }
        setMultipleQuotes(updatedMultipleQuotes)
    }

    const handleRawChatLog = (e) => {
        const value = e.target.value
        setRawChatLog(value)
    }

    const convertRawChatLog = () => {
        console.log("entrou func")
        const keyregex = /]\s*([\w\s]+)\s*:/
        const valueRegex = /:\s*(\w+(?:\s+\w+)*)\s*$/

        const lines = rawChatLog.trim().split('\n')
        const objs = []
        const tempMultipleQuotes = []

        lines.forEach((line) => {
            const keyMatch = keyregex.exec(line)
            const valueMatch = valueRegex.exec(line)

            if (keyMatch && valueMatch) {
                const key = keyMatch[1]
                const value = valueMatch[1]
                const obj = { [key]: value }
                objs.push(obj)
            } else {
                useAlert("Erro: verifique o formato.")
            }

        })
        if (objs.length > 0) {
            objs.forEach((obj) => {
                console.log(Object.keys(obj))
                console.log(Object.values(obj))
                tempMultipleQuotes.push({ "quote": Object.values(obj)[0], "author": Object.keys(obj)[0] })

            })

            console.log(tempMultipleQuotes)
            console.log(objs)
            setMultipleQuotes(tempMultipleQuotes)
            setChatLogResult(objs)
            setShowFastQuotesFillModal(false)
            useAlert("Campos preenchidos com sucesso.")
        }
    }

    const handleClearAll = () => {
        useModal({
            title: "Limpar todos os campos",
            paragraph: "Apagar todos os campos Quote/Autor?",
            buttons: [{ text: "Sim", action: [() => setMultipleQuotes([{ quote: "", author: "" }]), "handleClose()"] },
            { text: "Não", action: ["handleClose()"] }]
        })
    }

    return (
        <>
            <FastQuotesFillModal show={showFastQuotesFillModal} setShow={setShowFastQuotesFillModal} convertRawChatLog={convertRawChatLog} handleRawChatLog={handleRawChatLog} />
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={5} xl={4}>
                    <Form onSubmit={handleSubmitQuote}>
                        <div className="mb-4">
                            <Button onClick={() => setShowFastQuotesFillModal(true)} > <MDBIcon fas icon="paste" /></Button>
                            {multipleQuotes.length > 1 && <Button className="ms-4" onClick={handleClearAll}><MDBIcon icon="trash-alt" /></Button>}
                        </div>

                        <MultipleQuoteInputs
                            onChange={handleMultipleQuoteChange}
                            setMultipleQuotes={setMultipleQuotes}
                            multipleQuotes={multipleQuotes}
                        />

                        <FormGroup className="mt-3 mx-auto">
                            <Col xs={4}  className="mx-auto">
                                <FloatingLabel className="" label="Data">
                                    <CenteredFormControl name="date" placeholder="Data" onChange={handleGenericChange} value={quoteData.date}>
                                    </CenteredFormControl>
                                </FloatingLabel>
                            </Col>

                                <Col className="mt-4">
                                    <FloatingLabel label="Contexto (Opcional)">
                                        <Form.Control name="context" placeholder="Contexto (Opcional)" onChange={handleGenericChange} value={quoteData.context}>
                                        </Form.Control>
                                    </FloatingLabel>
                                </Col>                            
                        </FormGroup>

                        <Row>
                            <FormGroup>
                                <DropdownButton drop="down" align="end" title={quoteData.source ? quoteData.source : "Source"} onSelect={handleSourceSelect}>
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
                            <FormGroup>
                                <TagSelectorComponent tags={tags} setTags={setTags} />
                            </FormGroup>
                        </Row>
                        <Button type="submit" disabled={cdBtn}>{props.texts.submitButton}</Button>
                    </Form>
                </Col>
            </Row >
        </>
    )
}