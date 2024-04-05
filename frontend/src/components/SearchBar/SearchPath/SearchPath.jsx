import { React, useState, useEffect } from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export default function SearchPath({ searchParams }) {
    const navigate = useNavigate()
    let queryParams = []
    for (const [key, value] of searchParams.entries()) {
        queryParams.push({ "key": key, "value": value})
    }
    queryParams = queryParams.filter(obj => !(obj.key === "page"))
    
    queryParams.forEach(obj => {
        if (obj.key === 'quoteType') {
            obj.value = (obj.value === 'single') ? 'Citação' : 'Diálogo'
        }
        if(obj.key === 'sort'){
            obj.value = (obj.value === 'ascending') ? 'Ordem crescente' : 'Ordem decrescente'
        }
    })
    console.log(queryParams)
    const handlePathClick = (queryKey) => {
        searchParams.delete(queryKey)
        navigate({ search: searchParams.toString() })
    }   

    return (
        <div className="d-flex justify-content-center">
            <Breadcrumb>
                {
                    queryParams.map((item, index) => (
                        <Breadcrumb.Item onClick={()=>handlePathClick(item.key)}>
                            {item.value}
                        </Breadcrumb.Item>
                    ))

                }
            </Breadcrumb>
        </div>
    )
}