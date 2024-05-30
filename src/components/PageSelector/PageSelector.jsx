import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import { MainDiv } from "./PageSelectorStyles"

//talvez tirar searchparams de prop e chamar searchparams normalmente aqui, assim como é em outro comps.
export default function PageSelector({ searchParams, quotesQtd }) {
    const [itemsQtd, setItemsQtd] = useState([])
    const [totalPages, setTotalPages] = useState()
    const navigate = useNavigate()

    let actualPage = searchParams.get("page")
    useEffect(() => {
        console.log(quotesQtd)
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
    console.log(totalPages)
    const handlePageClick = (pageNum) => {
        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }

    return (
        <MainDiv>
            {actualPage >= 4 && (
                <Button onClick={() => handlePageClick(1)}><MDBIcon fas icon="angle-double-left" /> </Button>
            )}

            <ButtonGroup className="mx-2">
                {itemsQtd.slice(0, 4).map((item) => (
                    <Button key={item} onClick={() => handlePageClick(item)}>
                        {item}
                    </Button>

                ))}
                {totalPages > 1 && (
                    <Button onClick={() => handlePageClick(totalPages)}><MDBIcon fas icon="angle-double-right" /> </Button>
                )}
            </ButtonGroup>
        </MainDiv>
    )
}