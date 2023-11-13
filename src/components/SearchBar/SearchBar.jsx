import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";

export function SearchBar(props) {
    const useAlert = useAlertMsg()
    console.log(props.urlQuery)
    console.log(props.urlQuery.source)

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

    // a fazer: setar type auto. puxando da urlquery, corrigir bug em que o valor do input so muda quando digita-se algo 

    const initialQuery = props.urlQuery.source
        ? { query: { source: props.urlQuery.source }, label: "Source" }
        : { query: { query: {}, label: "" } }

    const [searchQuery, setSearchQuery] = useState(initialQuery)

    useEffect(() => {
        setSearchQuery((prevSearchQuery) => ({
            ...prevSearchQuery,
            ["query"]: { [selectedType?.value]: "" },
            ["label"]: selectedType?.label
        }))
    }, [selectedType])

    const handleTypeSelect = (eventKey) => {
        setSelectedType(SearchTypes[eventKey])
    }

    const handleSearchChange = (e) => {
        setSearchQuery({
            ["query"]: { [selectedType?.value]: e.target.value },
            ["label"]: selectedType?.label
        })
    }

    const checkAttributes = () => {
        console.log(searchQuery)
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
        
        props.searchFunction(searchQuery)

    }

    return (
        <>
            <InputGroup>
                <DropdownButton variant={typeColor ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

                    {SearchTypes.map((item, index) => (
                        <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                    ))}
                </DropdownButton>

                <Form.Control
                    className={inputColor ? "bg-danger" : "bg-light"}
                    placeholder="Pesquise..." onChange={handleSearchChange}
                    value={searchQuery.query[selectedType?.value] || ""} />

                <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}