import React, { useContext, createContext, useState, useEffect } from "react"
import { Modal, ModalFooter, Form } from "react-bootstrap"
import { ModalBody, ModalTitle, Button, ButtonContainer } from "./ModalContextStyles"
import { FloatingLabel } from "../../CommonStyles/CommonStyles"

const ModalContext = createContext()

export function ModalProvider({ children }) {

    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({ title: "", paragraph: "", "buttons": [], form: { label: "", name: "", placeholder: "", onChange: "", value: "" } })

    const handleClose = () => {
        setShow(false)
    }
    const modalBox = (data) => {
        setModalData((prevData) => ({
            ...prevData,
            title: data.title,
            paragraph: data.paragraph,
            buttons: data.buttons,
            form: data.form

        }))
        setShow(true)
    }
    console.log(modalData)
    console.log(modalData.form)
    return (
        <>
            <ModalContext.Provider value={modalBox}>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <ModalTitle>{modalData.title}</ModalTitle>
                    </Modal.Header>

                    <ModalBody>
                        {
                            Array.isArray(modalData.paragraph) ?
                                modalData.paragraph.map((paragraph, index) => (
                                    <div key={index}>
                                        {paragraph}
                                    </div>
                                ))
                                :
                                modalData.paragraph
                        }
                    </ModalBody>                    

                    <ButtonContainer>
                        {
                            modalData.buttons && modalData.buttons.map((button, index) => (
                                <Button key={index} variant="dark"
                                    onClick={() => {
                                        button.action.forEach((buttonInList) => {
                                            if (typeof buttonInList === "string") {
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