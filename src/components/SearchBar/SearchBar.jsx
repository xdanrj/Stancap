import { React, useState } from "react";
import { Form, FormGroup, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import { MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { MDBInputGroup } from "./SearchBarStyles";

export function SearchBar() {
    return (
        <>  
            <MDBInputGroup>
                <MDBInput className="" contrast label='Pesquise' />
                <MDBBtn rippleColor='white' onClick={() => a}>
                    <MDBIcon color="white" icon='search' />
                </MDBBtn>
            </MDBInputGroup>
        </>
    )
}