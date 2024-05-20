import React from "react";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { FloatingLabel, FormGroup, CenteredFormGroup, FormControl } from "../../../CommonStyles/CommonStyles";
import TagSelectorComponent from "../TagsSelector/TagsSelectorComponent";
import { isValidDate } from "../../../Formatting/DateFormatting";
import Sources from "../Sources";
import { useModalBox } from "../../Modal/ModalContext";
import { useAlertMsg } from "../../Alert/AlertContext";
import dayjs from "dayjs"
import { useSearchParams } from "react-router-dom";
import quoteEditingServices from "../../../services/quoteServices"
const quoteEditingService = new quoteEditingServices()

//todo: nao usar mais state selectedsource e setar a source selecionada direto na quoteData
export default function SingleQuoteGenericForm(props) {
    const Source = new Sources()
    const useModal = useModalBox()
    const useAlert = useAlertMsg()
    const [cdBtn, setCdBtn] = useState(false)
    const [tags, setTags] = useState([])
    //const [selectedSource, setSelectedSource] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [quoteData, setQuoteData] = useState({
        quotes: [],
        author: '',
        date: '',
        source: '',
        context: '',
        tags: [],
    })

    useEffect(() => {
        async function getQuoteToEdit() {
            if (searchParams.get("_id")) {
                const { quotes, message } = await quoteEditingService.getQuotes({ _id: searchParams.get("_id") })
                console.log(quotes)
                console.log(message)
                if (quotes && quotes.length > 0) {
                    const data = quotes[0]
                    console.log(data)
                    setQuoteData((prevData) => ({
                        ...prevData,
                        quotes: data.quotes,
                        author: data.author,
                        date: data.date,
                        source: data.source,
                        context: data.context,
                        tags: data.tags
                    }))
                }
                message && useAlert(message)
            }
        }
        getQuoteToEdit()
    }, [])

    const handleSourceSelect = (eventKey) => {
        const foundSource = Source.getSource(eventKey)
        //setSelectedSource(foundSource)
        setQuoteData((prevData) => ({
            ...prevData,
            source: foundSource.value
        }))
    }

    const finalSubmitQuote = async () => {
        try {
            console.log("entrou no finalsubmitquote")
            let response
            if (props.type === "addQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    tags: tags,
                    uploadDate: dayjs(),
                    uploadByUser: localStorage.getItem("userId"),
                    quoteType: "single"
                }
                response = await quoteEditingService.addQuote(updatedQuoteData)
                console.log(response)
            } else if (props.type === "editQuote") {
                const updatedQuoteData = {
                    ...quoteData,
                    tags: tags,
                    lastEditDate: dayjs()
                }
                console.log(updatedQuoteData)
                console.log(Object.fromEntries(searchParams))
                response = await quoteEditingService.editQuote(Object.fromEntries(searchParams), updatedQuoteData)
                console.log(response)
            }
            if (response.message) {
                useAlert(response.message)
            } else {
                alert(props.texts.submitSuccess)
                window.location.reload()
            }
        } catch (error) {
            alert(error)
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
        console.log(name)
        if (name === "otherSourceName") {           
            setQuoteData((prevData) => ({
                ...prevData,
                source: value
            }))
        }
        if (name == "quotes") {
            setQuoteData((prevData) => ({
                ...prevData,
                quotes: [{"quote": value}]
            }))
        } else {
            setQuoteData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
        
        console.log(quoteData)
    }
console.log(quoteData)
    return (
        <>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                    <Form onSubmit={handleSubmitQuote}>
                        <Row>
                            <FormGroup>
                                <FloatingLabel label="Quote">
                                    <FormControl required name="quotes" placeholder="Quote" onChange={handleGenericChange} value={quoteData.quotes[0]?.quote}>
                                    </FormControl>
                                </FloatingLabel>
                            </FormGroup>

                            <Col>
                                <FormGroup>
                                    <FloatingLabel label="Autor">
                                        <FormControl name="author" placeholder="Autor" maxLength={50} onChange={handleGenericChange} value={quoteData.author}>
                                        </FormControl>
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
                                <DropdownButton drop="down" align="end" title={Source.getLabel(quoteData.source) || "Source"}
                                    onSelect={handleSourceSelect}>
                                    {Source.sources.map((item) => (
                                        <Dropdown.Item key={item.value} eventKey={item.value}>{item.name}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider />
                                    <div className="px-1 pb-2">
                                        <FloatingLabel label="Digite outra source...">
                                            <Form.Control name="otherSourceName" placeholder="Digite outra source..." onChange={handleGenericChange} value={
                                                Source.getSource(quoteData.source) ? "" : quoteData.source}>
                                            </Form.Control>
                                        </FloatingLabel>
                                    </div>
                                </DropdownButton>
                            </FormGroup>
                        </Col>

                        <FormGroup>
                            <TagSelectorComponent tags={quoteData.tags} setTags={setTags} />
                        </FormGroup>

                        <Button type="submit" disabled={cdBtn}>{props.texts.submitButton}</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}