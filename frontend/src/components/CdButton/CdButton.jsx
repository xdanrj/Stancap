import React, { useState } from "react"
import { Button } from "react-bootstrap"

export default function CdButton({ onClick, children, ...props }) {
    const [disabled, setDisabled] = useState(false)
    const handleClick = () => {
        onClick ? onClick() : null
        
       setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 1000)
    }

    return (
        <Button onClick={handleClick} disabled={disabled} {...props} >
            {children}
        </Button>
    )
}