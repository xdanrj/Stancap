import React from "react"
import { useState, useEffect } from "react"
import { Alert } from "react-bootstrap"

export default function AlertComponent(props) {
    const [showAlert, setShowAlert] = useState()

    useEffect(() => {
        handleShowAlert()
    }, [])

    const handleShowAlert = () => {
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    }

    return (
        <>
            {showAlert && (
                <Alert variant="primary">{props.text}</Alert>
            )}
        </>

    )
}