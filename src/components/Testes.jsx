import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"

export default function Testes() {
    const [item, setItem] = useState(["a"])

    const handleClick = () => {
        setItem(item => [...item, "a"])
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <Button onClick={handleClick}>+1</Button>
            <div className="bg-primary">
                <p>div superior fixa</p>
            </div>

            {item.map((item, index) => (
                <div key={index} className="bg-info" >
                    <p>{item}</p>
                </div>
            ))
            }
        </div>
    )
}
