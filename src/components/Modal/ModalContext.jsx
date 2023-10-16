import React, {useContext, createContext, useState} from "react"
import { Modal, ModalBody } from "react-bootstrap"

const ModalContext = createContext()

export function ModalProvider({children}) {
    const [show, setShow] = useState(true)
    return(
        <>
        <ModalContext.Provider value={modalBox}>
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                    <ModalTitle></ModalTitle>
                </Modal.Header>
                
                <ModalBody>

                </ModalBody>
            </Modal>
        </ModalContext.Provider>
        </>
    )
}

export function modalBox(){
    return useContext(ModalContext)
}