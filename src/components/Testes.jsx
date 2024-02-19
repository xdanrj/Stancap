import { Button } from "react-bootstrap"
import React, { useEffect, useState } from "react"

export default function Testes() {

    const [data, setData] = useState([])
    const text = `
[5/2 13:45] Chev: Assim dado momento
[5/2 13:46] Chev: E é só questão de tempo até superar a oferta
[5/2 13:46] Danilo: Logo a terrestre
[5/2 13:46] Kayo Gameplaisu II: Mecânica do
`

    // first match everything after ] until : then match everything after : until [ then repeats

    useEffect(() => {
        const regex = /[abc]+/g
        const matches = text.matchAll(regex);
        console.log(matches)
        for (const match of matches) {
            console.log(match)
        }
        const objects = Array.from(matches, match => {
            return {
                key: match[1],
                value: match[2],
            }
        })

        setData(objects)
    }, [])


    return (
        <div>
            <Button onClick={() => console.log(data)}>clica</Button>
        </div>
    )
}
