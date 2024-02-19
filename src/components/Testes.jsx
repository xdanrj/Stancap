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
    // first match everything after ] until : then match everything after : until [ then repeats
    const regexChave = /]\s*([\w\s]+)\s*:/g
    const regexValor = /:\s*(\w+(?:\s+\w+)*)\s*$/
    let arrayResult

    useEffect(() => {
        const regexChave = /]\s*([\w\s]+)\s*:/
        const regexValor = /:\s*(\w+(?:\s+\w+)*)\s*$/

        const linhas = text.trim().split('\n')
        const objetos = []

        linhas.forEach((linha) => {
            const chaveMatch = regexChave.exec(linha)
            const valorMatch = regexValor.exec(linha)

            if (chaveMatch && valorMatch) {
                const chave = chaveMatch[1]
                const valor = valorMatch[1]
                const objeto = { [chave]: valor }
                objetos.push(objeto)
            }
        });

        console.log(objetos)
    }, [])

    return (
        <div>
            <Button onClick={() => console.log(data)}>clica</Button>
        </div>
    )
}
