export const SourceNames = [
  { name: "Anarco Feudalismo", value: "AnarcoFeudalismo" },
  { name: "Anarco Primitivismo", value: "AnarcoPrimitivismo" },
  { name: "AnProm", value: "AnProm" },
  { name: "Corujas Neto Lovers", value: "CorujasNetoLovers" },
  { name: "Ditadura Cultural", value: "DitaduraCultural" },
  { name: "Freudcap", value: "Freudcap" },
  { name: "Relatórios do Dmitri", value: "RelatoriosDoDmitri" },
  { name: "Stancap", value: "Stancap" },
  { name: "Stancap Nobreza", value: "StancapNobreza" }
]

/*export const OLD_SourceNames = [
  "Anarco Feudalismo",
  "Anarco Primitivismo",
  "AnProm",
  "Corujas Neto Lovers",
  "Ditadura Cultural",
  "Freudcap",
  "Relatórios do Dmitri",
  "Stancap",
  "Stancap Nobreza",
];*/

/*for (const [name, value] of Object.entries(SourceNames)) {
  console.log(name, value)
}*/

export async function sourceLogoSelector(source) {
  let finalReturn
  /*if (SourceNames.includes(source)) {
    let finalReturn = await { "path": `/images/${source}.png`, "source": source }
*/
  SourceNames.map((item) => {
    console.log(item.value)
    if (item.value == source) {
      finalReturn = { "path": `/images/${source}.png`, "source": source }
      return finalReturn
    } else {
      return false
    }
  })
}

