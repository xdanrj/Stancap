import { Button } from "react-bootstrap"
import React, { useEffect, useState } from "react"

export default function Testes() {
    const [data, setData] = useState([])
    const text = `
[5/2 16:35] Joao: Lorem ipsum dolor sit amet
[8/3 21:26] Chev: ullamco laboris nisi ut aliquip
[7/2 14:04] Danilo: deserunt mollit anim id est laborum
[9/1 03:96] Kayo Gameplaisu II: quis nostrum exercitationem
`
    const regex = /\b(\w+)\s*:/
    let arrayResult
    // first match everything after ] until : then match everything after : until [ then repeats
    useEffect(() => {
        while((arrayResult = regex.exec(text)) !== null) {
            console.log(arrayResult[0])
        }
    }, [])

    return (
        <div>
            <Button onClick={() => console.log(data)}>clica</Button>
        </div>
    )
}
