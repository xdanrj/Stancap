import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton, Row, Col, Container } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { SourceNames } from "../Quote/SourceCommonFunctions";
import _ from "lodash";

export function SearchBar({ fetchQuotesBySearch, fetchAllQuotes, searchParams, queryString }) {
    const location = useLocation()
    const navigate = useNavigate()

    SourceNames.map((item, index) => {
        console.log(item.value)
    })

    const [selectedType, setSelectedType] = useState()
    const [typeColor, setTypeColor] = useState(false)
    const [inputColor, setInputColor] = useState(false)
    const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })
    const [didSearched, setDidSearched] = useState(false)
    const [searchTypes, setSearchTypes] = useState([
        { label: "Autor", value: "author" },
        { label: "Tag", value: "tag" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUsername" },
        { label: "Contexto", value: "context" }])

    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname === "/my_quotes") {
            _.remove(searchTypes, function (obj) {
                return obj.value === "uploadByUsername"
            })
            setSearchTypes(searchTypes)
        }
        if (location.pathname === "/quotes") {
            if (!(searchTypes.find((obj) => obj.value === "uploadByUsername"))){
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
                setSelectedType(foundType)
                setSearchQuery((prevSearchQuery) => ({
                    ...prevSearchQuery,
                    "query": queryString,
                    "label": foundType?.label,
                }))
                setDidSearched(!didSearched)
            }
            settingQuery()
        } else {
            console.log("caiu ELSE")
            fetchAllQuotes()
        }
    }, [location.search])

    useEffect(() => {
        const query = Object.entries(searchQuery.query)[0]
        if(query){
            console.log(query)
            searchParams.set(query[0], query[1])
            searchParams.set("page", 1)
        }
    }, [searchQuery])

    useEffect(() => {
        console.log(searchQuery)
        console.log(Object.entries(searchQuery.query))
        fetchQuotesBySearch(searchQuery)
    }, [didSearched])

    const handleTypeSelect = (eventKey) => {
        setSelectedType(searchTypes.find((type) => type.value === eventKey))
    }

    const handleSourceSelect = (eventKey) => {
        console.log(eventKey)
        setSelectedType({ label: "Source", value: "source" })

        setSearchQuery((prevSearchQuery) => ({
            ...prevSearchQuery,
            "query": { "source": eventKey },
            "label": "Source"
        }))
        console.log("uuuuu")
        setDidSearched(!didSearched)
    }

    const handleSearchChange = (e) => {
        setSearchQuery((prevSearchQuery) => ({
            ...prevSearchQuery,
            query: { [selectedType?.value]: e.target.value },
            label: selectedType?.label
        }))
    }

    const checkAttributes = () => {
        if (!selectedType) {
            setTypeColor(true)
            setTimeout(() => { setTypeColor(false) }, 500)
        } else if (!searchQuery.query[selectedType.value]) {
            setInputColor(true)
            setTimeout(() => { setInputColor(false) }, 500)
        } else {
            return true
        }
    }
    const handleSearchClick = async () => {
        const query = Object.entries(searchQuery.query)[0]
        
        // searchParams.set("page", 1)
        // searchParams.set(query[0], query[1])
        navigate({ search: searchParams.toString() })
    }

    const handleSortChange = () => {
        console.log("handle sort order clicado")
        searchParams.set("sort", searchParams.get("sort") === "ascending" ? "descending" : "ascending")
        navigate({ search: searchParams.toString() })
    }

    return (
        <>
            {!(selectedType?.value === "source") && (
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <InputGroup >
                            <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>
                                {searchTypes.map((item, index) => (
                                    <DropdownItem eventKey={item.value} key={item.value}>{item.label}</DropdownItem>
                                ))}
                            </DropdownButton>

                            <>
                                <Form.Control
                                    className={inputColor ? "bg-danger" : "bg-light"}
                                    placeholder="Pesquise..." onChange={handleSearchChange}
                                    value={searchQuery?.query[selectedType?.value] || ""}
                                />

                                <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                                    <MDBIcon icon="search" />
                                </Button>
                            </>
                            <Button onClick={() => handleSortChange()}><i className="bi bi-sort-down-alt"></i></Button>
                        </InputGroup>
                    </Col>
                </Row>
            )}
            {selectedType?.value === "source" && (
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <InputGroup className="d-flex justify-content-center">
                            <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

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