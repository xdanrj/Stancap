import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"

export default function PageSelector({ searchParams, quotesQtd }) {
    const [itemsQtd, setItemsQtd] = useState([])
    const [totalPages, setTotalPages] = useState()
    const navigate = useNavigate()

    let actualPage = searchParams.get("page")
    useEffect(() => {
        if (quotesQtd) {
            let totalPagesCalc = Math.ceil((quotesQtd / 5))
           
            setTotalPages(totalPagesCalc)
           
            let tempItemsQtd = []
            let initialIndex = 1
            if (actualPage >= 4) {
                initialIndex = actualPage - 1
            }

            for (let i = initialIndex; i <= totalPagesCalc; i++) {
                tempItemsQtd.push(i)
            }
            setItemsQtd(tempItemsQtd)
        }



    }, [actualPage, quotesQtd, searchParams])

    const handlePageClick = (pageNum) => {
        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }

    return (
        <>
            {actualPage >= 4 && (
                <Button onClick={() => handlePageClick(1)}><MDBIcon fas icon="angle-double-left" /> </Button>
            )}

            <ButtonGroup className="mx-2">
                {itemsQtd.slice(0, 4).map((item) => (
                    <Button key={item} onClick={() => handlePageClick(item)}>
                        {item}
                    </Button>

                ))}
            </ButtonGroup>
            <Button onClick={() => handlePageClick(totalPages)}><MDBIcon fas icon="angle-double-right" /> </Button>
        </>
    )
}