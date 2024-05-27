export class QuotesProps {
  constructor() {
    this.quotesProps = [
      { label: "Autor", value: "author" },
      { label: "Tags", value: "tags" },
      { label: "Source", value: "source" },
      { label: "Upload por", value: "uploadByUsername" },
      { label: "Contexto", value: "context" },
      { label: "Ordem", value: "sort" },
      { label: "Tipo", value: "quoteType" }
    ]
  }

  getLabel(value) {
    const foundItem = this.quotesProps.find(item => item.value === value)
    return foundItem ? foundItem.label : null
  }

  getValue(label) {
    const foundItem = this.quotesProps.find(item => item.label === label)
    return foundItem ? foundItem.value : null
  }

  getType(value) {
    return this.quotesProps.find(item => item.value === value)
  }
}
