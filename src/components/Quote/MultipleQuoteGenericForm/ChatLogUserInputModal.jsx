import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bootstrap"
import { FloatingLabel } from "../../../CommonStyles/CommonStyles"


export function ChatLogUserInputModal() {
    return (
        <div>
            <FloatingLabel label={modalData.form.label} >
                <Form.Control
                    name={modalData.form.controlName}
                    placeholder={modalData.form.placeholder}
                    onChange={eval(modalData.form.onChange)}
                    value={modalData.form.value}>
                </Form.Control>
            </FloatingLabel>

        </div>
    )
}
