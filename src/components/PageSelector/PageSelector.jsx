import React, { useEffect, useState } from "react"
import { Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function PageSelector() {
const [itemsQtd, setItemsQtd] = useState([1,2,3,4,5,6,7])
const navigate = useNavigate()

const handlePageClick = (item) => {
    navigate({
        search: `?page=${item}`
    })
}
    return (
        <>
            <Row className="justify-content-center">
                {itemsQtd.map((item) => {
                    return (
                    <Col key={item} xs={3}>
                        <Button onClick={() => handlePageClick(item)}>
                            {item}
                        </Button>
                        </Col>
                    )
})
}
                   
                
                
            </Row>
        </>
    )
}