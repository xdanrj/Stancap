import React, { useState } from "react"
import { Button } from "react-bootstrap"

export default function CdButton({ onClick, children, ...props }) {
    const [disabled, setDisabled] = useState(false)
    console.log({...props})
    const handleClick = () => {
        //onClick ? onClick() : null
        console.log("handleClickou")
       /* setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 1000)*/
    }

    return (
        <Button onClick={handleClick} disabled={disabled} {...props} >
            {children}
        </Button>
    );
}
