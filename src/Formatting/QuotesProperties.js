export const QuotesProperties =
[
    { label: "Autor", value: "author" },
    { label: "Tags", value: "tags" },
    { label: "Source", value: "source" },
    { label: "Upload por", value: "uploadByUsername" },
    { label: "Contexto", value: "context" }]

export function getPropertyLabel(rawValue){
    return QuotesProperties.find((prop) => prop.value === rawValue).label
}

console.log(getPropertyLabel("context"))