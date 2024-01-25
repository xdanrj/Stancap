export const SourceNames = [
  { "Anarco Feudalismo": "AnarcoFeudalismo" },
  { "Anarco Primitivismo": "AnarcoPrimitivismo" },
  { "AnProm": "AnProm" },
  { "Corujas Neto Lovers": "CorujasNetoLovers" },
  { "Ditadura Cultural": "DitaduraCultural" },
  { "Freudcap": "Freudcap" },
  { "Relatórios do Dmitri": "RelatoriosDoDmitri" },
  { "Stancap": "Stancap" },
  { "Stancap Nobreza": "StancapNobreza" }
]

for (const [key, value] of Object.entries(SourceNames)) {
  console.log(key, value)

}

export async function sourceLogoSelector(source) {
  if (SourceNames.includes(source)) {
    return { "path": `/images/${source}.png`, "source": source }
  } else {
    return false
  }
}

