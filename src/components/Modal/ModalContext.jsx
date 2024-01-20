import React, { useContext, createContext, useState, useEffect } from "react"
import { Modal, ModalFooter } from "react-bootstrap"
import { ModalBody, ModalTitle, Button, ButtonContainer } from "./ModalContextStyles"

const ModalContext = createContext()

export function ModalProvider({ children }) {

    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({ title: "", paragraph: "", "buttons": [] })

    const handleClose = () => {
        setShow(false)
    }
    const modalBox = (data) => {
        setModalData((prevData) => ({
            ...prevData,
            title: data.title,
            paragraph: data.paragraph,
            buttons: data.buttons
        }))
        setShow(true)
    }
    return (
        <>
            <ModalContext.Provider value={modalBox}>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <ModalTitle>{modalData.title}</ModalTitle>
                    </Modal.Header>

                    <ModalBody>
                        {modalData.paragraph}
                    </ModalBody>

                    <ButtonContainer>
                        {
                            modalData.buttons && modalData.buttons.map((button, index) => (
                                <Button key={index} variant="dark"
                                    onClick={() => {
                                        button.action.forEach((buttonInList) => {
                                            if (typeof buttonInList === "string") {
                                                console.log("entrou string")
                                                console.log(buttonInList)
                                                eval(buttonInList)
                                            } else if (typeof buttonInList === "function") {
                                                console.log("entrou function")
                                                buttonInList()
                                            }
                                        })
                                    }}
                                >
                                    {button.text}
                                </Button>
                            ))
                        }
                    </ButtonContainer>

                </Modal>
                {children}
            </ModalContext.Provider >
        </>
    )
}

export function useModalBox() {
    return useContext(ModalContext)
}