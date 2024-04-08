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
import { QuotesProperties } from "../../Formatting/QuotesProperties";
import SearchPath from "./SearchPath/SearchPath";

export function SearchBar({ fetchAllQuotes }) {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedSearchType, setSelectedSearchType] = useState()
    const [selectedQuoteType, setSelectedQuoteType] = useState(searchParams.get("quoteType") || null)
    const [typeColor, setTypeColor] = useState(false)
    const [inputColor, setInputColor] = useState(false)
    //const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })
    const [searchTypes, setSearchTypes] = useState(QuotesProperties)

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

        let propertyQuery = {}
        for (let [key, value] of searchParams) {
            if (!(key === "page" || key === "sort" || key === "quoteType")) {
                propertyQuery[key] = value
            }
        }
        console.log(propertyQuery)
        if (propertyQuery.length > 0) {
                //                                                          Object.keys(propertyQuery)[0]
                const foundType = searchTypes.find((type) => type.value === propertyQuery)
                setSelectedSearchType(foundType)                
        } else {
            fetchAllQuotes ? fetchAllQuotes() : null
        }
    }, [])


    useEffect(() => {
        navigate({ search: searchParams.toString() })
    }, [searchParams])

    const handleTypeSelect = (eventKey) => {
        setSelectedSearchType(searchTypes.find((type) => type.value === eventKey))
    }

    const handleSourceSelect = async (eventKey) => {
        console.log(eventKey)
        setSelectedSearchType({ label: "Source", value: "source" })
        //setSearchQuery({ "query": { "source": eventKey }, "label": "Source" })
        searchParams.set("source", eventKey)
        navigate({ search: searchParams.toString() })
    }

    const handleQuoteTypeSelect = (value) => {
        setSelectedQuoteType(value)
        searchParams.set("quoteType", value)
        navigate({ search: searchParams.toString() })
    }

    const handleSearchChange = (e) => {
        // setSearchQuery((prevSearchQuery) => ({
        //     ...prevSearchQuery,
        //     query: { [selectedSearchType?.value]: e.target.value },
        //     label: selectedSearchType?.label
        // }))
        searchParams.set()
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

    const handleClearSearch = () => {
        const clearedSearchParams = new URLSearchParams()
        setSelectedQuoteType(null)
        navigate({ search: clearedSearchParams.toString() })
    }

    return (
        <>
            <div style={{ "marginBottom": "-2rem" }}>
                {!(selectedSearchType?.value === "source") && (
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={5}>
                            <InputGroup >
                                <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedSearchType ? selectedSearchType.label : "Tipo"} onSelect={handleTypeSelect}>
                                    {searchTypes.map((item, index) => (
                                        <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                    ))}
                                    <ToggleButtonGroup type="radio" name="quoteType" value={selectedQuoteType}
                                        onChange={(value) => handleQuoteTypeSelect(value)}>
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

                                    <Button variant="dark" onClick={() => handleClearSearch()}>
                                        <MDBIcon fas icon="times" />
                                    </Button>

                                </>
                                <Button variant="dark" onClick={() => handleSortChange()}><i className=
                                    {searchParams.get("sort") === "ascending" ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt"}>
                                </i>
                                </Button>

                                <Button onClick={() => checkAttributes() ? handleSearchClick() : null}>
                                    <MDBIcon icon="search" />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                )}
                {selectedSearchType?.value === "source" && (
                    <>
                        <Row className="justify-content-center">
                            <Col md={8} lg={5}>
                                <InputGroup className="d-flex justify-content-center">
                                    <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedSearchType ? selectedSearchType.label : "Tipo"} onSelect={handleTypeSelect}>

                                        {searchTypes.map((item) => (
                                            <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                        ))}
                                        <ToggleButtonGroup type="radio" name="quoteType" value={selectedQuoteType}
                                            onChange={(value) => handleQuoteTypeSelect(value)}>
                                            <ToggleButton id="single" value={"single"} size="sm">Citação</ToggleButton>
                                            <ToggleButton id="multiple" value={"multiple"} size="sm">Diálogo</ToggleButton>
                                        </ToggleButtonGroup>
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
                    </>
                )}
            </div>

            <SearchPath searchParams={searchParams} />
        </>
    )
}