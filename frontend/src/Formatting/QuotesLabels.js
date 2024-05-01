export let QuotesLabels =
    [
    { label: "Autor", value: "author" },
    { label: "Tags", value: "tags" },
    { label: "Source", value: "source" },
    { label: "Upload por", value: "uploadByUsername" },
    { label: "Contexto", value: "context" },
    { label: "Ordem", value: "sort"}
]

export function getPropertyLabel(rawValue) {
    console.log(rawValue)
    let findLabel = QuotesLabels.find((prop) => prop.value === rawValue)
    console.log(QuotesLabels)
    return findLabel?.label
}   