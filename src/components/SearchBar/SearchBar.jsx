import { React, useState } from "react";
import { CenteredFormControl, FloatingLabel, FormGroup } from "../../CommonStyles/CommonStyles";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

export function SearchBar({ props }) {


    return (
        <>
            <Form>
                <FormGroup>
                    <Row>
                        <Col >
                            <CenteredFormControl placeholder="Digite">
                            </CenteredFormControl>
                        </Col>
                        <Col>
                            <Button>
                                <MDBIcon fas icon="search" />
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </>
    )
}