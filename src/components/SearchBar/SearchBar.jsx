import { React, useState, useEffect } from "react";
import { Form, Button, DropdownButton } from "react-bootstrap";
import { InputGroup } from "./SearchBarStyles";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { MDBIcon } from "mdb-react-ui-kit";
import { useAlertMsg } from "../Alert/AlertContext";

export function SearchBar(props) {
    const useAlert = useAlertMsg()

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
    const [searchQuery, setSearchQuery] = useState({ "query": { }, "label": "" })
    console.log(searchQuery)

    //ainda refatorar pra aceitar qualquer tipo de query
    useEffect(() => {
        if (props.urlQuery.source) {
            console.log("entrou funcao get")
            console.log(props.urlQuery)
            console.log(props.urlQuery.source)
            setSelectedType()
            setSearchQuery((prevSearchQuery) => ({
                ...prevSearchQuery,
                "query": { "source": props.urlQuery.source }, "label": "Source"
            }))
        }
    }, [props.urlQuery.source])

    useEffect(() => {
        if (selectedType) {
            setSearchQuery((prevSearchQuery) => ({
                ...prevSearchQuery,
                ["query"]: { [selectedType?.value]: "" },
                ["label"]: selectedType?.label
            }))
        }
    }, [selectedType])

    const handleTypeSelect = (eventKey) => {
        console.log(selectedType)
        setSelectedType(SearchTypes[eventKey])
    }

    const handleSearchChange = (e) => {
        setSearchQuery({
            ["query"]: { [selectedType?.value]: e.target.value },
            ["label"]: selectedType?.label
        })
    }

    const checkAttributes = () => {
        console.log(selectedType)
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
                    value={searchQuery.query["source"] ? searchQuery.query["source"] : "" || ""} />

                <Button variant="dark" onClick={() => checkAttributes() ? handleSearchClick() : null}>
                    <MDBIcon icon="search" />
                </Button>
            </InputGroup>
        </>
    )
}