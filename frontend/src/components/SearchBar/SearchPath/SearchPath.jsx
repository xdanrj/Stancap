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
                else if (key === 'sort') {
                    modifiedValue = (value === 'ascending') ? 'Ordem crescente' : 'Ordem decrescente'
                }
                else if (key === "source") {
                    modifiedValue = getSourceLabel(value)
                } else {
                    modifiedValue = value
                }
                updatedQueryParams.push({ "key": key, "value": modifiedValue })
            }
            console.log(key, value)
        }
        setQueryParams(updatedQueryParams)
    }, [searchParams])

    const handlePathClick = (queryKey) => {
        searchParams.delete(queryKey)
        navigate({ search: searchParams.toString() })
    }
    useEffect(() => {
        console.log(queryParams)
    }, [queryParams])

//todo: value de: uploadbyusername e tags tao dando undefined
    return (
        <div className="d-flex justify-content-center mx-auto mb-4 text-center">
            <Breadcrumb>
                {queryParams.map((item, index) => (
                    item.value && (
                        <Breadcrumb.Item key={index} onClick={() => handlePathClick(item.key)} className="justify-content-center mx-auto">
                        {item.value}
                    </Breadcrumb.Item>
                    )                    
                ))}
            </Breadcrumb>
        </div>
    )
}