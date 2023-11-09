import { React, useState } from "react";
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
    const [searchQuery, setSearchQuery] = useState({})
    const [selectedType, setSelectedType] = useState()


    const handleTypeSelect = (eventKey) => {
        setSelectedType(SearchTypes[eventKey])
    }

    const handleSearchChange = (e) => {
        setSearchQuery({
            ["query"]: { [selectedType.value]: e.target.value },
            ["label"]: selectedType.label
        })
        console.log(searchQuery)
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
                <Button variant="dark" onClick={() => props.searchFunction(searchQuery)}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}