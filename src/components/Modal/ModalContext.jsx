import React, { useContext, createContext, useState } from "react"
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap"

const ModalContext = createContext()

export function ModalProvider({ children }) {
    
    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({})
    console.log(modalData)
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

                    {
                        modalData.buttons && modalData.buttons.map((button, index) => (

                            <Button key={index} variant="dark">{button}</Button>
                        ))
                    }
                </Modal>
                {children}
            </ModalContext.Provider>
        </>
    )
}

export function useModalBox() {
    return useContext(ModalContext)
}