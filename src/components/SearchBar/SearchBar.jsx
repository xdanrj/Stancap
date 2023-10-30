import { React, useState } from "react";
import { Form, FormGroup, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBIcon, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { MDBInputGroup } from "./SearchBarStyles";

export function SearchBar() {
    return (
        <>  
            <MDBInputGroup>
            <MDBDropdown>
            <MDBDropdownToggle size="lg" color="dark">Tipo</MDBDropdownToggle>
                    <MDBDropdownMenu dark>
                        <MDBDropdownItem link>Autor</MDBDropdownItem>
                        <MDBDropdownItem>Tag</MDBDropdownItem>
                        <MDBDropdownItem>Source</MDBDropdownItem>
                        <MDBDropdownItem>Upload por</MDBDropdownItem>
                        <MDBDropdownItem>Contexto</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem></MDBDropdownItem>
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