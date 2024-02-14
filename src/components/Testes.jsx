import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"

export default function Testes() {
    const [item, setItem] = useState(["a"])

    const handleClick = () => {
        setItem(item => [...item, "a"])
        console.log(item)
    }

    return (
        <>
            <Button onClick={handleClick}>+1</Button>
            <div className="bg-primary position-fixed w-50">
                <p>div superior fixa</p>
            </div>

            {item.map((item, index) => (                
                <div key={index} className="bg-info">
                    <p>item</p>
                </div>
            ))
            }

            <div className="bg-secondary">
                <p>div inferior</p>
            </div>

            <div className="bg-secondary">
                <p>div inferior 2</p>
            </div>
        </>
    )
}