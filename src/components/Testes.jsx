import { Button } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import _ from "lodash"

export default function Testes() {
    const text = `
[5/2 16:35] Joao: Lorem ipsum dolor sit amet
[8/3 21:26] Chev: ullamco laboris nisi ut aliquip
[7/2 14:04] Danilo: deserunt mollit anim id est laborum
[9/1 03:96] Kayo Gameplaisu II: quis nostrum exercitationem
`

    const nomes = [{ quote: "aa", author: "joao" }, { quote: "bb", author: "ana" },
    { quote: "cc", author: "carlos" }, { quote: "dd", author: "joao" }]
   
    const unicos = _.uniqBy(nomes, "author").map((obj) => {[obj.author]: "test"})
    console.log(unicos)

    return (
        <>
        </>
    )
}
