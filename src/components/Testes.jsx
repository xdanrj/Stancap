import { Button } from "react-bootstrap"
import React from "react"
import { useState } from "react"

export default function Testes() {
    const text = `
[5/2 13:45] Chev²: Assim dado momento
[5/2 13:46] Chev²: E é só questão de tempo até superar a oferta
[5/2 13:46] Danilo: Logo a terrestre
[5/2 13:46] Kayo Gameplaisu II: Mecânica do
`;

    const regex = /(?<=\]\s)(.*?)(?=\s:)/g

    const matches = text.matchAll(regex);

    const objects = Array.from(matches, match => {
        return {
            key: match[1],
            value: match[2],
        };
    });

    console.log(objects);

    return (
        <div>
            <p></p>
        </div>
    )
}
