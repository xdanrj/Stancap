import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton, Row, Col, Container } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export function SearchBar({ fetchQuotesBySearch, fetchAllQuotes, actualPage, setActualPage }) {
    const location = useLocation()
    const navigate = useNavigate()

    const SearchTypes = [
        { label: "Autor", value: "author" },
        { label: "Tag", value: "tag" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUser" },
        { label: "Contexto", value: "context" }
    ]

    const [selectedType, setSelectedType] = useState()
    const [typeColor, setTypeColor] = useState(false)
    const [inputColor, setInputColor] = useState(false)
    const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })
    const [didSearched, setDidSearched] = useState(false)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        let queryString = {}
        for (let param of searchParams) {
            if (param[0] !== "page") {
                queryString[param[0]] = param[1]
            }
        }
        console.log(actualPage)
        console.log(queryString)
        if (Object.keys(queryString).length > 0) {
            async function settingQuery() {
                const queryprop = Object.keys(queryString).filter(key => key !== "page")
                console.log(queryprop)

                const foundType = SearchTypes.find((type) => type.value === Object.keys(queryString)[0])
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
            //fetchAllQuotes()
        }
    }, [location.search])

    useEffect(() => {
        fetchQuotesBySearch(searchQuery)
    }, [didSearched])

    const handleTypeSelect = (eventKey) => {
        setSelectedType(SearchTypes[eventKey])
        console.log(searchQuery)
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
        setSearchQuery(setSearchQuery)
        navigate(`/quotes?${selectedType?.value}=${searchQuery?.query[selectedType?.value]}`)
    }
    console.log(selectedType)
    console.log(searchQuery)
    return (
        <>
            <Row className="justify-content-center">
                <Col md={8} lg={5}>
                    <InputGroup >
                        <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

                            {SearchTypes.map((item, index) => (
                                <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                            ))}
                        </DropdownButton>

                        <Form.Control
                            className={inputColor ? "bg-danger" : "bg-light"}
                            placeholder="Pesquise..." onChange={handleSearchChange}
                            value={searchQuery?.query[selectedType?.value] || ""}
                        />

                        <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                            <MDBIcon icon="search" />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}