import { React, useState, useEffect } from "react";
import { Breadcrumb, Row, Col } from "react-bootstrap";

export default function SearchPath({ searchParams }) {
    let queryParams = {}
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value
    }
    delete queryParams.page
    queryParams.quoteType === "single" ? queryParams.quoteType = "Citação" : queryParams.quoteType = "Diálogo"
    console.log(queryParams)
    //let itemsArray = Object.values(queryParams)
    console.log(itemsArray)

    const handleRemoveQuery = (queryKey) => {
        searchParams.delete(queryKey)
    }   
    

    return (
        <div className="d-flex justify-content-center">
            <Breadcrumb>
                {
                    itemsArray.map((item, index) => (
                        <Breadcrumb.Item>
                            {item}
                        </Breadcrumb.Item>
                    ))

                }
            </Breadcrumb>
        </div>
    )
}