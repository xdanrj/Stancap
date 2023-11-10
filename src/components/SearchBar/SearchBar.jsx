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
    const [searchQuery, setSearchQuery] = useState({})
    const [selectedType, setSelectedType] = useState()
    const [dropdownButtonVariant, setDropdownButtonVariant] = useState("dark")

    useEffect(() => {
        setSearchQuery((prevSearchQuery) => ({
            ...prevSearchQuery,
            ["query"]: { [selectedType?.value]: " " },
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
    }

    const style = {
        transition: 'opacity 0.5s ease-in-out'
    }

    const handleNoType = () => {
        setTimeout(() => {
            setDropdownButtonVariant('secondary')
        }, 500)
    }

    return (
        <>
            <InputGroup>
                <DropdownButton style={style} variant={dropdownButtonVariant} menuVariant="dark" title={selectedType ? selectedType.label : "Tipo"} onSelect={handleTypeSelect}>
                    {SearchTypes.map((item, index) => (
                        <DropdownItem eventKey={index} key={item.value}>{item.label}</DropdownItem>
                    ))}
                </DropdownButton>
                <Form.Control placeholder="Pesquise..." onChange={handleSearchChange} />
                <Button variant="dark" onClick={() => selectedType ? props.searchFunction(searchQuery) : handleNoType()}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}