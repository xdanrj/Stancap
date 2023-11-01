import { React, useState } from "react";
import { Form, FormGroup, FloatingLabel, Row, Col, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";

export function useSearch(searchString) {
    return searchString
}

export function SearchBar() {
    const SearchTypes = [
        { label: "Autor", value: "author" },
        { label: "Tag", value: "tag" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUser" },
        { label: "Contexto", value: "context" }
    ]

    const [selectedType, setSelectedType] = useState()
    const [searchString, setSearchString] = useState("")

    const handleTypeSelect = (eventKey) => {
        console.log(eventKey)
        console.log(SearchTypes[eventKey])
        setSelectedType(SearchTypes[eventKey])
    }



    const handleSearchChange = (e) => {
        const { name, value } = e.target
        setSearchString(value)
    }

    return (
        <>
            <InputGroup>
                <DropdownButton variant="dark" menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>
                    {SearchTypes.map((item, index) => (
                        <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                    ))}
                </DropdownButton>
                <Form.Control placeholder="Pesquise..." onChange={handleSearchChange} />
                <Button variant="dark" /*onClick={useSearch(searchString)}*/>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}