import { React, useState } from "react";
import { Form, FormGroup, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBIcon, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { MDBInputGroup } from "./SearchBarStyles";

export function SearchBar() {
    const SearchTypes = [{"Autor": "author"}, {"Tag": "tag"}, {"Source": "source"}, {"Upload por": "uploadByUser"}, {"Contexto": "context"}]

    const handleSearchTypeSelect = (item) => {

    }

    return (
        <>
            <MDBInputGroup>
                <MDBDropdown>
                    <MDBDropdownToggle size="lg" color="dark">Tipo</MDBDropdownToggle>
                    <MDBDropdownMenu dark>
                        {SearchTypes.map((item) => (
                            <MDBDropdownItem onClick={handleSearchTypeSelect(item)}>{item}</MDBDropdownItem>
                        ))

                        }
                    </MDBDropdownMenu>
                </MDBDropdown>

                <MDBInput className="" contrast label='Pesquise' />

                <MDBBtn color="dark" rippleColor='white' onClick={() => a}>
                    <MDBIcon color="white" icon='search' />
                </MDBBtn>
            </MDBInputGroup>
        </>
    )
}