import { Button } from "react-bootstrap"
import React, { useEffect, useState } from "react"

export default function Testes() {
    const text = `
[5/2 16:35] Joao: Lorem ipsum dolor sit amet
[8/3 21:26] Chev: ullamco laboris nisi ut aliquip
[7/2 14:04] Danilo: deserunt mollit anim id est laborum
[9/1 03:96] Kayo Gameplaisu II: quis nostrum exercitationem
`

    const nomes = [{ quote: "aa", author: "joao" }, { quote: "bb", author: "ana" },
    { quote: "cc", author: "carlos" }, { quote: "", author: "joao" }]
    const valoresUnicos = new Map()

    nomes.forEach((objeto) => {
        valoresUnicos.set(objeto.author, Object.keys(valoresUnicos).length + 1);
    });

    console.log(valoresUnicos);

    return (
        <>
        </>
    )
}
