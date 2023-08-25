import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { FormLabel } from "./AddQuoteFormStyles";
import TagSelector from "../TagsSelector/TagsSelector";

import quoteEditingServices from "../../../services/quoteServices"

const quoteEditingService = new quoteEditingServices()

function AddQuoteForm() {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    return (
        <>
            <Form >
                <Row>
                    <Form.Group>
                        <FormLabel>Quote:</FormLabel>
                        <Form.Control>

                        </Form.Control>
                    </Form.Group>
                    <Col>

                        <FormLabel>Autor:</FormLabel>
                        <Form.Control>

                        </Form.Control>
                    </Col>
                    <Col>
                        <FormLabel>Data:</FormLabel>
                        <Form.Control>

                        </Form.Control>
                    </Col>

                    <Form.Group>
                        <FormLabel>Source:</FormLabel>
                        <Form.Control>

                        </Form.Control>
                        <FormLabel>Tags:</FormLabel>
                        <Form.Control>
                           

                        </Form.Control>
                    </Form.Group>
                </Row>
            </Form>
            <TagSelector/>
        </>
    )
}

export default AddQuoteForm