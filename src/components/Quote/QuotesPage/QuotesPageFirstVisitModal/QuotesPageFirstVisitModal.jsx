import React, { useState, useEffect, useLayoutEffect } from "react"
import { Modal, Form, Button, Row, Col } from "react-bootstrap"
import { ButtonContainer, ModalTitle, ModalBody } from "../../../Modal/ModalContextStyles"
import { SourceNames } from "../../SourceCommonFunctions"
import { LogoDemo, ParagraphAuthorDemo, ParagraphDateDemo } from "./QuotesPageFirstVisitModalStyles"
import _ from "lodash"

export function QuotesPageFirstVisitModal(props) {
    const [show, setShow] = useState(true)
    const [logoIndex, setLogoIndex] = useState(0)
    const handleClose = () => {
        setShow(false)
        localStorage.setItem("hadVisitedQuotesPageBefore", true)
    }

    useEffect(() => {
        if (show) {
            const logoInterval = setInterval(() => {
                setLogoIndex((prevIndex) => (prevIndex + 1) % SourceNames.length)
            }, 1500)
            return () => clearInterval(logoInterval)
            const authorInterval = setInterval(() => {
                setAuthorColor()
            })
        }
    }, [show])

    return (
        <>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header>
                    <ModalTitle>Avisos importantes</ModalTitle>
                </Modal.Header>

                <ModalBody>
                    <p>Não leve nada daqui a sério. Todas as frases são para fins unicamente cômicos</p>
                    <p>Clique em qualquer ícone de source ou no autor da quote para fazer uma pesquisa específica</p>

                    <div className="d-flex justify-content-evenly">
                        <Row>
                            <Col>
                                <LogoDemo src={`/images/${SourceNames[logoIndex].value}.png`} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <ParagraphAuthorDemo>—Fulano</ParagraphAuthorDemo>

                                <ParagraphDateDemo>ㅤㅤㅤㅤ(01/12/2036)</ParagraphDateDemo>

                            </Col>
                        </Row>

                    </div>                    
                    
                        <p>Alguns dialógos são grandes então clique em ᨆ para expandir</p>
                   
                    <Button onClick={handleClose}>Entendi</Button>
                </ModalBody>
            </Modal>
        </>
    )
}