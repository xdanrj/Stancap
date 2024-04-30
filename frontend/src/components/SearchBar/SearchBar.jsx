import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton, DropdownItem, Row, Col, Container, ButtonGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { SourceNames, getSourceLabel } from "../Quote/SourceCommonFunctions";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { QuotesProperties, getPropertyLabel } from "../../Formatting/QuotesProperties";
import SearchPath from "./SearchPath/SearchPath";
import { sizes } from "../../CommonStyles/screenSizes";

export function SearchBar({ getQuotes }) {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    // pureSearchParams é o searchParams sem as keys "page" e "sort"
    const [pureSearchParams, setPureSearchParams] = useState()
    const [selectedSearchType, setSelectedSearchType] = useState()
    const [selectedQuoteType, setSelectedQuoteType] = useState(searchParams.get("quoteType") || null)
    const [typeColor, setTypeColor] = useState(false)
    const [inputColor, setInputColor] = useState(false)
    const [inputString, setInputString] = useState()
    const [searchTypes, setSearchTypes] = useState(QuotesProperties)

    useEffect(() => {
        console.log(location.search)
        if (!searchParams.has("page")) {
            searchParams.set("page", "1")
            navigate({ search: searchParams.toString() })
        }
        navigate({ search: searchParams.toString() })
        getQuotes()
    }, [location.search])

    useEffect(() => {
        _.remove(searchTypes, obj => obj.value === "sort")
        if (location.pathname === "/my_quotes") {
            _.remove(searchTypes, obj => obj.value === "uploadByUsername"
            )
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
        const foundType = searchTypes.find((type) => type.value === propertyQuery)
        setSelectedSearchType(foundType)
        getQuotes()
    }, [])

    useEffect(() => {
        const paramsCopy = new URLSearchParams(searchParams.toString())
        paramsCopy.delete('page')
        paramsCopy.delete('sort')
        setPureSearchParams(paramsCopy)
    }, [searchParams])

    const handleTypeSelect = (eventKey) => {
        console.log(eventKey)
        setSelectedSearchType(eventKey)
    }

    const handleSourceSelect = async (eventKey) => {
        searchParams.set("page", "1")
        setSelectedSearchType("source")
        searchParams.set("source", eventKey)
        navigate({ search: searchParams.toString() })
    }

    const handleQuoteTypeSelect = (value) => {
        setSelectedQuoteType(value)
        searchParams.set("quoteType", value)
        navigate({ search: searchParams.toString() })
    }

    const handleSearchChange = (e) => {
        console.log(selectedSearchType)
        console.log(e.target.value)
        setInputString(e.target.value)
    }

    const handleSearchClick = async () => {
        searchParams.set("page", "1")
        searchParams.set(selectedSearchType, inputString)

        navigate({ search: searchParams.toString() })
    }

    const handleSortChange = () => {
        searchParams.set("sort", searchParams.get("sort") === "ascending" ? "descending" : "ascending")
        searchParams.set("page", "1")
        navigate({ search: searchParams.toString() })
    }

    const handleClearSearch = () => {
        const clearedSearchParams = new URLSearchParams()
        setSelectedQuoteType(null)
        setInputString("")
        navigate({ search: clearedSearchParams.toString() })
    }

    const checkAttributes = () => {
        if (!selectedSearchType) {
            setTypeColor(true)
            setTimeout(() => { setTypeColor(false) }, 500)
        } else if (!inputString) {
            setInputColor(true)
            setTimeout(() => { setInputColor(false) }, 500)
        } else {
            return true
        }
    }

    const buttonSize = sizes.isMobile ? "sm" : "lg"

    //todo: fazer com q a searchbar seja da mesma largura do que as quotes e talvez descolar os botoes do input
    return (
        <>
            <div style={{ "marginBottom": "-2rem" }}>

                {!(selectedSearchType === "source") && (
                    <Row className="justify-content-center">

                        <Col xs={12} sm={10} md={8} lg={5}>
                            <InputGroup>
                                <DropdownButton size={buttonSize} variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={getPropertyLabel(selectedSearchType) || "Tipo"} onSelect={handleTypeSelect}>
                                    {searchTypes.map((item, index) => (
                                        <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                    ))}
                                    <ToggleButtonGroup type="radio" name="quoteType" value={selectedQuoteType}
                                        onChange={(value) => handleQuoteTypeSelect(value)}>

                                        <ToggleButton size={buttonSize} as="Button" variant="outline-light"
                                            id="single" value={"single"} >Citação</ToggleButton>

                                        <ToggleButton size={buttonSize} as="Button" variant="outline-light"
                                            id="multiple" value={"multiple"}>Diálogo</ToggleButton>
                                    </ToggleButtonGroup>
                                </DropdownButton>

                                <>
                                    <Form.Control
                                        className={inputColor ? "bg-danger" : "bg-light"}

                                        placeholder={selectedSearchType === "tags" ? "Separe as tags por vírgula" : "Pesquise..."} onChange={handleSearchChange}
                                        value={inputString || ""}
                                    />
                                    {(pureSearchParams?.size || inputString?.length > 0) && (
                                        <Button size={buttonSize} variant="outline-light" onClick={() => handleClearSearch()}>
                                            <MDBIcon fas icon="times" />
                                        </Button>
                                    )}


                                </>
                                <Button size={buttonSize} variant="outline-light" onClick={() => handleSortChange()}><i className=
                                    {searchParams.get("sort") === "ascending" ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt"}>
                                </i>
                                </Button>

                                <Button size={buttonSize} variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                                    <MDBIcon icon="search" />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                )}
                {selectedSearchType === "source" && (
                    <>
                        <Row className="justify-content-center">
                            <Col md={8} lg={5}>
                                <InputGroup className="d-flex justify-content-center">
                                    <DropdownButton size={buttonSize} variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={getPropertyLabel(selectedSearchType) || "Tipo"} onSelect={handleTypeSelect}>

                                        {searchTypes.map((item) => (
                                            <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                        ))}
                                        <ToggleButtonGroup type="radio" name="quoteType" value={selectedQuoteType}
                                            onChange={(value) => handleQuoteTypeSelect(value)}>

                                            <ToggleButton size={buttonSize} as="Button" variant="outline-light"
                                                id="single" value={"single"} >Citação</ToggleButton>

                                            <ToggleButton size={buttonSize} as="Button" variant="outline-light"
                                                id="multiple" value={"multiple"} >Diálogo</ToggleButton>
                                        </ToggleButtonGroup>
                                    </DropdownButton>

                                    <DropdownButton size={buttonSize} variant="dark" menuVariant="dark"
                                        title={getSourceLabel(searchParams.get("source")) || "Nome"}
                                        onSelect={handleSourceSelect}>
                                        {SourceNames.map((item, index) => (
                                            <DropdownItem eventKey={item.value} key={item.value}>{item.name}</DropdownItem>
                                        ))
                                        }
                                    </DropdownButton>
                                    <Button size={buttonSize} variant="outline-light" onClick={() => handleClearSearch()}>
                                        <MDBIcon fas icon="times" />
                                    </Button>
                                    <Button size={buttonSize} variant="outline-light" onClick={() => handleSortChange()}><i className="bi bi-sort-down-alt"></i></Button>

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