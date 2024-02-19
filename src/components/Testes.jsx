import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"

export default function Testes() {
    //const [data, setData] = useState({})
    let data = {}
    const regex = /]\s*([^:]+):\s*([^]+)(?=\s*\[|$)/

    const text = `[5/2 13:45] Chev²🦆: Assim dado momento 
    [5/2 13:46] Chev²🦆: E é só questão de tempo até superar a oferta
    [5/2 13:46] Danilo: Logo a terrestre
    [5/2 13:46] Kayo Gameplaisu II: Mecânica do `

    // Iterar sobre todas as correspondências usando exec()
    let match
    while ((match = regex.exec(text)) !== null) {
        // match[1] contém o nome e match[2] contém o texto
        const name = match[1]
        const value = match[2]

        // Adicionar a chave e valor ao objeto
        data[name] = value.trim()
    }

    // Imprimir o objeto resultante no console para verificação
    console.log(data)

    return (
        <div>
            <p>{data}</p>
        </div>
    )
}
