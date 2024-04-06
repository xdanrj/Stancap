import { React, useState, useEffect } from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { getSourceLabel } from "../../Quote/SourceCommonFunctions";

export default function SearchPath({ searchParams }) {
    const navigate = useNavigate()
    let queryParams = []

    useEffect(() => {
        for (const [key, value] of searchParams.entries()) {
            if (key !== "page") {
                let modifiedValue = value
                if (key === 'quoteType') {
                    modifiedValue = (value === 'single') ? 'Citação' : 'Diálogo'
                }
                if (key === 'sort') {
                    modifiedValue = (value === 'ascending') ? 'Ordem crescente' : 'Ordem decrescente'
                }
                if (key === "source") {
                    modifiedValue = getSourceLabel(value)
                }
                queryParams.push({ "key": key, "value": modifiedValue })
            }
        }
    }, [searchParams])
    console.log(queryParams)


    const handlePathClick = (queryKey) => {
        searchParams.delete(queryKey)
        navigate({ search: searchParams.toString() })
    }

    return (
        <div className="d-flex justify-content-center mb-4">
            <Breadcrumb>
                {
                    queryParams.map((item, index) => (
                        <Breadcrumb.Item key={index} onClick={() => handlePathClick(item.key)}>
                            {item.value}
                        </Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </div>
    )
}