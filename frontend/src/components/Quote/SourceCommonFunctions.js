
import { useEffect } from "react"
import { useFetcher } from "react-router-dom"

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

export function getSourceLabel(rawValue) {
  let response
  const findLabel = SourceNames.find((source) => source.value === rawValue)
  findLabel ? response = findLabel.label : response = `Source "${rawValue}"`
  return response
}

export function sourceLogoSelector(source) {
  const foundItem = SourceNames.find(item => item.value === source)

  if (foundItem) {
    const finalReturn = { "path": `/images/${source}.png`, "source": source }
    return finalReturn
  } else {
    return null
  }
}
