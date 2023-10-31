import { React, useState } from "react";
import { Form, FormGroup, FloatingLabel, Row, Col, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export function SearchBar() {
    const SearchTypes = [
        { label: "Autor", value: "author" },
        { label: "Tag", value: "tag" },
        { label: "Source", value: "source" },
        { label: "Upload por", value: "uploadByUser" },
        { label: "Contexto", value: "context" }
    ]

    const [selectedType, setSelectedType] = useState()

    const handleTypeSelect = (eventKey) => {
        console.log(eventKey)
        console.log(SearchTypes[eventKey])
        setSelectedType(SearchTypes[eventKey])
        
    }

    return (
        <>
            <InputGroup>
            <DropdownButton title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>
            {SearchTypes.map((item, index) => (
                <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
            ))}
            </DropdownButton>
            <Form.Control />
            </InputGroup>
        </>
    )
}