import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";

export function SearchBar(props) {
    const SearchTypes = [
        { label: "Autor", value: "author" },
        { label: "Tag", value: "tag" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUser" },
        { label: "Contexto", value: "context" }
    ]
    const [searchQuery, setSearchQuery] = useState({query: {}, label: ""})
    const [selectedType, setSelectedType] = useState()
    const [highlighted, setHighlighted] = useState(false)

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
        console.log(searchQuery)
        console.log(searchQuery["query"])
    }

    const handleNoType = () => {
        setHighlighted(true)
        setTimeout(() => { setHighlighted(false) }, 500)
    }

    const handleSearchClick = () => {
        if(selectedType) {
            if(searchQuery.query[selectedType.value]) {
                props.searchFunction(searchQuery)
            } else {

            }
            
        } else {
            handleNoType()
        }
       
    }

    return (
        <>
            <InputGroup>
                <DropdownButton variant={highlighted ? "danger" : "dark"} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>

                    {SearchTypes.map((item, index) => (
                        <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                    ))}
                </DropdownButton>
                <Form.Control placeholder="Pesquise..." onChange={handleSearchChange} value={searchQuery.query[selectedType?.value] || ""}/>
                <Button variant="dark" onClick={() => selectedType ? props.searchFunction(searchQuery) : handleNoType()}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}