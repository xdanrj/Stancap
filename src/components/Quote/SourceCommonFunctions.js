export const SourceNames = [
  {"Anarco Feudalismo": "AnarcoFeudalismo"},
  {"Anarco Primitivismo": "AnarcoPrimitivismo"},
  {"AnProm": "AnProm"},
  {"Corujas Neto Lovers": "CorujasNetoLovers"},
  {"Ditadura Cultural": "DitaduraCultural"},
  {"Freudcap": "Freudcap"},
  {"Relatórios do Dmitri": "RelatoriosDoDmitri"},
  {"Stancap": "Stancap"},
  {"Stancap Nobreza": "StancapNobreza"}
]
console.log(Object.keys(SourceNames[0]))
console.log(SourceNames[0])
export async function sourceLogoSelector(source) {
  if (SourceNames.includes(source)) {
    return { "path": `/images/${source}.png`, "source": source }
  } else {
    return false
  }
}

