import React, { useState, useEffect } from "react"
import { Breadcrumb } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getSourceLabel } from "../../Quote/SourceCommonFunctions"

export default function SearchPath({ searchParams }) {
    const navigate = useNavigate()
    const [queryParams, setQueryParams] = useState([])

    useEffect(() => {
        const updatedQueryParams = []
        for (const [key, value] of searchParams.entries()) {
            if (key !== "page") {
                let modifiedValue
                if (key === 'quoteType') {
                    modifiedValue = (value === 'single') ? 'Citação' : 'Diálogo'
                }
                if (key === 'sort') {
                    modifiedValue = (value === 'ascending') ? 'Ordem crescente' : 'Ordem decrescente'
                }
                if (key === "source") {
                    modifiedValue = getSourceLabel(value)
                }
                updatedQueryParams.push({ "key": key, "value": modifiedValue })
            }
        }
        setQueryParams(updatedQueryParams)
    }, [searchParams])

    const handlePathClick = (queryKey) => {
        searchParams.delete(queryKey)
        navigate({ search: searchParams.toString() })
    }

    return (
        <div className="d-flex justify-content-center mx-auto mb-4">
            <Breadcrumb>
                {queryParams.map((item, index) => (
                    <Breadcrumb.Item key={index} onClick={() => handlePathClick(item.key)}>
                        {item.value}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    )
}