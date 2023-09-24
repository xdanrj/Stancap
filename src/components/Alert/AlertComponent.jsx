import React from "react"
import { useState, useEffect } from "react"
import { Toast, ToastContainer, Row, Col } from "react-bootstrap"

export default function AlertComponent(props) {
    const [show, setShow] = useState()
    return (
        <>
        <Row>
            <Col>
            <ToastContainer className="mb-3 mx-3" position="bottom-start">
                <Toast onClose={() => setShow(false)} show={show} bg="dark" animation={true} delay={3000} autohide>
                    <Toast.Body>a</Toast.Body>
                </Toast>
            </ToastContainer>
            </Col>
            </Row>
        </>
    )
}