export const QuotesProperties =
    [
    { label: "Autor", value: "author" },
    { label: "Tags", value: "tags" },
    { label: "Source", value: "source" },
    { label: "Upload por", value: "uploadByUsername" },
    { label: "Contexto", value: "context" },
    { label: "Ordem", value: "sort" }
]

export function getPropertyLabel(rawValue) {
    console.log("raw: ", rawValue)
    let response
    const findLabel = QuotesProperties.find((prop) => prop.value === rawValue)
    findLabel ? response = findLabel.label : response = null
    return response
}