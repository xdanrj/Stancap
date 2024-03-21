import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton, DropdownItem, Row, Col, Container, ButtonGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { SourceNames } from "../Quote/SourceCommonFunctions";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";

export function SearchBar({ fetchAllQuotes, searchQuery, setSearchQuery }) {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedSearchType, setSelectedSearchType] = useState()
    const [selectedQuoteType, setSelectedQuoteType] = useState(searchParams.get("type") ? searchParams.get("type") : "single")
    const [typeColor, setTypeColor] = useState(false)
    const [inputColor, setInputColor] = useState(false)
    const [searchTypes, setSearchTypes] = useState([
        { label: "Autor", value: "author" },
        { label: "Tags", value: "tags" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUsername" },
        { label: "Contexto", value: "context" }])

    useEffect(() => {
        if (location.pathname === "/my_quotes") {
            _.remove(searchTypes, function (obj) {
                return obj.value === "uploadByUsername"
            })
            setSearchTypes(searchTypes)
        }
        if (location.pathname === "/quotes") {
            if (!(searchTypes.find((obj) => obj.value === "uploadByUsername"))) {
                searchTypes.push({ label: "Upload por", value: "uploadByUsername" })
            }
            setSearchTypes(searchTypes)
        }

        let queryString = {}
        for (let param of searchParams) {
            if (param[0] !== "page" && param[0] !== "sort") {
                queryString[param[0]] = param[1]
            }
        }

        console.log(queryString)
        if (Object.keys(queryString).length > 0) {
            async function settingQuery() {
                const foundType = searchTypes.find((type) => type.value === Object.keys(queryString)[0])
                console.log(foundType)
                setSelectedSearchType(foundType)
                setSearchQuery((prevSearchQuery) => ({
                    ...prevSearchQuery,
                    "query": queryString,
                    "label": foundType?.label
                }))
            }
            settingQuery()
        } else {
            fetchAllQuotes ? fetchAllQuotes() : null
        }
    }, [])
    // OLD:  }, [location.search])

    useEffect(() => {
        console.log(Object.entries(searchQuery.query))
        for (const key of searchParams.keys()) {
            console.log(key)
        }
        for (const key of searchParams.keys()) {
            searchParams.delete(key)
        }
        for (const [key, value] of Object.entries(searchQuery.query)) {
            searchParams.set(key, value)
        }
    }, [searchQuery])

    const handleTypeSelect = (eventKey) => {
        setSelectedSearchType(searchTypes.find((type) => type.value === eventKey))
    }

    const handleSourceSelect = async (eventKey) => {
        console.log(eventKey)
        setSelectedSearchType({ label: "Source", value: "source" })

        await setSearchQuery({ "query": { "source": eventKey }, "label": "Source" })

        navigate({ search: searchParams.toString() })
        console.log("uuuuu")
    }

    const handleQuoteTypeSelect = (value) => {
        setSelectedQuoteType(value)
        searchParams.set("type", value)
        navigate({ search: searchParams.toString() })
    }

    const handleSearchChange = (e) => {
        setSearchQuery((prevSearchQuery) => ({
            ...prevSearchQuery,
            query: { [selectedSearchType?.value]: e.target.value },
            label: selectedSearchType?.label
        }))
    }

    const checkAttributes = () => {
        if (!selectedSearchType) {
            setTypeColor(true)
            setTimeout(() => { setTypeColor(false) }, 500)
        } else if (!searchQuery.query[selectedSearchType.value]) {
            setInputColor(true)
            setTimeout(() => { setInputColor(false) }, 500)
        } else {
            return true
        }
    }
    const handleSearchClick = async () => {
        navigate({ search: searchParams.toString() })
    }

    const handleSortChange = () => {
        searchParams.set("sort", searchParams.get("sort") === "ascending" ? "descending" : "ascending")
        searchParams.set("page", 1)
        navigate({ search: searchParams.toString() })
    }

    return (
        <>
            {!(selectedSearchType?.value === "source") && (
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <InputGroup >
                            <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedSearchType ? selectedSearchType.label : "Tipo"} onSelect={handleTypeSelect}>
                                {searchTypes.map((item, index) => (
                                    <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                ))}
                                <ToggleButtonGroup type="radio" name="quotetype" value={selectedQuoteType}
                                 onChange={(value)=> handleQuoteTypeSelect(value)}>
                                    <ToggleButton id="single" value={"single"} size="sm">Citação</ToggleButton>
                                    <ToggleButton id="multiple" value={"multiple"} size="sm">Diálogo</ToggleButton>
                                </ToggleButtonGroup>
                            </DropdownButton>

                            <>
                                <Form.Control
                                    className={inputColor ? "bg-danger" : "bg-light"}
                                    placeholder={selectedSearchType?.value === "tags" ? "Separe as tags por vírgula" : "Pesquise..."} onChange={handleSearchChange}
                                    value={searchQuery?.query[selectedSearchType?.value] || ""}
                                />

                                <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                                    <MDBIcon icon="search" />
                                </Button>
                            </>
                            <Button onClick={() => handleSortChange()}><i className=
                                {searchParams.get("sort") === "ascending" ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt"}>
                            </i></Button>
                        </InputGroup>
                    </Col>
                </Row>
            )}
            {selectedSearchType?.value === "source" && (
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <InputGroup className="d-flex justify-content-center">
                            <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedSearchType ? selectedSearchType.label : "Tipo"} onSelect={handleTypeSelect}>

                                {searchTypes.map((item, index) => (
                                    <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                ))}
                            </DropdownButton>

                            <DropdownButton variant="dark" menuVariant="dark" title="Nome" onSelect={handleSourceSelect}>
                                {SourceNames.map((item, index) => (
                                    <DropdownItem eventKey={item.value} key={item.value}>{item.name}</DropdownItem>
                                ))
                                }
                            </DropdownButton>
                            <Button onClick={() => handleSortChange()}><i className="bi bi-sort-down-alt"></i></Button>
                        </InputGroup>
                    </Col>
                </Row>

            )}
            <>

            </>
        </>
    )
}


/*
fazendo:
filtros sempre disponiveis: 
-crescente, decrescente:
-data
-tds os outros filtros

*/