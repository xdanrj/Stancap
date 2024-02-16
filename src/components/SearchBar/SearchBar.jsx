import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton, Row, Col, Container } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function SearchBar({ fetchQuotesBySearch, fetchAllQuotes, urlQuery }) {
    const useAlert = useAlertMsg()
    const navigate = useNavigate()
    const SearchBarRef = useRef()

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
    const [tempSearchQuery, setTempSearchQuery] = useState({ "query": {}, "label": "" })
    const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })
    useEffect(() => {
        if (urlQuery) {
            async function settingQuery() {
                console.log(urlQuery)
                console.log(urlQuery.queryprop)
                console.log(urlQuery.queryvalue)
                const queryProp = urlQuery.queryprop
                const foundType = SearchTypes.find((type) => type.value === queryProp)
                console.log(foundType)
                setSelectedType(foundType)
                setSearchQuery((prevSearchQuery) => ({
                    ...prevSearchQuery,
                    "query": {[queryProp]: urlQuery.queryvalue},
                    "label": foundType?.label,
                }))
            }
            settingQuery()
            fetchQuotesBySearch(searchQuery)
        } else {
            console.log("caiu ELSE")
            fetchAllQuotes()
        }
    }, [urlQuery])

    useEffect(() => {
        if (searchQuery?.query && Object.keys(searchQuery?.query).length > 0) {
            fetchQuotesBySearch(searchQuery)
        }
    }, [searchQuery])

    const handleTypeSelect = (eventKey) => {
        setSelectedType(SearchTypes[eventKey])
        console.log(searchQuery)
    }

    const handleSearchChange = (e) => {
        setTempSearchQuery((prevTempSearchQuery) => ({
            ...prevTempSearchQuery,
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
        setSearchQuery(setTempSearchQuery)
        //await fetchQuotesBySearch(searchQuery)
        //navigate(`/quotes/${selectedType?.value}/${searchQuery?.query[selectedType?.value]}`)
    }
    console.log(selectedType)
    console.log(searchQuery)
    return (
        <>
            <Row className="justify-content-center">
                <Col md={8} lg={5}>
                    <InputGroup ref={SearchBarRef} >
                        <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

                            {SearchTypes.map((item, index) => (
                                <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                            ))}
                        </DropdownButton>

                        <Form.Control
                            className={inputColor ? "bg-danger" : "bg-light"}
                            placeholder="Pesquise..." onChange={handleSearchChange}
                            value={tempSearchQuery?.query[selectedType?.value] || ""}
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