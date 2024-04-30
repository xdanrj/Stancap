import React, { useState, useEffect } from "react"
import { Breadcrumb } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getSourceLabel } from "../../Quote/SourceCommonFunctions"
import { getPropertyLabel } from "../../../Formatting/QuotesProperties"

export default function SearchPath({ searchParams }) {
    const navigate = useNavigate()
    const [queryParams, setQueryParams] = useState([])
    const [frmtQueryParams, setfrmtQueryParams] = useState()

    const fnFormat = queryParams.map(item => {
        return {
            key: getPropertyLabel(item.key) || item.key, 
            value: item.value
        }
    })

    useEffect(() => {
        const updatedQueryParams = []
        for (const [key, value] of searchParams.entries()) {
            if (key !== "page") {
                let modifiedValue
                if (key === 'quoteType') {
                    modifiedValue = (value === 'single') ? 'Citação' : 'Diálogo'
                }
                else if (key === 'sort') {
                    modifiedValue = (value === 'ascending') ? 'crescente' : 'decrescente'
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
                {frmtQueryParams.map((item, index) => (
                    item.value && (
                        <Breadcrumb.Item key={index} onClick={() => handlePathClick(item.key)} className="justify-content-center mx-auto">
                        {`${item.key}: ${item.value}` }
                    </Breadcrumb.Item>
                    )                    
                ))}
            </Breadcrumb>
        </div>
    )
}