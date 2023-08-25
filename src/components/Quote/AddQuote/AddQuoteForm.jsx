import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";

import { FormLabel } from "./AddQuoteFormStyles";

import quoteEditingServices from "../../../services/quoteServices"

const quoteEditingService = new quoteEditingServices()

function AddQuoteForm() {
    //form pra: quote, tags, autor, source e data. As outras propriedades são automaticas
    return (
        <>
        
            <Form >
                <Form.Group>
                    <FormLabel>Quote:</FormLabel>
                    <Form.Control>

                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <FormLabel>Autor:</FormLabel>
                    <Form.Control>

                    </Form.Control>

                    <FormLabel>Data:</FormLabel>
                    <Form.Control>

                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <FormLabel>Source:</FormLabel>
                    <Form.Control>

                    </Form.Control>
                    <FormLabel>Tags:</FormLabel>
                    <Form.Control>

                    </Form.Control>
                </Form.Group>
            </Form>
        </>
    )
}

export default AddQuoteForm