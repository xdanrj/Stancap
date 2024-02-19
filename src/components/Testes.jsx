import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function Testes() {
  const [data, setData] = useState([]);
  const text = `
[5/2 13:45] Chev: Assim dado momento
[5/2 13:46] Chev: E é só questão de tempo até superar a oferta
[5/2 13:46] Danilo: Logo a terrestre
[5/2 13:46] Kayo Gameplaisu II: Mecânica do
`;

  useEffect(() => {
    const regex = /\(?<=\]\s)(.*?)(?=\s:)/g;
    const matches = text.matchAll(regex);

    const objects = Array.from(matches, (match) => ({
      key: match[1],
      value: match[2], 
    }));

    setData(objects);
  }, []);

  console.log(data)

  return (
    <div>
      <Button onClick={() => console.log(data)}>clica</Button>
    </div>
  );
}
