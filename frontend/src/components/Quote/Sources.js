export default class Sources {
  constructor() {
    this.sources = [
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
  }

  getLabel(rawValue) {
    const findLabel = this.sources.find(source => source.value === rawValue)
    return findLabel ? findLabel.name : null
  }

  getSource(value){
    return this.sources.find(obj => obj.value === value)
  }

  logoSelector(source) {
    console.log(source)
    const foundItem = this.sources.find(item => item.value.toLowerCase() === source.toLowerCase())
    console.log(foundItem)
    return foundItem ? { path: `/images/${foundItem.value}.png`, source: foundItem.value } : null
  }
}
