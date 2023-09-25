import React from "react"
import { useState, useEffect } from "react"
import { Toast, Row, Col, Button } from "react-bootstrap"
import { MdbIcon, ToastContainer } from "./AlertStyles"

export default function AlertComponent(props) {
    const [show, setShow] = useState()
    return (
        <>
            <ToastContainer position="bottom-center">
                <Toast onClose={() => setShow(false)} show={show} bg="dark" animation={true} delay={1500} autohide>
                    <Toast.Body>
                        <MdbIcon icon="info-circle" />
                        {props.text}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}