import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import quoteEditingServices from "../../services/quoteServices"

export default function PageSelector({ searchParams, quotesQtd }) {
    const quoteService = new quoteEditingServices()
    const [itemsQtd, setItemsQtd] = useState([1])
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        async function getPagesQtd() {
            console.log(quotesQtd)
            let totalPagesCalc = Math.ceil((quotesQtd / 5)) 
            console.log(totalPagesCalc)
            setTotalPages(totalPagesCalc)
            setItemsQtd(Array.from({ length: totalPagesCalc }, (_, i) => i + 1))
        }
        getPagesQtd()
    }, [quotesQtd])

    const handlePageClick = (pageNum) => {
        console.log(`${typeof (pageNum)}: ${pageNum}`)
        console.log(totalPages)

        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }
    return (
        <>
            <ButtonGroup className="me-2">
                {itemsQtd.map((item) => (
                    item < 5 ? (
                        <Button key={item} onClick={() => handlePageClick(item)}>
                            {item}
                        </Button>
                    ) : null
                ))}
            </ButtonGroup>

            <ButtonGroup>
                <Button><MDBIcon fas icon="angle-double-right" onClick={() => handlePageClick(totalPages)} /> </Button>
            </ButtonGroup>
        </>
    )
}