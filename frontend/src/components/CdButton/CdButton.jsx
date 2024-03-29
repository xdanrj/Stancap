import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

export default function CdButton({onClick, children, ...props}){
const [cooldown, setCooldown] = useState(false)

useEffect(() => {
    if(cooldown){
        const timer = setTimeout(() => {
            setCooldown(false)
        }, 1000)
        return () => clearTimeout(timer)
    }
}, [cooldown])

const handleClick = () => {
   
    setCooldown(true)
}

return (
<>
    <Button onClick={handleClick} disabled={cooldown} {...props}>
    {children}
    </Button>
</>
)
}   