import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function SearchBar(props) {
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
    const [searchQuery, setSearchQuery] = useState({ "query": {}, "label": "" })

    useEffect(() => {
        console.log(props.urlQuery)
        if (props.urlQuery) {
            console.log("rodou")
            async function getParams() {
                const queryProp = Object.keys(props.urlQuery)
                const foundType = SearchTypes.find((type) => type.value === queryProp[0])
                setSelectedType(foundType)

                setSearchQuery((prevSearchQuery) => ({
                    ...prevSearchQuery,
                    "query": props.urlQuery,
                    "label": foundType?.label,
                }))
            }
            getParams()
        }
    }, [props.urlQuery])

    const handleTypeSelect = (eventKey) => {
        setSelectedType(SearchTypes[eventKey])
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

    const handleSearchClick = () => {
        const queryProp = [...Object.keys(searchQuery.query)][0]
        props.searchFunction(searchQuery)
        navigate(`/quotes/${queryProp}/${searchQuery.query[queryProp]}`)
    }

    return (
        <>
            <InputGroup ref={SearchBarRef}>
                <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

                    {SearchTypes.map((item, index) => (
                        <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                    ))}
                </DropdownButton>

                <Form.Control

                    className={inputColor ? "bg-danger" : "bg-light"}
                    placeholder="Pesquise..." onChange={handleSearchChange}
                    value={searchQuery.query[Object.keys(searchQuery.query)] ? searchQuery.query[Object.keys(searchQuery.query)] : "" || ""} />

                <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}