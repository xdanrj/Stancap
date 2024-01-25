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

export function sourceLogoSelector(source) {
  const foundItem = SourceNames.find(item => item.value === source);

  if (foundItem) {
    const finalReturn = { "path": `/images/${source}.png`, "source": source };
    console.log(finalReturn);
    return finalReturn;
  } else {
    console.log("Item não encontrado");
    return null; // ou qualquer valor que indique que o item não foi encontrado
  }
}